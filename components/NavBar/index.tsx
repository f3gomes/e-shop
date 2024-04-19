import Link from "next/link";
import { cn } from "@/utils/merge";
import { Redressed } from "next/font/google";

import { Container } from "../Container";
import { CartCount } from "../CartCount";
import { UserMenu } from "../UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NavCategories } from "../NavCategories";
import { SearchBar } from "../SearchBar";
import { shopInfo } from "@/info/shop";
import Image from "next/image";

const font = Redressed({ subsets: ["latin"], weight: ["400"] });

export async function NavBar() {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-shop-header-bg z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0 select-none">
            <Link
              href={"/"}
              className={cn(font.className, "font-bold text-2xl")}
            >
              <div className="flex gap-2 items-center max-sm:text-xl">
                <Image
                  alt="logo"
                  src={"/assets/logo.png"}
                  width={30}
                  height={30}
                  className="static rounded-full"
                />
                {shopInfo.name}
              </div>
            </Link>

            <div className="hidden md:block">
              <SearchBar />
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>

      <NavCategories />
    </div>
  );
}
