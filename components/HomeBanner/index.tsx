import { shopInfo } from "@/info/shop";
import Image from "next/image";
import { ReactNode } from "react";

interface HomeBannerProps {
  children?: ReactNode;
}

export function HomeBanner({ children }: HomeBannerProps) {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center select-none">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {shopInfo.promo.title}
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            {shopInfo.promo.description}
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
            {shopInfo.promo.discountMessage}
          </p>
        </div>

        <div className="w-1/3 relative aspect-video">
          <Image
            fill
            priority
            src="/assets/banner.png"
            alt="Banner Image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
