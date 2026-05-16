import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Scan, Camera, Fingerprint, Stethoscope, Pill, 
  UserCircle, PhoneCall, BrainCircuit, ChevronLeft, 
  CheckCircle2, AlertCircle, Printer, Eye, Apple, 
  Baby, Syringe, Activity, ScanFace, HeartPulse, X, Bot
} from 'lucide-react';

// --- COMPONENTES GLOBALES ---

const AssistantVoice = ({ text, compact }) => {
  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-AR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={speak} 
      // Cambiamos flex-col por flex-row y ajustamos los paddings
      className={`bg-pami-green text-white py-4 px-6 rounded-[30px] flex flex-row items-center justify-center shadow-xl border-4 border-white active:scale-95 transition-transform ${compact ? 'w-full h-full gap-3' : 'w-fit mx-auto gap-6'}`}
    >
      {/* Ícono a la izquierda */}
      <Bot size={compact ? 48 : 100} className="flex-shrink-0" />
      
      <div className="flex flex-col items-center text-center">
        <span className={`${compact ? 'text-2xl' : 'text-4xl'} font-black uppercase tracking-tight leading-none mb-1`}>Botón de</span>
        <span className={`${compact ? 'text-2xl' : 'text-4xl'} font-black uppercase tracking-tight leading-none`}>Asistencia con IA</span>
      </div>
    </button>
  );
};

const Header = ({ title }) => (
  <div className="bg-pami-light-blue text-white p-6 text-center shadow-lg border-b-[4px] border-black/30">
    <h1 className="text-xl font-bold tracking-tight uppercase italic opacity-90">
      SISTEMA DE SALUD EXCLUSIVO PARA PERSONAS MAYORES O CON DISCAPACIDAD
    </h1>
    {title && <p className="text-5xl font-black mt-4 text-white drop-shadow-md uppercase tracking-tight">{title}</p>}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
      {/* Contenedor del Modal con estética PAMI (bordes gruesos, esquinas redondeadas) */}
      <div className="bg-white rounded-[50px] w-full max-w-4xl overflow-hidden border-[12px] border-pami-blue shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Cabecera del Modal */}
        <div className="bg-pami-blue p-8 flex justify-between items-center text-white">
          <h2 className="text-4xl font-black uppercase tracking-tighter">{title}</h2>
          <button 
            onClick={onClose} 
            className="bg-red-600 text-white rounded-full p-4 border-4 border-white hover:bg-red-700 active:scale-90 transition-transform"
          >
            <X size={50} />
          </button>
        </div>
        
        {/* Contenido del Modal (Scrolleable si es muy largo) */}
        <div className="p-10 overflow-y-auto">
          {children}
        </div>
        
      </div>
    </div>
  );
};

// --- PANTALLAS ---

// 1. LOGIN
const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="INGRESE PARA COMENZAR" />
      {/* Cambiamos items-center por items-stretch y usamos max-w-[1600px] para ensanchar */}
      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-10 items-center content-center max-w-[1600px] mx-auto w-full">
  <BigButton color="bg-pami-yellow" icon={<Scan size={120} />} label="DNI" sub="Apoye el Frente de su DNI en el Lector" onClick={() => navigate('/scan/dni')} />
  <BigButton color="bg-pami-orange" icon={<Camera size={120} />} label="RECONOCIMIENTO FACIAL" sub="Mire a una de las dos Cámaras" onClick={() => navigate('/scan/face')} />
  <BigButton color="bg-pami-green" icon={<Fingerprint size={120} />} label="HUELLA DACTILAR" sub="Apoye el dedo en el Scan de Huellas" onClick={() => navigate('/scan/huella')} />
</main>
      <footer className="p-8 flex flex-col items-center justify-center">
        <AssistantVoice text="Para ingresar, elija una opción. El botón amarillo es para usar su documento, el naranja para reconocimiento de rostro y el verde para su huella." />
        <p className="text-center mt-6 text-2xl font-bold uppercase text-white tracking-wide">
          Seleccione una opción. Si necesita ayuda toque el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );
};
const BigButton = ({ color, icon, label, sub, onClick }) => (
  <button 
    onClick={onClick} className={`${color} w-full h-[380px] px-6 rounded-[60px] shadow-2xl flex flex-col items-center justify-center text-center gap-6 border-8 border-white active:brightness-90`}>
    <div className="text-black">{icon}</div>
    <h2 className="text-4xl font-black text-black leading-tight uppercase">
      {label}
    </h2>
    <p className="text-xl font-extrabold text-black uppercase italic">
      {sub}
    </p>
  </button>
);

