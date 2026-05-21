import React from 'react';
import { X } from 'lucide-react';

export const SintomaCheck = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-4 cursor-pointer select-none">
    <div className={`w-12 h-12 border-4 border-pami-blue rounded-xl flex items-center justify-center flex-shrink-0 ${checked ? 'bg-pami-blue text-white' : 'bg-white'}`}>
      {checked && <X size={32} strokeWidth={3} />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className="text-3xl font-black uppercase text-pami-blue tracking-tighter">{label}</span>
  </label>
);
