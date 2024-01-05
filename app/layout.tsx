import type, { Metadata } from "next";
import { Poppins } from "next/font/google";
import { shopInfo } from "@/shop-info/data";

import "./globals.css";

const font = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: shopInfo.name,
  description: shopInfo.greeting,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
