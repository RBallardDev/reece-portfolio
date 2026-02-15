import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { neueMontreal } from "./styles/fonts";
import Header from "@/components/layout/Header";
import LenisProvider from "@/components/LenisProvider";
import PageTransitionProvider from "@/components/transitions/PageTransitionProvider";

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
      <head>
        {/* Preload Me page photos so they're cached before the user navigates there */}
        <link rel="preload" href="/images/me/eating1.jpg" as="image" />
        <link rel="preload" href="/images/me/eating2.jpg" as="image" />
      </head>
      <body
        suppressHydrationWarning
        className="bg-black text-white font-sans antialiased"
      >
        <LenisProvider />
        <PageTransitionProvider>
          <Header />
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}
