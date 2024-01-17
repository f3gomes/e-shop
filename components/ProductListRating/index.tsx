"use client";

import moment from "moment";
import { Heading } from "../Heading";
import { Rating } from "@mui/material";
import { Avatar } from "../Avatar";

interface ProductListRatingProps {
  product: any;
}

export function ProductListRating({ product }: ProductListRatingProps) {
  if (product.reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <Heading title="Avaliações de clientes" />

      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((item: any) => {
            return (
              <div key={item.id} className="max-w-[300px]">
                <div className="flex items-center gap-2">
                  <Avatar src={item?.user.image} />
                  <div className="font-semibold">{item?.user.name}</div>
                  <div className="font-light">
                    {moment(item.createDate).fromNow()}
                  </div>
                </div>

                <div className="mt-2">
                  <Rating value={item.rating} readOnly />
                  <div className="ml-2">{item.comment}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
