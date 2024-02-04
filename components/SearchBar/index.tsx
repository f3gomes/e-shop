"use client";

import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center relative">
        <input
          type="text"
          autoComplete="off"
          placeholder="Buscar no site"
          className="w-80 py-2 px-9 border bg-shop-input border-shop-line rounded-md focus:outline-none focus:border-[0.5px] focus:border-shop-link"
          {...register("searchTerm")}
        />

        <button type="submit" className="absolute left-2">
          <MdSearch
            size={24}
            className="cursor-pointer active:scale-110 transition duration-200"
          />
        </button>
      </div>
    </form>
  );
}
