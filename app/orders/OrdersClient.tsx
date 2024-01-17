"use client";

import React from "react";

import moment from "moment";

import { useRouter } from "next/navigation";
import { Status } from "@/components/Status";
import { Order, User } from "@prisma/client";
import { Heading } from "@/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { ActionBtn } from "@/components/ActionBtn";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

export default function OrdersClient({ orders }: OrdersClientProps) {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    rows = orders.map((item: any) => {
      return {
        id: item.id,
        customer: item.user.name,
        amount: formatPrice(item.amount / 100),
        paymentStatus: item.status,
        date: moment(item.createDate).fromNow(),
        deliveryStatus: item.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 210 },
    { field: "customer", headerName: "Nome do Cliente", width: 130 },
    {
      field: "amount",
      headerName: "Valor (R$)",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Pagamento",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="Pendente"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="Confirmado"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Entrega",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="Pendente"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="Enviado"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="Entregue"
                icon={MdDeliveryDining}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    { field: "date", headerName: "Data", width: 130 },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              tooltip=""
              icon={MdRemoveRedEye}
              onClick={() => router.push(`/order/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1100px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Editar Pedidos" center />
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}