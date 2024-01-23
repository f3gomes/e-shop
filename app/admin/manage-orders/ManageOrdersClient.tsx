"use client";

import React, { useCallback } from "react";

import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Status } from "@/components/Status";
import { Order, User } from "@prisma/client";
import { Heading } from "@/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { ActionBtn } from "@/components/ActionBtn";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdPayments, MdRemoveRedEye } from "react-icons/md";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

export default function ManageOrdersClient({
  orders,
}: ManageOrdersClientProps) {
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    rows = orders.map((item: any) => {
      return {
        id: item.id,
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
    { field: "id", headerName: "ID", width: 160 },
    { field: "customer", headerName: "Nome do Cliente", width: 130 },
    {
      field: "amount",
      headerName: "Valor (R$)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentIntentId",
      headerName: "Forma",
      width: 70,
      renderCell: (params) => {
        return (
          <>
            {params.row.paymentIntentId.slice(0, 3) === "pix" ? (
              <div className="font-bold text-slate-800">PIX</div>
            ) : (
              <div className="font-bold text-slate-800">CARTÃO</div>
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
              tooltip="Confirmar pagamento"
              icon={MdPayments}
              onClick={() => handlePayment(params.row.id)}
            />

            <ActionBtn
              tooltip="Confirmar envio"
              icon={MdDeliveryDining}
              onClick={() => handleDispatch(params.row.id)}
            />

            <ActionBtn
              tooltip="Confirmar recebimento"
              icon={MdDone}
              onClick={() => handleDelivery(params.row.id)}
            />

            <ActionBtn
              tooltip="Ver detalhes"
              icon={MdRemoveRedEye}
              onClick={() => router.push(`/order/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  const handlePayment = useCallback(
    (id: string) => {
      if (confirm("Confirmar pagamento deste pedido?")) {
        axios
          .put("/api/order", {
            id,
            paymentStatus: "complete",
          })
          .then((res) => {
            toast.success("Pagamento confirmado!");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Algo deu errado!");
            console.log(err);
          });
      }
    },
    [] // eslint-disable-line
  );

  const handleDispatch = useCallback(
    (id: string) => {
      if (confirm("Confirmar envio do pedido?")) {
        axios
          .put("/api/order", {
            id,
            deliveryStatus: "dispatched",
          })
          .then((res) => {
            toast.success("Pedido enviado!");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Algo deu errado!");
            console.log(err);
          });
      }
    },
    [] // eslint-disable-line
  );

  const handleDelivery = useCallback(
    (id: string) => {
      if (confirm("Confirmar recebimento do pedido?")) {
        axios
          .put("/api/order", {
            id,
            deliveryStatus: "delivered",
          })
          .then((res) => {
            toast.success("Pedido recebido!");
            router.refresh();
          })
          .catch((err) => {
            toast.error("Algo deu errado!");
            console.log(err);
          });
      }
    },
    [] // eslint-disable-line
  );

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
