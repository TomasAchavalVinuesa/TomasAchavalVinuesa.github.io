import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Printer } from 'lucide-react';
import { Header } from '../components/Header';

export const ImpresionSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  useEffect(() => { 
    const t = setTimeout(() => navigate('/'), 6000); 
    return () => clearTimeout(t); 
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="MÓDULO DE RECETAS - RETIRE SU TICKET IMPRESO" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        <div className="bg-white border-[8px] border-pami-blue rounded-[40px] p-10 shadow-2xl w-full flex flex-col items-center">
          
          <CheckCircle2 size={100} className="text-pami-green mb-4 animate-pulse" />
          
          <h2 className="text-4xl font-black uppercase text-pami-blue mb-2">
            RECETA DE {state?.med || "MEDICAMENTO"}
          </h2>
          <h2 className="text-2xl font-black uppercase text-pami-light-blue mb-8 tracking-tighter">
            ORDEN #2201 VALIDADA
          </h2>
          
          <div className="bg-slate-100 p-8 border-[6px] border-dashed border-slate-300 rounded-[30px] w-full max-w-xl mx-auto">
            <Printer size={70} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-4xl font-black uppercase mb-3 tracking-tighter text-gray-800">
              {state?.re ? "REIMPRESIÓN EXITOSA" : "IMPRESIÓN EXITOSA"}
            </h3>
            <p className="text-xl font-bold uppercase text-gray-500 italic">
              Por favor, retire el ticket de la receta de la ranura de impresión inferior
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
