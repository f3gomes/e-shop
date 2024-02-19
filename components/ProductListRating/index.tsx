"use client";

import { Heading } from "../Heading";
import { LinearProgress, Rating } from "@mui/material";
import { Avatar } from "../Avatar";
import dayjs from "dayjs";

import "dayjs/locale/pt-br";
import { MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";

interface ProductListRatingProps {
  product: any;
}

export function ProductListRating({ product }: ProductListRatingProps) {
  dayjs.locale("pt-br");

  const ratingCounts = Array(6).fill(0);
  const ratings = product?.reviews;

  ratings.forEach((rating: any) => {
    ratingCounts[rating.rating]++;
  });

  const totalRatings = ratings.length;

  const ratingPercentages = ratingCounts.map((count) =>
    Math.round((count / totalRatings) * 100)
  );

  // Calcula a média
  let sum = 0;
  for (let i = 0; i < 6; i++) {
    sum += i * ratingCounts[i];
  }
  const averageRating = totalRatings === 0 ? 0 : sum / totalRatings;

  if (product.reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <Heading title="Avaliações de clientes" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm mt-12">
        <div className="max-w-96 text-base">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="text-2xl font-semibold">
                {averageRating.toFixed(1)}
              </div>
              <div>
                <MdOutlineStar size={25} className="text-[#faaf00]" />
              </div>
            </div>
            <div>
              {product.reviews.length}{" "}
              {product.reviews.length === 1 ? "avaliação" : "avaliações"}
            </div>
          </div>

          <hr className="mt-4 mb-4" />
          <div>Classificação</div>

          {[0, 1, 2, 3, 4, 5].reverse().map((item, index) => (
            <div key={index} className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 flex justify-center">{item}</div>
                <MdOutlineStar size={15} className="text-[#faaf00]" />
              </div>

              <div>
                <LinearProgress
                  className="w-72"
                  variant="determinate"
                  value={ratingPercentages[item]}
                />
              </div>

              <div className="w-3 flex justify-center">
                {ratingCounts[item]}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[0.75rem]">
          <div>
            {product.reviews.length}{" "}
            {product.reviews.length === 1 ? "comentário" : "comentários"}
          </div>
          <hr className="mt-4 mb-4" />

          {product.reviews &&
            product.reviews.map((item: any) => {
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar src={item?.user.image} />

                      <div className="font-semibold flex gap-1">
                        <div>{item?.user.name.split(" ", 1)}</div>
                        <div>{item?.user.name.split(" ", 2)[1]}</div>
                      </div>
                    </div>

                    <div className="font-light">
                      {dayjs(item.createDate).format("DD [de] MMMM [de] YYYY")}
                    </div>
                  </div>

                  <div className="mt-2">
                    <Rating
                      readOnly
                      value={item.rating}
                      emptyIcon={
                        <MdOutlineStarOutline className="text-shop-star-text" />
                      }
                    />
                    <div className="text-justify mt-4">{item.comment}</div>
                    <hr className="mt-10 mb-4" />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
