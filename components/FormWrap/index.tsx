import { ReactNode } from "react";

interface FormWrapProps {
  children: ReactNode;
}

export function FormWrap({ children }: FormWrapProps) {
  return (
    <div className="min-h-fit h-full flex items-center justify-center pb-12 pt-14">
      <div className="max-w-[650px] w-full flex flex-col gap-6 items-center shadow-xl shadow-shop-footer-link rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
