"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, description, children, maxWidth = "max-w-md" }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} mx-4 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1.5 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
