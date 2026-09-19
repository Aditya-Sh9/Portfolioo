import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/animations/lenis/SmoothScroll";
import Navbar from "@/components/navigation/Navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Sharma — Web Developer / Creative Technologist",
  description: "Portfolio of Aditya Sharma, web developer and creative technologist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
