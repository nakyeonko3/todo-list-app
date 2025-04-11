import Header from "@/components/ui/Header";
import Providers from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";
import { nanumSquare } from "@/styles/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";

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
          <ToastProvider>
            <main className="mx-auto w-full max-w-container px-4 pt-4">
              {children}
            </main>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
