import React from 'react';

export const BigButton = ({ color, icon, label, sub, onClick, dark }) => (
  <button 
    onClick={onClick} 
    className={`${color} w-full h-[380px] px-6 rounded-[60px] shadow-2xl flex flex-col items-center justify-center text-center gap-6 border-8 border-white active:brightness-90`}
  >
    {/* Ajuste automático de texto negro u oscuro según el fondo recibido */}
    <div className={dark ? "text-white" : "text-black"}>{icon}</div>
    <h2 className={`text-4xl font-black ${dark ? "text-white" : "text-black"} leading-tight uppercase`}>
      {label}
    </h2>
    <p className={`text-xl font-extrabold ${dark ? "text-white/90" : "text-black"} uppercase italic`}>
      {sub}
    </p>
  </button>
);
