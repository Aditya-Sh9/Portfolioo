/**
 * Rising dust motes on a 2D canvas: tiny streaks that drift up, hold, fade and respawn
 * somewhere else. Plain TypeScript with no React, so the component only decides when it runs.
 *
 * Built to be cheap: state lives in typed arrays, fill colours are set once per group and
 * opacity goes through `globalAlpha` (no per-frame colour strings), motion is delta-time based
 * (same speed at 60 or 120Hz), and time is a simulation clock that stops when the caller stops
 * ticking, so nothing fades all at once after a pause.
 */

export type ParticleFieldOptions = {
  /** Fill colours of the common particles. Any CSS colour string. Split evenly. */
  neutrals: readonly string[];
  /** Fill colour of the rare accent particles. */
  accent: string;
  /** Share of particles drawn in the accent colour, 0 to 1. */
  accentShare?: number;
};

export type ParticleField = {
  /** Size the canvas and rebuild the field. Call whenever the canvas box changes. */
  resize(width: number, height: number): void;
  /** Advance the simulation by `deltaMs` and redraw. */
  tick(deltaMs: number): void;
  /** Draw one still frame without moving anything (reduced motion). */
  drawStill(): void;
};

const AREA_PER_PARTICLE = 8000;
const MAX_PARTICLES = 180;
const MAX_DPR = 1.5;
const FRAME_MS = 1000 / 60;
/** A stalled tab or a long GC must not teleport particles. */
const MAX_STEP = 3;
const FADE_PER_FRAME = 0.008;
const PEAK_ALPHA = 0.8;
const STREAK_WIDTH = 0.5;

const NOOP_FIELD: ParticleField = { resize() {}, tick() {}, drawStill() {} };

export function createParticleField(
  canvas: HTMLCanvasElement,
  { neutrals, accent, accentShare = 0.08 }: ParticleFieldOptions,
): ParticleField {
  const ctx = canvas.getContext("2d");
  if (!ctx) return NOOP_FIELD;

  const colors = [...neutrals, accent];
  let width = 0;
  let height = 0;
  let clock = 0;
  // Particle i belongs to colour group g when groupStart[g] <= i < groupStart[g + 1].
  let groupStart: number[] = [0];
  let x = new Float32Array(0);
  let y = new Float32Array(0);
  let speed = new Float32Array(0);
  let alpha = new Float32Array(0);
  let fadeAt = new Float32Array(0);

  const spawn = (i: number) => {
    x[i] = Math.random() * width;
    y[i] = Math.random() * height;
    speed[i] = Math.random() / 5 + 0.1;
    alpha[i] = 1;
    fadeAt[i] = clock + Math.random() * 600 + 100;
  };

  const resize = (nextWidth: number, nextHeight: number) => {
    width = Math.max(1, Math.round(nextWidth));
    height = Math.max(1, Math.round(nextHeight));

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
      Math.floor((width * height) / AREA_PER_PARTICLE),
      MAX_PARTICLES,
    );
    const accentCount = Math.round(count * accentShare);
    const perNeutral = Math.floor((count - accentCount) / neutrals.length);

    groupStart = [0];
    for (let g = 0; g < neutrals.length; g++) groupStart.push(groupStart[g] + perNeutral);
    groupStart.push(count);

    x = new Float32Array(count);
    y = new Float32Array(count);
    speed = new Float32Array(count);
    alpha = new Float32Array(count);
    fadeAt = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      spawn(i);
      // Start mid-life so the field does not pop in or fade out in unison.
      alpha[i] = Math.random();
    }
  };

  const tick = (deltaMs: number) => {
    const step = Math.min(deltaMs / FRAME_MS, MAX_STEP);
    clock += step * FRAME_MS;
    ctx.clearRect(0, 0, width, height);

    for (let g = 0; g < colors.length; g++) {
      ctx.fillStyle = colors[g];
      for (let i = groupStart[g]; i < groupStart[g + 1]; i++) {
        y[i] -= speed[i] * step;
        if (y[i] < 0) {
          spawn(i);
        } else if (clock >= fadeAt[i]) {
          alpha[i] -= FADE_PER_FRAME * step;
          if (alpha[i] <= 0) spawn(i);
        }
        ctx.globalAlpha = alpha[i] * PEAK_ALPHA;
        // The streak length changes every frame: that is what makes the field shimmer.
        ctx.fillRect(x[i], y[i], STREAK_WIDTH, Math.random() * 2 + 1);
      }
    }
  };

  const drawStill = () => {
    ctx.clearRect(0, 0, width, height);
    for (let g = 0; g < colors.length; g++) {
      ctx.fillStyle = colors[g];
      for (let i = groupStart[g]; i < groupStart[g + 1]; i++) {
        ctx.globalAlpha = (0.15 + alpha[i] * 0.55) * PEAK_ALPHA;
        ctx.fillRect(x[i], y[i], STREAK_WIDTH, 2);
      }
    }
  };

  return { resize, tick, drawStill };
}
