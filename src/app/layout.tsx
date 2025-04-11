import Header from "@/app/components/ui/Header";
import { nanumSquare } from "@/app/fonts";
import Providers from "@/app/QueryProvider";
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
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-container px-4 pt-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
