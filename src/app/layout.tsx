import Header from "@/app/components/Header";
import { nanumSquare } from "@/app/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "todo-list-app",
  description: "todo-list-app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanumSquare.className}>
        <Header />
        <main className="mx-auto w-full max-w-container px-4">{children}</main>
      </body>
    </html>
  );
}
