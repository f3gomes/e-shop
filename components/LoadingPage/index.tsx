import { CircularProgress } from "@mui/material";

export default function LoadingPage() {
  return (
    <div className="w-full text-center mt-28">
      <CircularProgress size={60} className="text-shop-text-default" />
    </div>
  );
}
