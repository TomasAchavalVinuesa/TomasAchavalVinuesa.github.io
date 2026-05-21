import React from 'react';

export const MenuCard = ({ color, label, icon, onClick, dark }) => (
  <button onClick={onClick} className={`${color} ${dark ? 'text-white' : 'text-pami-blue'} p-12 rounded-[50px] shadow-2xl border-8 border-white flex flex-col items-center justify-center gap-6 hover:scale-105 active:scale-95 transition-transform`}>
    {icon}
    <span className="text-4xl font-black italic">{label}</span>
  </button>
);
