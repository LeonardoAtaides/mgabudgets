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
    <div className="fixed inset-0 xl:inset-auto xl:top-20 xl:left-80 flex items-center justify-center z-50 bg-black/40 xl:bg-transparent">
      <div className="bg-white border p-4 xl:p-6 rounded shadow-lg w-[85%] max-w-sm xl:w-full">
        <p className="mb-4 text-black text-sm xl:text-base">{mensagem}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};