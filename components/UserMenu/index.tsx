"use client";

import { useCallback, useState } from "react";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { AiFillCaretDown } from "react-icons/ai";

import { Avatar } from "../Avatar";
import { BackDrop } from "../BackDrop";
import { UserMenuItem } from "../UserMenuItem";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null | any;
}

export function UserMenu({ currentUser }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition duration-300 text-slate-700"
        >
          <Avatar src={""} />
          <AiFillCaretDown />
        </div>

        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href={"/orders"}>
                  <UserMenuItem onClick={toggleOpen}>Meus Pedidos</UserMenuItem>
                </Link>

                <Link href={"/admin"}>
                  <UserMenuItem onClick={toggleOpen}>Painel</UserMenuItem>
                </Link>
                
                <hr />
                <UserMenuItem
                  onClick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Sair
                </UserMenuItem>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <UserMenuItem onClick={toggleOpen}>Entrar</UserMenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
}