// 2. ESCANEOS
const ScanSimulation = ({ type }) => {
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
    // Solo activar la cámara si NO es la opción de huella
    if (type !== 'huella') {
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
      <div className={`relative flex items-center justify-center bg-slate-900 overflow-hidden ${
        type === 'face' ? 'w-160 h-160 rounded-full border-8 border-pami-orange' 
        : type === 'dni' ? 'w-full max-w-2xl h-96 border-4 border-pami-yellow rounded-3xl'
        : 'w-80 h-80 bg-transparent' // La huella no necesita caja de fondo
      }`}>
        
        {/* Capa 1: Video de la cámara (Solo DNI y Face) */}
        {type !== 'huella' && (
          <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}

        {/* Capa 2: Overlays visuales dependiendo del tipo */}
        {type === 'dni' && (
          <div className="absolute inset-0 m-10 border-4 border-dashed border-pami-yellow flex items-center justify-center z-10">
             <span className="text-pami-yellow text-3xl font-bold italic">POSICIONE EL DNI AQUÍ</span>
          </div>
        )}

        {type === 'face' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60 z-10">
             <ScanFace size={450} strokeWidth={0.5} />
          </div>
        )}

        {type === 'huella' && (
          <Fingerprint size={250} className="text-pami-green animate-pulse drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
        )}

        {/* Capa 3: Animación de escaneo láser (Solo DNI y Face) */}
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

// 3. MENÚ PRINCIPAL
const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="BIENVENIDO - RIMINI MARIA EUGENIA, SELECCIONE UN TRÁMITE" />
      <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto w-full">
        <MenuCard color="bg-pami-yellow" label="TURNO MÉDICO" icon={<Stethoscope size={90}/>} onClick={() => navigate('/turnos')} />
        <MenuCard color="bg-pami-orange" label="RECETA MÉDICA" icon={<Pill size={90}/>} onClick={() => navigate('/recetas')} />
        <MenuCard color="bg-pami-green" label="AYUDA PERSONAL" icon={<PhoneCall size={90}/>} onClick={() => navigate('/ayuda')} />
      </main>
      <footer className="p-8 flex flex-col items-center justify-center">
        <AssistantVoice text="Bienvenida María Eugenia. Elija turno médico para ver doctores, receta médica para renovar remedios o ayuda personal para pedir una ambulancia." />
        <p className="text-center mt-6 text-2xl font-bold uppercase text-white tracking-wide">
          Toque una opción o use el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );
};

const MenuCard = ({ color, label, icon, onClick, dark }) => (
  <button onClick={onClick} className={`${color} ${dark ? 'text-white' : 'text-pami-blue'} p-12 rounded-[50px] shadow-2xl border-4 border-white flex flex-col items-center gap-6 hover:scale-105`}>
    {icon}
    <span className="text-4xl font-black italic">{label}</span>
  </button>
);

