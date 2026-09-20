import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Case-study bodies in src/content/projects/*.mdx are imported by the route, not routed
// directly, so pageExtensions stays default. No remark/rehype plugins by design.
const withMDX = createMDX({});

export default withMDX(nextConfig);
