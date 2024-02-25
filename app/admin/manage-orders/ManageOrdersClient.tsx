"use client";

import React, { useCallback, useState } from "react";

import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { Status } from "@/components/Status";
import { Order, User } from "@prisma/client";
import { Heading } from "@/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { ActionBtn } from "@/components/ActionBtn";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";
import ConfirmationModal from "@/components/ConfirmationModal";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdPayments,
  MdRemoveRedEye,
} from "react-icons/md";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

export default function ManageOrdersClient({
  orders,
}: ManageOrdersClientProps) {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [dataConfirm, setDataConfirm] = useState({
    status: "",
    text: "",
    id: "",
  });

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
    { field: "orderNumber", headerName: "Número do Pedido", width: 130 },
    { field: "customer", headerName: "Nome do Cliente", width: 160 },
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
      width: 70,
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
              onClick={() => {
                setOpenModalConfirm(true);
                setDataConfirm({
                  id: params.row.id,
                  status: "complete",
                  text: "Confirmar pagamento desse pedido?",
                });
              }}
            />

            <ActionBtn
              tooltip="Confirmar envio"
              icon={MdDeliveryDining}
              onClick={() => {
                setOpenModalConfirm(true);
                setDataConfirm({
                  id: params.row.id,
                  status: "dispatched",
                  text: "Confirmar envio desse pedido?",
                });
              }}
            />

            <ActionBtn
              tooltip="Confirmar entrega"
              icon={MdDone}
              onClick={() => {
                setOpenModalConfirm(true);
                setDataConfirm({
                  id: params.row.id,
                  status: "delivered",
                  text: "Confirmar entrega desse pedido?",
                });
              }}
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
    (id: string, paymentStatus: string) => {
      axios
        .put("/api/order", {
          id,
          paymentStatus,
        })
        .then((res) => {
          toast.success("Pagamento confirmado!");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Algo deu errado!");
          console.log(err);
        });
    },
    [] // eslint-disable-line
  );

  const handleDispatch = useCallback(
    (id: string, deliveryStatus: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus,
        })
        .then((res) => {
          toast.success("Pedido enviado!");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Algo deu errado!");
          console.log(err);
        });
    },
    [] // eslint-disable-line
  );

  const handleDelivery = useCallback(
    (id: string, deliveryStatus: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus,
        })
        .then((res) => {
          toast.success("Pedido entregue!");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Algo deu errado!");
          console.log(err);
        });
    },
    [] // eslint-disable-line
  );

  const handleConfirmAction = (id: string, status: string) => {
    switch (status) {
      case "complete":
        handlePayment(id, status);
        break;
      case "dispatched":
        handleDispatch(id, status);
        break;
      case "delivered":
        handleDelivery(id, status);
        break;
      default:
        break;
    }
  };

  const handleConfirm = () => {
    setOpenModalConfirm(false);
    handleConfirmAction(dataConfirm.id, dataConfirm.status);
  };

  return (
    <div className="max-w-[1100px] m-auto text-xl">
      <ConfirmationModal
        text={dataConfirm.text}
        openModal={openModalConfirm}
        handleConfirm={handleConfirm}
        handleClose={() => setOpenModalConfirm(false)}
      />

      <div className="mb-4 mt-8">
        <Heading title="Editar Pedidos" center />
      </div>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          className="!text-shop-text-default"
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      </div>
    </div>
  );
}
