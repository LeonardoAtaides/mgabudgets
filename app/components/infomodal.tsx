import React from "react";
import { X } from "lucide-react";

interface InfoModalProps {
  mensagem: string;
  mostrar: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  mensagem,
  mostrar,
  onClose,
}) => {
  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border p-4 xl:p-5 rounded shadow-lg w-[85%] max-w-sm xl:w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>

        <p className="mb-4 text-black text-sm xl:text-base">{mensagem}</p>
      </div>
    </div>
  );
};