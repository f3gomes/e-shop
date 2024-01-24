"use client";

import { GridType } from "@/types/product";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface SelectImageProps {
  item?: GridType;
  handleFileChange: (value: File) => void;
}

export function SelectImage({ item, handleFileChange }: SelectImageProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []); // eslint-disable-line

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-shop-input-text  flex items-center"
    >
      <input type="text" {...getInputProps()} />
      {isDragActive ? (
        <p>Arraste a imagem aqui...</p>
      ) : (
        <p>+ Adicionar imagem</p>
      )}
    </div>
  );
}
