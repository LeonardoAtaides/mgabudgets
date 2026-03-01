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
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white border p-5 rounded shadow-lg max-w-sm w-full relative">
        {/* Botão de fechar no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>

        {/* Mensagem */}
        <p className="mb-4 text-black">{mensagem}</p>
      </div>
    </div>
  );
};