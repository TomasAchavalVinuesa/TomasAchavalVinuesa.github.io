import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCall, AlertCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';
import { AssistantVoice } from '../components/AssistantVoice';
import { SintomaCheck } from '../components/SintomaCheck';
import { ZonaCheck } from '../components/ZonaCheck';

export const AyudaModule = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('menu');
  const [modalOpen, setModalOpen] = useState(false);
  const [sintomas, setSintomas] = useState({ dolor: false, entu: false, nauseas: false, mareos: false });

  if (step === 'menu') return (
    <div className="min-h-screen flex flex-col">
      <Header title="AYUDA AHORA - SELECCIONE UNA OPCIÓN" />
      <div className="flex-1 flex items-center justify-center p-8">
        <button onClick={() => setStep('ambulancia')} className="bg-red-600 text-white p-20 rounded-[80px] border-[12px] border-white shadow-2xl flex flex-col items-center gap-10 active:scale-95 transition-transform">
          <PhoneCall size={150} />
          <span className="text-7xl font-black uppercase italic tracking-tighter">Llamar Ambulancia</span>
          <span className="text-3xl font-bold opacity-80 uppercase">Conexión inmediata con el 107</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-red-700 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-white text-center p-10">
        <div className="bg-white p-12 rounded-full mb-10 animate-pulse">
          <PhoneCall size={120} className="text-red-700" />
        </div>
        <h2 className="text-8xl font-black uppercase italic mb-6">Ambulancia en camino</h2>
        <p className="text-4xl font-bold bg-white text-red-700 px-12 py-6 rounded-full mb-12 shadow-2xl uppercase">
          No se mueva, la ayuda está en camino
        </p>
        
        <button 
          onClick={() => setModalOpen(true)} 
          className="bg-pami-blue text-white p-10 rounded-[40px] border-8 border-white flex items-center gap-6 shadow-2xl active:scale-95 transition-transform"
        >
           <AlertCircle size={80} />
           <span className="text-5xl font-black uppercase tracking-tighter">Asistente de Síntomas</span>
        </button>
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={() => { 
          setModalOpen(false); 
          setTimeout(() => navigate('/'), 2000); 
        }} 
        title="Reporte de Síntomas"
      >
        <div className="space-y-6 text-black text-left">
          <p className="text-xl font-bold uppercase text-gray-500 italic mb-4">
            Marque lo que siente actualmente:
          </p>
          
          <SintomaCheck 
            label="Dolor" 
            checked={sintomas.dolor} 
            onChange={() => setSintomas({...sintomas, dolor: !sintomas.dolor})} 
          />
          {sintomas.dolor && (
            <div className="ml-12 grid grid-cols-2 gap-4 p-4 bg-slate-100 rounded-2xl border-4 border-slate-200">
              <ZonaCheck label="Cabeza" />
              <ZonaCheck label="Pecho" />
              <ZonaCheck label="Abdomen" />
              <ZonaCheck label="Espalda" />
            </div>
          )}
          
          <SintomaCheck 
            label="Entumecimiento" 
            checked={sintomas.entu} 
            onChange={() => setSintomas({...sintomas, entu: !sintomas.entu})} 
          />
          {sintomas.entu && (
            <div className="ml-12 grid grid-cols-2 gap-4 p-4 bg-slate-100 rounded-2xl border-4 border-slate-200">
              <ZonaCheck label="Brazos" />
              <ZonaCheck label="Piernas" />
              <ZonaCheck label="Cara" />
              <ZonaCheck label="Manos" />
            </div>
          )}

          <div className="flex flex-col gap-4 mt-6">
            <SintomaCheck 
              label="Náuseas" 
              checked={sintomas.nauseas} 
              onChange={() => setSintomas({...sintomas, nauseas: !sintomas.nauseas})} 
            />
            <SintomaCheck 
              label="Mareos" 
              checked={sintomas.mareos} 
              onChange={() => setSintomas({...sintomas, mareos: !sintomas.mareos})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-10 h-28">
            <button 
              onClick={() => {
                navigate('/');
              }} 
              className="w-full h-full bg-pami-blue text-white p-4 rounded-[30px] text-3xl font-black uppercase shadow-xl active:scale-95 transition-transform border-4 border-white flex items-center justify-center"
            >
              Enviar Reporte
            </button>
            
            <AssistantVoice 
              text="Marque las casillas de los síntomas que siente y luego toque el botón azul de enviar reporte." 
              compact={true} 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
