import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Playground | mathsantos.dev",
  description: "Just a playground with some ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable
        )}
      >
        <Providers>
          <Header />
          <main className="flex-1 ">
            <div className="container py-8">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
