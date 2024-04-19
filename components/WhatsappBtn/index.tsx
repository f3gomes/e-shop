"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { Tooltip } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsappBtn() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
    } else if (scrolled <= 100) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Tooltip title="Fale conosco">
      <Link
        target="_blank"
        href={"https://wa.me/"}
        className="bg-green-500 hover:scale-110 items-center justify-center transition-all duration-300 fixed w-12 h-12 right-8 bottom-8 text-5xl z-10 cursor-pointer leading-10 rounded-full px-2 shadow-[0_0_0_4px_rgba(0,0,0,0.3)]"
        style={{ display: visible ? "flex" : "none" }}
        onClick={scrollToTop}
      >
        <FaWhatsapp size={40} />
      </Link>
    </Tooltip>
  );
}

export default WhatsappBtn;
