import { useState, useCallback } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Check, Copy, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';

const QRCodeScanner = () => {
  const [scannedResult, setScannedResult] = useState('');
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      decodeQRCode(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
  });

  const decodeQRCode = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const codeReader = new BrowserMultiFormatReader();
          codeReader
            .decodeFromImageElement(img)
            .then((result) => {
              const text = result.getText();
              setScannedResult(text);
              saveToHistory(text);
            })
            .catch((err) => {
              if (err instanceof NotFoundException) {
                console.warn('No QR code found in the image.');
              } else {
                console.error('Error decoding QR code:', err);
              }
            });
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const saveToHistory = (qrText: string) => {
    chrome.storage.local.get({ history: [] }, (data: { history: string[] }) => {
      const historySet = new Set(data.history);
      if (!historySet.has(qrText)) {
        const updatedHistory = [...historySet, qrText];
        chrome.storage.local.set({ history: updatedHistory });
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(scannedResult).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setScannedResult('');
  };

  return (
    <div className="min-h-64 space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-lg cursor-pointer text-center transition-all duration-300 ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 bg-white'
        }`}
      >
        <Input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>

      {scannedResult && (
        <Card className="!mb-2 !p-0 shadow-sm border">
          <CardContent className="flex justify-between items-center p-3 text-start">
            <a
              href={scannedResult}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline truncate w-4/5"
            >{scannedResult}</a>
            <div className="flex gap-0.5">
              <Button onClick={handleCopy} className="!p-1.5 bg-transparent text-xl m-0 shadow-none text-primary hover:bg-transparent hover:text-gray-800">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </Button>
              <Button onClick={handleClear} className="!p-1.5 bg-transparent text-xl m-0 shadow-none text-destructive hover:bg-transparent hover:text-red-700">
                <Trash2 size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRCodeScanner;
