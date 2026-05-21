import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { AssistantVoice } from '../components/AssistantVoice';

export const RecetasModule = () => {
  const navigate = useNavigate();
  const recetas = [
    { med: "ENALAPRIL 10mg", n: "#4452", status: "RECETA DISPONIBLE", color: "bg-pami-green", disp: true },
    { med: "METFORMINA 500mg", n: "#8821", status: "RECETA EN 5 DÍAS", color: "bg-pami-orange", disp: false },
    { med: "OMEPRAZOL 20mg", n: "#2201", status: "RECETA DISPONIBLE", color: "bg-pami-green", disp: true }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="MÓDULO DE RECETAS - SELECCIONE LA RECETA QUE DESEA RENOVAR" />
      
      <div className="flex-1 p-6 flex flex-col justify-center max-w-4xl mx-auto w-full space-y-4">
        {recetas.map(r => (
          <div 
            key={r.n} 
            onClick={() => navigate('/impresion', { state: { med: r.med, re: !r.disp } })} 
            className="bg-white border-[6px] border-pami-blue rounded-[30px] p-4 flex items-center gap-6 shadow-xl cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
          >
            <div className={`${r.color} p-4 rounded-xl text-white font-black text-lg text-center w-40 leading-tight flex-shrink-0`}>
              {r.status}<br/>
            </div>
            
            <div className="flex-1">
              <h3 className="text-3xl font-black text-pami-blue uppercase leading-tight">{r.med}</h3>
              <p className="text-xl font-bold text-gray-400">Orden {r.n} | Frecuencia: Cada 30 días</p>
            </div>
            
            <button className="bg-pami-light-blue text-white py-4 px-6 rounded-2xl font-black text-xl uppercase border-2 border-white shadow-md">
              {r.disp ? "Imprimir" : "Reimprimir"}
            </button>
          </div>
        ))}
      </div>

      <footer className="p-4 flex flex-col items-center justify-center">
        <AssistantVoice text="Aquí puede ver sus recetas médicas de uso crónico. Para imprimir una receta, toque directamente sobre el recuadro del medicamento que necesita." />
        <p className="text-center mt-2 text-lg font-bold uppercase text-white tracking-wide">
          Toque una receta o use el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );
};
