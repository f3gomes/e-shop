import Link from "next/link";
import { shopInfo } from "@/shop-info/data";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

import { Container } from "../Container";
import { FooterList } from "../FooterList";

export function Footer() {
  const iconStyle = "hover:scale-110 transition duration-300";

  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">
              {shopInfo.footer.categories.title}
            </h3>

            <Link href={"/"}>{shopInfo.footer.categories.category1}</Link>
            <Link href={"/"}>{shopInfo.footer.categories.category2}</Link>
            <Link href={"/"}>{shopInfo.footer.categories.category3}</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-base font-bold mb-2">
              {shopInfo.footer.services.title}
            </h3>

            <Link href={"/"}>{shopInfo.footer.services.service1}</Link>
            <Link href={"/"}>{shopInfo.footer.services.service2}</Link>
            <Link href={"/"}>{shopInfo.footer.services.service3}</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">
              {shopInfo.footer.about.title}
            </h3>

            <p className="mb-2 text-justify">{shopInfo.footer.about.text}</p>

            <p>
              &copy; {new Date().getFullYear()} {shopInfo.name} Todos os
              direitos reservados
            </p>
          </div>

          <FooterList>
            <h3 className="text-balance font-bold">Redes sociais</h3>
            <div className="flex gap-2">
              <Link
                className={iconStyle}
                href={shopInfo.footer.socials.facebook}
              >
                <MdFacebook size={24} />{" "}
              </Link>

              <Link
                className={iconStyle}
                href={shopInfo.footer.socials.instagram}
              >
                <AiFillInstagram size={24} />{" "}
              </Link>

              <Link
                className={iconStyle}
                href={shopInfo.footer.socials.twitter}
              >
                <AiFillTwitterCircle size={24} />{" "}
              </Link>

              <Link
                className={iconStyle}
                href={shopInfo.footer.socials.youtube}
              >
                <AiFillYoutube size={24} />{" "}
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
