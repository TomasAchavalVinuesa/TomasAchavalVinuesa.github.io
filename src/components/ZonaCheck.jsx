import React from 'react';

export const ZonaCheck = ({ label }) => (
  <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border-2 border-slate-300 shadow-sm">
    <input type="checkbox" className="w-6 h-6 accent-pami-blue" />
    <span className="text-lg font-bold uppercase text-gray-800">{label}</span>
  </label>
);
