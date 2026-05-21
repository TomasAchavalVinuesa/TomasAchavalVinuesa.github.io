import React from 'react';
import { Bot } from 'lucide-react';

export const AssistantVoice = ({ text, compact }) => {
  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-AR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={speak} 
      // Se mantiene firmemente el color bg-pami-green exclusivo para IA
      className={`bg-pami-green text-white py-4 px-6 rounded-[30px] flex flex-row items-center justify-center shadow-xl border-4 border-white active:scale-95 transition-transform ${compact ? 'w-full h-full gap-3' : 'w-fit mx-auto gap-6'}`}
    >
      <Bot size={compact ? 48 : 100} className="flex-shrink-0" />
      
      <div className="flex flex-col items-center text-center">
        <span className={`${compact ? 'text-2xl' : 'text-4xl'} font-black uppercase tracking-tight leading-none mb-1`}>Botón de</span>
        <span className={`${compact ? 'text-2xl' : 'text-4xl'} font-black uppercase tracking-tight leading-none`}>Asistencia con IA</span>
      </div>
    </button>
  );
};
