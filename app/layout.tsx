import type, { Metadata } from "next";
import { Poppins } from "next/font/google";
import { shopInfo } from "@/shop-info/data";

import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { cn } from "@/utils/merge";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";

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
      <body className={cn(font.className, "text-slate-700")}>
        <Toaster
          toastOptions={{
            style: { background: "rgb(51 65 85)", color: "#fff" },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
