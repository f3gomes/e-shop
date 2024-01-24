"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";

import { AdminNavItem } from "../AdminNavItem";
import { Container } from "@/components/Container";

export function AdminNav() {
  const pathName = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-2">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center md:gap-12 overflow-x-auto flex-nowrap">
          <Link href={"/admin"}>
            <AdminNavItem
              label="Resumo"
              icon={MdDashboard}
              selected={pathName === "/admin"}
            />
          </Link>

          <Link href={"/admin/add-products"}>
            <AdminNavItem
              label="Adicionar"
              icon={MdLibraryAdd}
              selected={pathName === "/admin/add-products"}
            />
          </Link>

          <Link href={"/admin/manage-products"}>
            <AdminNavItem
              label="Editar"
              icon={MdDns}
              selected={pathName === "/admin/manage-products"}
            />
          </Link>

          <Link href={"/admin/manage-orders"}>
            <AdminNavItem
              label="Pedidos"
              icon={MdFormatListBulleted}
              selected={pathName === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
