import { QRCodeGeneratorProps } from "@/common/interface";
import { qrCode } from "@/common/QRConfig";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url, favicon }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (url) {
      qrCode.update({ data: url, image: favicon });
      qrCode.append(qrRef.current!);
    }
  }, [url, favicon]);

  const downloadQR = async () => {
    const blob = await qrCode.getRawData("png");
    if (!blob || !(blob instanceof Blob)) {
      console.error("Failed to generate QR code.");
      return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="text-center min-h-64 space-y-3">
      <div ref={qrRef} className="flex justify-center"/>
      <Button onClick={downloadQR}>Download QR</Button>
    </div>
  );
}

export default QRCodeGenerator;