"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/Heading";
import { Order, Product, Review } from "@prisma/client";
import { Input } from "@/components/Input";
import { CustomButton } from "@/components/CustomButton";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };

  user:
  | (any & {
    orders: Order[];
  })
  | null;
}

export default function AddRating({ product, user }: AddRatingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const setCustomvalue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (data.rating === 0 || !data.rating) {
      setIsLoading(false);
      return toast.error("Selecione uma nota!");
    }

    const ratingData = { ...data, userId: user?.id, product: product };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Avaliação enviada");
        router.refresh();
        reset;
      })
      .catch((err) => {
        toast.error("Algo deu errado!");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  const deliveredOrder = user?.orders.some((order: Order) =>
    order.products.find(
      (item) => item.id === product.id && order.deliveryStatus === "delivered"
    )
  );

  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id;
  });

  if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Avalie este produto" />
      <Rating
        className="w-fit"
        onChange={(event, newValue) => {
          setCustomvalue("rating", newValue);
        }}
      />

      <Input
        id="comment"
        label="Comentário"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <CustomButton
        onClick={handleSubmit(onSubmit)}
        label={isLoading ? "Carregando..." : "Enviar"}
      />
    </div>
  );
}
