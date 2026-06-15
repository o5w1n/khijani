import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khijani Africa: Critical Thinking for African Youth",
  description:
    "Real African dilemmas. Multiple perspectives. Hard decisions. No easy answers. Khijani builds critical thinkers through live classroom conundrums scored by the Khijani Index.",
  openGraph: {
    title: "Khijani Africa: Critical Thinking for African Youth",
    description:
      "Train your mind. Shape your world. Live classroom conundrums that build measurable critical thinking skills.",
    siteName: "Khijani Africa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
