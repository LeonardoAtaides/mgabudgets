import React from "react";

interface ConfirmModalProps {
  mensagem: string;
  mostrar: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  mensagem,
  mostrar,
  onConfirm,
  onCancel,
}) => {
  if (!mostrar) return null;

  return (
    <div className="fixed top-20 left-80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded shadow-lg max-w-sm w-full">
        <p className="mb-4 text-black">{mensagem}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};