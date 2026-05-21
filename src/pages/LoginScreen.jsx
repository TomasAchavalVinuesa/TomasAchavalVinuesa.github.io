import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, Camera, Fingerprint } from 'lucide-react';
import { Header } from '../components/Header';
import { BigButton } from '../components/BigButton';
import { AssistantVoice } from '../components/AssistantVoice';

export const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="INGRESE PARA COMENZAR" />
      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-10 items-center content-center max-w-[1600px] mx-auto w-full">
        {/* Aplicación del patrón de colores: Amarillo -> Celeste -> Violeta */}
        <BigButton color="bg-pami-yellow" icon={<Scan size={120} />} label="DNI" sub="Apoye el Frente de su DNI en el Lector" onClick={() => navigate('/scan/dni')} />
        <BigButton color="bg-pami-skyblue" icon={<Camera size={120} />} label="RECONOCIMIENTO FACIAL" sub="Mire a una de las dos Cámaras" onClick={() => navigate('/scan/face')} />
        <BigButton color="bg-pami-violet" icon={<Fingerprint size={120} />} label="HUELLA DACTILAR" sub="Apoye el dedo en el Scan de Huellas" onClick={() => navigate('/scan/huella')}/>
      </main>
      <footer className="p-8 flex flex-col items-center justify-center">
        <AssistantVoice text="Para ingresar, elija una opción. El botón amarillo es para usar su documento, el celeste para reconocimiento de rostro y el rosa para su huella." />
        <p className="text-center mt-6 text-2xl font-bold uppercase text-white tracking-wide">
          Seleccione una opción. Si necesita ayuda toque el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );
};
