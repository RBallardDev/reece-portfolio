import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { neueMontreal } from "./styles/fonts";
import Header from "@/components/layout/Header";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Reece Ballard",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={neueMontreal.variable}>
      <body
        suppressHydrationWarning
        className="bg-black text-white font-sans antialiased"
      >
        <LenisProvider />
        <Header />
        {children}
      </body>
    </html>
  );
}
