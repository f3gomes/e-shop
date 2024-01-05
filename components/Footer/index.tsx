import { ReactNode } from "react";
import { FooterList } from "../FooterList";
import { Container } from "../Container";
import Link from "next/link";
import { shopInfo } from "@/shop-info/data";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

interface FooterProps {
  children?: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>

            <Link href={"#"}>Phones</Link>
            <Link href={"#"}>Laptops</Link>
            <Link href={"#"}>Desktops</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>

            <Link href={"#"}>Contact Us</Link>
            <Link href={"#"}>Shipping Policy</Link>
            <Link href={"#"}>Return & Exchanges</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>

            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odit
              earum aut pariatur, veritatis modi perspiciatis labore quam
              soluta, corrupti, et corporis enim! Ab in dicta vero tempore
              dignissimos nemo!
            </p>

            <p>
              &copy; {new Date().getFullYear()} {shopInfo.name} All rights
              reserved
            </p>
          </div>

          <FooterList>
            <h3 className="text-balance font-bold">Follow Us</h3>
            <div className="flex gap-2">
              <Link href={"/"}>
                <MdFacebook size={24} />{" "}
              </Link>

              <Link href={"/"}>
                <AiFillInstagram size={24} />{" "}
              </Link>

              <Link href={"/"}>
                <AiFillTwitterCircle size={24} />{" "}
              </Link>

              <Link href={"/"}>
                <AiFillYoutube size={24} />{" "}
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
