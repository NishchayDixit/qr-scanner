import QRCodeStyling from "qr-code-styling";

export const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  dotsOptions: { color: "#000", type: "rounded" },
  backgroundOptions: { color: "#ffffff" },
  imageOptions: { crossOrigin: "anonymous", margin: 5 },
});