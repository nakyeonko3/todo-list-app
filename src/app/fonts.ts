import localFont from "next/font/local";

export const nanumSquare = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquare/NanumSquareR.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquare/NanumSquareB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquare/NanumSquareEB.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-nanum-square",
});

export const hsSantokki = localFont({
  src: "../../public/fonts/HSSantokki/HSSantokki-Regular.woff2",
  display: "swap",
  variable: "--font-hs-santokki",
});
