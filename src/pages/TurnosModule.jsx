import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Eye, Stethoscope, Apple, Baby, 
  HeartPulse, BrainCircuit, UserCircle, CheckCircle2 
} from 'lucide-react';
import { Header } from '../components/Header';
import { AssistantVoice } from '../components/AssistantVoice';
import { Modal } from '../components/Modal';

export const TurnosModule = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('especialidades');
  const [selectedEsp, setSelectedEsp] = useState('');
  const [modal, setModal] = useState({ isOpen: false, message: '' });
  
  const especialidades = [
    { n: "DENTISTA", i: <Activity />, c: "bg-yellow-400" }, 
    { n: "OCULISTA", i: <Eye />, c: "bg-orange-500" },
    { n: "MÉDICO CLÍNICO", i: <Stethoscope />, c: "bg-blue-400" }, 
    { n: "NUTRICIONISTA", i: <Apple />, c: "bg-green-500" },
    { n: "PEDIATRA", i: <Baby />, c: "bg-pink-400" }, 
    { n: "GINECO-OBSTETRICIA", i: <HeartPulse />, c: "bg-purple-400" },
    { n: "KINESIÓLOGO", i: <Activity />, c: "bg-amber-600" }, 
    { n: "PSICÓLOGO", i: <BrainCircuit />, c: "bg-slate-200" }
  ];

  const doctores = [
    { n: "DR. GONZALEZ JUAN", m: "M.P. 44521" },
    { n: "DRA. RODRIGUEZ ANA", m: "M.P. 33120" },
    { n: "DR. PEREZ MATIAS", m: "M.P. 11290" }
  ];

  if (step === 'especialidades') return (
    <div className="min-h-screen flex flex-col">
      <Header title="MÓDULO DE TURNOS MÉDICOS - SELECCIONE ESPECIALIDAD" />
      <div className="flex-1 p-6 flex flex-col justify-center max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {especialidades.map(e => (
            <button 
              key={e.n} 
              onClick={() => {setSelectedEsp(e.n); setStep('doctores');}} 
              className={`${e.c} border-[6px] border-pami-blue rounded-[30px] p-2 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform shadow-xl h-[160px]`}
            >
              <div className="scale-[1.8] text-black mb-1 drop-shadow-sm">{e.i}</div>
              <span className="text-xl font-black uppercase text-center text-black leading-tight tracking-tight drop-shadow-sm">{e.n}</span>
            </button>
          ))}
        </div>
      </div>
      <footer className="p-4 flex flex-col items-center justify-center">
        <AssistantVoice text="Seleccione la especialidad médica que necesita tocando uno de los recuadros de colores." />
        <p className="text-center mt-2 text-lg font-bold uppercase text-white tracking-wide">
          Toque una especialidad o use el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );

  if (step === 'doctores') return (
    <div className="min-h-screen flex flex-col">
      <Header title={`PROFESIONALES DE ${selectedEsp} QUE ATIENDEN PAMI`} />
      <div className="flex-1 p-6 flex flex-col justify-center max-w-4xl mx-auto w-full space-y-4">
        {doctores.map(d => (
          <button key={d.n} onClick={() => setStep('calendario')} className="w-full bg-white border-[6px] border-pami-blue rounded-[30px] p-6 flex items-center gap-6 shadow-xl active:scale-95 transition-transform">
            <div className="bg-pami-light-blue text-white p-4 rounded-full"><UserCircle size={50} /></div>
            <div className="text-left">
              <p className="text-3xl font-black text-pami-blue mb-1">{d.n}</p>
              <p className="text-xl font-bold text-gray-500">{d.m} | ATIENDE PAMI</p>
            </div>
          </button>
        ))}
      </div>
      <footer className="p-4 flex flex-col items-center justify-center">
        <AssistantVoice text={`Aquí están los profesionales de ${selectedEsp}. Toque el recuadro blanco del doctor para pedir un turno.`} />
      </footer>
    </div>
  );

  if (step === 'calendario') return (
    <div className="min-h-screen flex flex-col">
      <Header title="SELECCIONE EL DÍA Y HORA DEL TURNO" />
      <div className="flex-1 p-6 flex items-center justify-center max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-8 rounded-[40px] border-[6px] border-pami-blue shadow-2xl flex flex-col justify-center text-center">
             <h3 className="text-2xl font-black uppercase mb-6 underline text-pami-blue leading-tight">Próximo Turno Disponible</h3>
             <button 
              onClick={() => {
                const mañana = new Date(); mañana.setDate(mañana.getDate() + 1);
                setModal({ 
                  isOpen: true, 
                  message: `TURNO AGENDADO PARA: ${mañana.toLocaleDateString()} a las 08:00 hs` 
                });
              }}
              className="w-full bg-pami-orange text-white py-6 px-6 rounded-[30px] text-2xl font-black uppercase shadow-xl active:scale-95 transition-transform border-4 border-white"
             >
               Pedir próximo turno disponible
             </button>
          </div>
          <div className="bg-white p-8 rounded-[40px] border-[6px] border-pami-blue shadow-2xl flex flex-col justify-center">
            <label className="text-xl font-black uppercase mb-3 italic text-pami-blue">O elija manualmente:</label>
            <input type="date" className="p-4 text-2xl border-4 border-pami-light-blue rounded-2xl mb-4 font-bold text-gray-700" min={new Date().toISOString().split('T')[0]} />
            <select className="p-4 text-2xl border-4 border-pami-light-blue rounded-2xl mb-6 font-bold text-gray-700">
              <option>08:00 hs</option><option>08:30 hs</option><option>09:00 hs</option><option>09:30 hs</option><option>20:00 hs</option>
            </select>
            <button 
              onClick={() => {
                setModal({ isOpen: true, message: "TURNO SOLICITADO CORRECTAMENTE" });
              }} 
              className="bg-pami-green text-white py-5 rounded-[30px] text-2xl font-black uppercase shadow-xl active:scale-95 transition-transform border-4 border-white"
            >
              Solicitar Turno
            </button>
          </div>
        </div>
      </div>
      
      <footer className="p-4 flex flex-col items-center justify-center">
        <AssistantVoice text="Puede pedir el próximo turno rápido tocando el botón naranja a la izquierda, o elegir la fecha manualmente y tocar el botón verde de solicitar turno." />
      </footer>

      <Modal 
        isOpen={modal.isOpen} 
        onClose={() => {
          setModal({ isOpen: false, message: '' });
          navigate('/');
        }} 
        title="Confirmación de Turno"
      >
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle2 size={120} className="text-pami-green mb-6 animate-pulse" />
          <h3 className="text-5xl font-black text-pami-blue uppercase leading-tight mb-4 tracking-tighter">
            {modal.message}
          </h3>
          <p className="text-2xl font-bold uppercase text-gray-500 italic">
            El turno se registró con éxito en su obra social.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-10 bg-pami-blue text-white py-6 px-12 rounded-full text-3xl font-black uppercase shadow-xl hover:bg-blue-900 active:scale-95 transition-all"
          >
            Aceptar y Finalizar
          </button>
        </div>
      </Modal>

    </div>
  );
};
