import React from 'react';

export const Header = ({ title }) => (
  <div className="bg-pami-light-blue text-white p-6 text-center shadow-lg border-b-[4px] border-black/30">
    <h1 className="text-xl font-bold tracking-tight uppercase italic opacity-90">
      SISTEMA DE SALUD EXCLUSIVO PARA PERSONAS MAYORES O CON DISCAPACIDAD
    </h1>
    {title && <p className="text-5xl font-black mt-4 text-white drop-shadow-md uppercase tracking-tight">{title}</p>}
  </div>
);
