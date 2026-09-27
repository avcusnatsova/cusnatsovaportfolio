import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A V Cusnat Sova | Software Engineer",
  description: "Portfolio of A V Cusnat Sova, a Computer Science Engineering student building software and AI-powered applications with Java, Python, SQL, and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
    <body
      className={`${outfit.className} ${jetbrainsMono.variable} antialiased`}
    >
      {children}
    </body>
  </html>
  );
}
