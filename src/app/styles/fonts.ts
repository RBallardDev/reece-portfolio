import localFont from "next/font/local";

export const neueMontreal = localFont({
  src: [
    {
      path: "../../../public/fonts/PPNeueMontreal-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PPNeueMontreal-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PPNeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PPNeueMontreal-SemiBolditalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../../public/fonts/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue",
  display: "swap",
});