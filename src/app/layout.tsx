import type { Metadata } from "next";
import "./globals.css";
import { nanumSquare } from "@/app/fonts";

export const metadata: Metadata = {
  title: "todo-list-app",
  description: "todo-list-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={nanumSquare.className}>
        <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
