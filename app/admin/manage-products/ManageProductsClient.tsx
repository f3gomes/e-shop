"use client";

import React, { useCallback } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import { IProduct } from "@/types/product";
import { useRouter } from "next/navigation";
import { Status } from "@/components/Status";
import { firebaseApp } from "@/libs/firebase";
import { Heading } from "@/components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { ActionBtn } from "@/components/ActionBtn";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";

interface ManageProductsClientProps {
  products: IProduct[] | any;
}

export default function ManageProductsClient({
  products,
}: ManageProductsClientProps) {
  const router = useRouter();
  const storage = getStorage(firebaseApp);

  let rows: any = [];

  if (products) {
    rows = products.map((item: IProduct) => {
      return {
        id: item.id,
        name: item.name,
        price: formatPrice(item.price),
        category: item.category,
        brand: item.brand,
        grid: item.grid,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 230 },
    { field: "name", headerName: "Nome", width: 230 },
    {
      field: "price",
      headerName: "Preço (R$)",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Categoria", width: 120 },
    { field: "brand", headerName: "Marca", width: 120 },
    {
      field: "action",
      headerName: "Ações",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4">
            <ActionBtn
              tooltip="Ver detalhes"
              icon={MdRemoveRedEye}
              onClick={() => {}}
            />
            <ActionBtn
              tooltip="Excluir produto"
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id, params.row.grid)}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback(
    (id: string, colorCode: string, newStock: number) => {
      axios
        .put("/api/product", {
          id,
          colorCode,
          newStock,
        })
        .then((res) => {
          toast.success("Produto atualizado!");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Algo deu errado!");
          console.log(err);
        });
    },
    [] // eslint-disable-line
  );

  const handleDelete = useCallback(async (id: string, grid: any[]) => {
    if (confirm("Tem certeza?")) {
      toast("Removendo produto...");

      const handleImageDelete = async () => {
        try {
          for (const item of grid) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
              console.log("Image deleted: ", item.image);
            }
          }
        } catch (error) {
          return console.log("Deleting images error: ", error);
        }
      };

      await handleImageDelete();

      axios
        .delete(`/api/product/${id}`)
        .then((res) => {
          toast.success("Produto removido do banco de dados!");
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []); // eslint-disable-line

  return (
    <div className="max-w-[1100px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Editar Produtos" center />
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
