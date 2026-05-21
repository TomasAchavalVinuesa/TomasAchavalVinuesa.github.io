import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, Fingerprint } from 'lucide-react';

export const ScanSimulation = ({ type }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const videoRef = useRef(null);

  const messages = [
    "...",
    `Iniciando lectura de ${type}...`,
    "Escaneando datos físicos...",
    "Buscando perfil en la base de datos...",
    "Validando identidad...",
    "Cargando datos del usuario..."
  ];

  useEffect(() => {
    // Solo usar la cámara para reconocimiento facial en esta demo
    if (type === 'face') {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => console.log("Sin acceso a la cámara"));
    }

    const interval = setInterval(() => {
      setStep(s => {
        if (s < messages.length - 1) return s + 1;
        clearInterval(interval);
        setTimeout(() => navigate('/menu'), 1000);
        return s;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [type, navigate]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-10 text-white">
      {type === 'dni' && (
        <p className="text-3xl font-extrabold mt-4 mb-8 text-center text-pami-yellow uppercase tracking-wide">
          Acerque el DNI al lector de NFC
        </p>
      )}
      <div className={`relative flex items-center justify-center bg-slate-900 overflow-hidden ${
        type === 'face' ? 'w-160 h-160 rounded-full border-8 border-pami-skyblue' 
        : type === 'dni' ? 'w-full max-w-2xl h-96 border-4 border-pami-yellow rounded-3xl'
        : 'w-80 h-80 bg-transparent'
      }`}>
        
        {type === 'face' && (
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}

        {type === 'dni' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <svg width="260" height="180" viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pami-yellow drop-shadow-[0_0_15px_rgba(218,165,32,0.4)]">
              <rect x="4" y="8" width="252" height="164" rx="12" stroke="#FBBF24" strokeWidth="8" fill="rgba(0,0,0,0.12)" />
              <rect x="28" y="36" width="80" height="56" rx="6" fill="#FBBF24" />
              <rect x="120" y="40" width="92" height="18" rx="4" fill="#FBBF24" />
              <rect x="120" y="66" width="92" height="12" rx="4" fill="#FBBF24" />
              <circle cx="68" cy="64" r="8" fill="#0f172a" />
            </svg>
          </div>
        )}

        {type === 'face' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60 z-10">
             <ScanFace size={450} strokeWidth={0.5} className="text-pami-skyblue" />
          </div>
        )}

        {type === 'huella' && (
          <Fingerprint size={250} className="text-pami-violet animate-pulse drop-shadow-[0_0_15px_rgba(74,0,114,0.5)]" />
        )}

        {type !== 'huella' && (
          <div className="absolute top-0 left-0 w-full h-2 bg-pami-light-blue scan-line shadow-[0_0_20px_#3b82f6] z-20" />
        )}
      </div>
      
      <p className="text-4xl font-black mt-12 text-pami-yellow uppercase tracking-widest text-center">
        {messages[step]}
      </p>
    </div>
  );
};
