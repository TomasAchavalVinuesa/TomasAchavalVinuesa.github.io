import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-white rounded-[50px] w-full max-w-4xl overflow-hidden border-[12px] border-pami-blue shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="bg-pami-blue p-8 flex justify-between items-center text-white">
          <h2 className="text-4xl font-black uppercase tracking-tighter">{title}</h2>
          <button 
            onClick={onClose} 
            className="bg-red-600 text-white rounded-full p-4 border-4 border-white hover:bg-red-700 active:scale-90 transition-transform"
          >
            <X size={50} />
          </button>
        </div>
        
        <div className="p-10 overflow-y-auto">
          {children}
        </div>
        
      </div>
    </div>
  );
};
