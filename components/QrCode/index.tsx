import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button, CircularProgress, Input, Tooltip } from "@mui/material";
import toast from "react-hot-toast";

export type QRCodeProps = {
  isLoading: boolean;
  code: string;
};

export default function QRCode({ isLoading, code }: QRCodeProps) {
  const [qrCodeCopied, setQRCodeCopied] = useState(false);

  const handleQrCodeCopy = () => {
    navigator.clipboard.writeText(code);
    setQRCodeCopied(true);
    toast("QR code copiado!");

    const timerTooltip = setTimeout(() => setQRCodeCopied(false), 1500);
    return () => clearTimeout(timerTooltip);
  };

  if (isLoading) {
    return <CircularProgress size={10} />;
  }

  return (
    <div>
      <QRCodeSVG value={code} width={250} height={250} />

      <div className="flex flex-col">
        <Input value={code} disabled={true} />
        <Button onClick={handleQrCodeCopy}>Copiar QR Code</Button>
      </div>
    </div>
  );
}
