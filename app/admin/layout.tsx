import { AdminNav } from "@/components/Admin/AdminNav";
import { shopInfo } from "@/info/shop";
import React, { ReactNode } from "react";

export const metadata = {
  title: shopInfo.name,
  description: "Admin Dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
