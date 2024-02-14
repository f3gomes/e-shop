"use client";

import React, { useCallback, useEffect, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";
import toast from "react-hot-toast";

import { gridArr } from "@/info/grid";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/libs/firebase";
import { Heading } from "@/components/Heading";

import { TextArea } from "@/components/TextArea";
import { SelectGrid } from "@/components/SelectGrid";
import { CategoryInput } from "@/components/CategoryInput";
import { GridType, UploadedGridType } from "@/types/product";
import { CustomButton } from "@/components/CustomButton";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { categories } from "@/info/categories";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [grid, setGrid] = useState<GridType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const router = useRouter();

  const {
    watch,
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      grid: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("grid", grid);
  }, [grid]); // eslint-disable-line

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setGrid(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]); // eslint-disable-line

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addGridToState = useCallback((value: GridType) => {
    setGrid((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeGridToState = useCallback((value: GridType) => {
    setGrid((prev) => {
      if (prev) {
        const filteredGrid = prev.filter((item) => item.color !== value.color);

        return filteredGrid;
      }

      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    let uploadedGrid: UploadedGridType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Categoria não está selecionada!");
    }

    if (!data.grid || data.grid.length === 0) {
      setIsLoading(false);
      return toast.error("Imagem não foi selecionada!");
    }

    const handleGridUpload = async () => {
      toast("Salvando produto, aguarde...");

      try {
        for (const item of data.grid) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `/products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },

                (error) => {
                  console.log("Error uploading image: ", error);
                  reject(error);
                },

                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                      uploadedGrid.push({
                        ...item,
                        image: downloadUrl,
                      });

                      console.log("File avaliable at ", downloadUrl);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL: ", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling grid upload: ", error);
        return toast.error("Erro ao fazer upload de imagens");
      }
    };

    await handleGridUpload();
    const productData = { ...data, grid: uploadedGrid };

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Produto criado com sucesso!");
        setIsProductCreated(true);
        router.refresh();
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Erro ao criar produto no banco de dados!");
        console.log("Error into save products on database: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Adicionar Produto" center />

      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="price"
        label="Preço"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        min={0}
      />

      <Input
        id="brand"
        label="Marca"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="description"
        label="Descrição"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Selecione uma categoria</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "Todas") {
              return null;
            }

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  icon={item.icon}
                  label={item.label}
                  selected={category === item.label}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Selecione as cores disponíveis e adicione as fotos do produto.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {gridArr.map((item) => {
            return (
              <SelectGrid
                item={item}
                key={item.colorCode}
                addGridToState={addGridToState}
                removeGridToState={removeGridToState}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>

      <CustomButton
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
        label={isLoading ? "Carregando... " : "Adicionar"}
      />
    </>
  );
}
