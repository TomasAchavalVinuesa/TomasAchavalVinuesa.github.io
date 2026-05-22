import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Pill, PhoneCall } from 'lucide-react';
import { Header } from '../components/Header';
import { MenuCard } from '../components/MenuCard';
import { AssistantVoice } from '../components/AssistantVoice';

export const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="BIENVENIDO - USUARIO 1, SELECCIONE UN TRÁMITE" />
      <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto w-full content-center">
        {/* Mismo patrón de color alineado con el Login: Amarillo -> Celeste -> Violeta */}
        <MenuCard color="bg-pami-yellow" label="TURNO MÉDICO" icon={<Stethoscope size={90}/>} onClick={() => navigate('/turnos')} />
        <MenuCard color="bg-pami-skyblue" label="RECETA MÉDICA" icon={<Pill size={90}/>} onClick={() => navigate('/recetas')} />
        <MenuCard color="bg-pami-violet" label="AYUDA PERSONAL" icon={<PhoneCall size={90}/>} onClick={() => navigate('/ayuda')} />
      </main>
      <footer className="p-8 flex flex-col items-center justify-center">
        <AssistantVoice text="Bienvenido usuario 1. Elija turno médico para ver doctores, receta médica para renovar remedios o ayuda personal para pedir una ambulancia." />
        <p className="text-center mt-6 text-2xl font-bold uppercase text-white tracking-wide">
          Toque una opción o use el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );
};
