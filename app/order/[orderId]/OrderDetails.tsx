"use client";

import React from "react";

import moment from "moment";

import { Order } from "@prisma/client";
import { Status } from "@/components/Status";
import { Heading } from "@/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div>
        <Heading title="Detalhes do pedido" />
      </div>

      <div>ID do pedido: {order.id}</div>
      <div>
        Total do pedido:{" "}
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>

      <div className="flex gap-2">
        Forma de pagamento:
        <>
          {order.paymentIntentId.slice(0, 3) === "pix" ? (
            <div className="font-bold">PIX</div>
          ) : (
            <div className="font-bold">CARTÃO</div>
          )}
        </>
      </div>

      <div className="flex gap-2 items-center">
        <div>Status do pagamento:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pendente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="confirmado"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div>Status da entrega:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pendente"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="enviado"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="engregue"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div>Data da compra: {moment(order.createDate).format("DD-MM-YY | HH:mm")}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Items do pedido</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUTO</div>
          <div className="justify-self-center">PREÇO</div>
          <div className="justify-self-center">QTD</div>
          <div className="justify-self-end">TOTAL</div>
        </div>

        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
}
