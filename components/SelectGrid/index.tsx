"use client";

import { GridType } from "@/types/product";
import { useCallback, useEffect, useState } from "react";
import { SelectImage } from "../SelectImage";
import { CustomButton } from "../ProductAddButton";

interface SelectGridProps {
  item: GridType;
  addGridToState: (value: GridType) => void;
  removeGridToState: (value: GridType) => void;
  isProductCreated: boolean;
}

export function SelectGrid({
  item,
  addGridToState,
  removeGridToState,
  isProductCreated,
}: SelectGridProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addGridToState({ ...item, image: value });
  }, []); // eslint-disable-line

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeGridToState(item);
    }
  }, []); // eslint-disable-line

  return (
    <div className="gird grid-cols-1 overflow-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />

        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color} ({item.size})
        </label>
      </div>

      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}

        {file && (
          <div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
            <p>{file?.name}</p>
            <div className=" w-[70px]">
              <CustomButton
                small
                label="Remover"
                onClick={() => {
                  setFile(null);
                  removeGridToState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
}
