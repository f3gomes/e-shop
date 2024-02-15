import type, { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { cn } from "@/utils/merge";
import { shopInfo } from "@/info/shop";
import { Poppins } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import CartProvider from "@/providers/CartProvider";

import "./globals.css";
import WhatsappBtn from "@/components/WhatsappBtn";

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
      <body
        className={cn(font.className, "text-shop-text-default bg-shop-body-bg")}
      >
        <Toaster
          toastOptions={{
            duration: 1500,
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
        <WhatsappBtn />
      </body>
    </html>
  );
}