// 4. MÓDULO TURNOS
const TurnosModule = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('especialidades');
  const [selectedEsp, setSelectedEsp] = useState('');
  
  // Nuevo estado para controlar el modal de confirmación
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
                // Cambiamos el alert() por abrir nuestro Modal
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
                // Cambiamos el alert() por abrir nuestro Modal
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

      {/* AQUÍ ESTÁ EL DIÁLOGO MODAL DE CONFIRMACIÓN */}
      <Modal 
        isOpen={modal.isOpen} 
        onClose={() => {
          setModal({ isOpen: false, message: '' });
          navigate('/'); // Vuelve al inicio al cerrar
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

// 5. MÓDULO RECETAS
// 5. MÓDULO RECETAS
const RecetasModule = () => {
  const navigate = useNavigate();
  const recetas = [
    { med: "ENALAPRIL 10mg", n: "#4452", status: "RECETA DISPONIBLE", color: "bg-pami-green", disp: true },
    { med: "METFORMINA 500mg", n: "#8821", status: "RECETA EN 5 DÍAS", color: "bg-pami-orange", disp: false },
    { med: "OMEPRAZOL 20mg", n: "#2201", status: "RECETA DISPONIBLE", color: "bg-pami-green", disp: true }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="MÓDULO DE RECETAS - SELECCIONE LA RECETA QUE DESEA RENOVAR" />
      
      {/* Ajustamos el contenedor para usar space-y-4 y max-w-4xl igual que en los doctores */}
      <div className="flex-1 p-6 flex flex-col justify-center max-w-4xl mx-auto w-full space-y-4">
        {recetas.map(r => (
          <div 
            key={r.n} 
            onClick={() => navigate('/impresion', { state: { med: r.med, re: !r.disp } })} 
            // Redujimos el borde a [6px] y el padding a p-4 para emparejar el tamaño vertical
            className="bg-white border-[6px] border-pami-blue rounded-[30px] p-4 flex items-center gap-6 shadow-xl cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
          >
            {/* Redujimos la caja de estado a p-4, ancho w-40 y texto text-lg */}
            <div className={`${r.color} p-4 rounded-xl text-white font-black text-lg text-center w-40 leading-tight flex-shrink-0`}>
              {r.status}<br/>
            </div>
            
            <div className="flex-1">
              {/* Redujimos el nombre del medicamento a text-3xl */}
              <h3 className="text-3xl font-black text-pami-blue uppercase leading-tight">{r.med}</h3>
              {/* Redujimos el subtítulo a text-xl */}
              <p className="text-xl font-bold text-gray-400">Orden {r.n} | Frecuencia: Cada 30 días</p>
            </div>
            
            {/* Botón de impresión más pequeño y estilizado */}
            <button className="bg-pami-light-blue text-white py-4 px-6 rounded-2xl font-black text-xl uppercase border-2 border-white shadow-md">
              {r.disp ? "Imprimir" : "Reimprimir"}
            </button>
          </div>
        ))}
      </div>

      {/* AGREGAMOS EL FOOTER CON LA ASISTENCIA CON IA */}
      <footer className="p-4 flex flex-col items-center justify-center">
        <AssistantVoice text="Aquí puede ver sus recetas médicas de uso crónico. Para imprimir una receta, toque directamente sobre el recuadro del medicamento que necesita." />
        <p className="text-center mt-2 text-lg font-bold uppercase text-white tracking-wide">
          Toque una receta o use el <span className="text-pami-green">botón verde</span> para asistencia con IA
        </p>
      </footer>
    </div>
  );
};

// 6. AYUDA Y EMERGENCIA
const AyudaModule = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('menu');
  const [modalOpen, setModalOpen] = useState(false);
  
  // 1. Añadimos nauseas y mareos al estado
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
        {/* Forzamos text-black para evitar heredar el blanco del fondo rojo */}
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

          {/* Grilla de 2 columnas para dividir el espacio 50/50 y altura fija (h-28) */}
          <div className="grid grid-cols-2 gap-6 mt-10 h-28">
            
            <button 
              onClick={() => {
                navigate('/');
              }} 
              // Se cambió a azul (bg-pami-blue) para diferenciarlo del botón verde de IA
              className="w-full h-full bg-pami-blue text-white p-4 rounded-[30px] text-3xl font-black uppercase shadow-xl active:scale-95 transition-transform border-4 border-white flex items-center justify-center"
            >
              Enviar Reporte
            </button>
            
            {/* Llamamos al asistente activando la opción compact=true */}
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

// 3. Textos e íconos más chicos para el síntoma principal
const SintomaCheck = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-4 cursor-pointer select-none">
    <div className={`w-12 h-12 border-4 border-pami-blue rounded-xl flex items-center justify-center flex-shrink-0 ${checked ? 'bg-pami-blue text-white' : 'bg-white'}`}>
      {checked && <X size={32} strokeWidth={3} />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    <span className="text-3xl font-black uppercase text-pami-blue tracking-tighter">{label}</span>
  </label>
);

// 4. Color forzado explícitamente y tamaño más compacto para las sub-zonas
const ZonaCheck = ({ label }) => (
  <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border-2 border-slate-300 shadow-sm">
    <input type="checkbox" className="w-6 h-6 accent-pami-blue" />
    {/* Forzamos text-gray-800 para solucionar el problema del texto blanco */}
    <span className="text-lg font-bold uppercase text-gray-800">{label}</span>
  </label>
);

// 7. IMPRESIÓN ÉXITO
const ImpresionSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  useEffect(() => { 
    // Vuelve al inicio después de 6 segundos
    const t = setTimeout(() => navigate('/'), 6000); 
    return () => clearTimeout(t); 
  }, [navigate]);

  return (
    // Quitamos el bg-white de aquí para que mantenga el fondo oscuro global
    <div className="min-h-screen flex flex-col">
      <Header title="MÓDULO DE RECETAS - RETIRE SU TICKET IMPRESO" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        
        {/* Tarjeta blanca central más compacta */}
        <div className="bg-white border-[8px] border-pami-blue rounded-[40px] p-10 shadow-2xl w-full flex flex-col items-center">
          
          <CheckCircle2 size={100} className="text-pami-green mb-4 animate-pulse" />
          
          {/* Redujimos tamaños de texto (de 7xl a 4xl, etc.) */}
          <h2 className="text-4xl font-black uppercase text-pami-blue mb-2">
            RECETA DE {state?.med || "MEDICAMENTO"}
          </h2>
          <h2 className="text-2xl font-black uppercase text-pami-light-blue mb-8 tracking-tighter">
            ORDEN #2201 VALIDADA
          </h2>
          
          {/* Contenedor del ticket más pequeño */}
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
// --- ROUTER ---
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/scan/dni" element={<ScanSimulation type="dni" />} />
        <Route path="/scan/face" element={<ScanSimulation type="face" />} />
        <Route path="/scan/huella" element={<ScanSimulation type="huella" />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/turnos" element={<TurnosModule />} />
        <Route path="/recetas" element={<RecetasModule />} />
        <Route path="/impresion" element={<ImpresionSuccess />} />
        <Route path="/ayuda" element={<AyudaModule />} />
      </Routes>
    </HashRouter>
  );
}

export default App;