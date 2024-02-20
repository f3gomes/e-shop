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
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

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
        orderNumber: item.orderNumber,
        customer: item.user.name,
        amount: formatPrice(item.amount / 100),
        paymentStatus: item.status,
        date: moment(item.createDate).format("DD-MM-YY | HH:mm"),
        deliveryStatus: item.deliveryStatus,
        paymentIntentId: item.paymentIntentId,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "orderNumber", headerName: "Número do Pedido", width: 150 },
    { field: "customer", headerName: "Nome do Cliente", width: 130 },
    {
      field: "amount",
      headerName: "Valor (R$)",
      width: 100,
      renderCell: (params) => {
        return <div className="font-bold">{params.row.amount}</div>;
      },
    },
    {
      field: "paymentIntentId",
      headerName: "Forma",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.paymentIntentId.slice(0, 3) === "pix" ? (
              <div className="font-bold">PIX</div>
            ) : (
              <div className="font-bold">CARTÃO</div>
            )}
          </>
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
                bg="bg-shop-tb-bg"
                color=""
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
                bg="bg-shop-tb-bg"
                color=""
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
    { field: "date", headerName: "Data", width: 140 },
    {
      field: "actions",
      headerName: "Ações",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              tooltip="Ver Detalhes"
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
        <Heading title="Meus Pedidos" center />
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          className="!text-shop-text-default"
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
