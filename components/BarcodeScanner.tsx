import { useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onDetected, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
          ],
        },
      },
      (err: string) => {
        if (err) {
          console.error("Erro ao inicializar Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDetected = (result: any) => {
      if (result.codeResult.code) {
        // Evita que o teclado virtual suba
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        onDetected(result.codeResult.code);
        Quagga.stop();
        onClose();
      }
    };

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected); // <- garante que não vai acumular
      Quagga.stop();
    };
  }, [onDetected, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Escaneie o código de barras</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>
        <div
          ref={videoRef}
          className="w-full h-64 bg-black relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[280px] h-[180px] border-2 border-white rounded-lg">
              <div className="absolute top-0 left-0 w-[20px] h-[20px] border-t-4 border-l-4 border-blue-500"></div>
              <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-4 border-r-4 border-blue-500"></div>
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-4 border-l-4 border-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-[20px] h-[20px] border-b-4 border-r-4 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
