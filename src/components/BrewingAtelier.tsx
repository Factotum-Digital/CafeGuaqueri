/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Flame, Droplets, Scale, Volume2, VolumeX, Check } from 'lucide-react';
import { BrewTool } from '../types';
import { BREW_TOOLS } from '../data';

interface BrewingAtelierProps {
  onAddMessage?: (msg: string) => void;
}

export default function BrewingAtelier({ onAddMessage }: BrewingAtelierProps) {
  const [selectedTool, setSelectedTool] = useState<BrewTool | null>(null);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(20); // default 20g
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [stepDuration, setStepDuration] = useState<number>(0);
  const [totalBrewTime, setTotalBrewTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-calculate exact water weight based on extraction ratio
  const calculatedWater = selectedTool ? Math.round(coffeeGrams * selectedTool.ratio) : 0;

  // Sound generator
  const playChime = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 chime
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5 slide
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio Context error ignored', e);
    }
  };

  // Switch or trigger steps
  const selectTool = (tool: BrewTool) => {
    setSelectedTool(tool);
    setActiveStepIndex(0);
    setIsPlaying(false);
    setIsCompleted(false);
    if (tool.steps && tool.steps.length > 0) {
      setTimeLeft(tool.steps[0].duration);
      setStepDuration(tool.steps[0].duration);
    }
    setTotalBrewTime(0);
  };

  // Timer loop
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
        setTotalBrewTime(prev => prev + 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0 && selectedTool) {
      playChime();
      if (activeStepIndex < selectedTool.steps.length - 1) {
        const nextIdx = activeStepIndex + 1;
        setActiveStepIndex(nextIdx);
        setTimeLeft(selectedTool.steps[nextIdx].duration);
        setStepDuration(selectedTool.steps[nextIdx].duration);
      } else {
        setIsPlaying(false);
        setIsCompleted(true);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft, activeStepIndex, selectedTool]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsCompleted(false);
    setActiveStepIndex(0);
    setTotalBrewTime(0);
    if (selectedTool && selectedTool.steps.length > 0) {
      setTimeLeft(selectedTool.steps[0].duration);
      setStepDuration(selectedTool.steps[0].duration);
    }
  };

  const handleSkip = () => {
    if (!selectedTool) return;
    playChime();
    if (activeStepIndex < selectedTool.steps.length - 1) {
      const nextIdx = activeStepIndex + 1;
      setActiveStepIndex(nextIdx);
      setTimeLeft(selectedTool.steps[nextIdx].duration);
      setStepDuration(selectedTool.steps[nextIdx].duration);
    } else {
      setIsPlaying(false);
      setIsCompleted(true);
    }
  };

  // Dynamic progress ring logic
  const progressPercent = stepDuration > 0 ? (timeLeft / stepDuration) * 100 : 0;
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-brand-dark text-brand-cream py-20 border-b border-brand-outline/20 select-none" id="equipment">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-brand-gold font-bold block mb-2">
            PREPARACIÓN Y PRECISIÓN
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            HERRAMIENTAS EXPERTAS
          </h2>
          <p className="font-sans text-xs md:text-sm tracking-wide text-brand-cream/60 max-w-xl mx-auto leading-relaxed">
            Precision instruments for the ultimate Venezuelan extraction.
          </p>
        </div>

        {/* Dynamic Interactive Workbench */}
        {selectedTool ? (
          <div className="bg-white/5 border border-brand-outline/10 backdrop-blur-md p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 transition-slow animate-fade-in">
            
            {/* Workbench Left: Configurations & Specifications */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase text-brand-gold font-bold tracking-widest">
                  Active Guide
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {selectedTool.name}
                </h3>
                {selectedTool.subtitle && (
                  <p className="font-mono text-[10px] text-brand-gold mt-0.5">{selectedTool.subtitle}</p>
                )}
                <p className="font-sans text-xs text-brand-cream/75 mt-3 leading-relaxed">
                  {selectedTool.description}
                </p>
              </div>

              {/* Coffee Grams Input Slider */}
              <div className="space-y-3 p-4 bg-white/5 border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs uppercase text-brand-cream/60 tracking-wider">Dry Coffee</span>
                  <span className="font-mono text-sm font-bold text-brand-gold">{coffeeGrams} grams</span>
                </div>
                <input 
                  type="range" 
                  min={12} 
                  max={45} 
                  step={0.5}
                  value={coffeeGrams}
                  onChange={(e) => {
                    setCoffeeGrams(parseFloat(e.target.value));
                    handleReset();
                  }}
                  disabled={isPlaying}
                  className="w-full accent-brand-gold bg-brand-cream/10 cursor-pointer h-1 rounded-sm"
                />
                
                {/* Live Extraction Ratio Display */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono border-t border-white/5">
                  <div>
                    <span className="text-brand-cream/50 block">Target Ratio</span>
                    <span className="font-bold text-white">1:{selectedTool.ratio}</span>
                  </div>
                  <div>
                    <span className="text-brand-cream/50 block">Calculated Water</span>
                    <span className="font-bold text-brand-gold">{calculatedWater} mL (grams)</span>
                  </div>
                  {selectedTool.recommendedTemp !== 'N/A' && (
                    <div className="col-span-2 pt-1">
                      <span className="text-brand-cream/50">Temp Recomendada: </span>
                      <span className="font-bold text-white text-xs">{selectedTool.recommendedTemp}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Return to items */}
              <button
                onClick={() => setSelectedTool(null)}
                className="w-full border border-white/20 hover:border-brand-gold text-brand-cream hover:text-white py-3 font-sans text-[11px] uppercase tracking-widest font-bold transition-all cursor-pointer"
              >
                Volver al Atelier
              </button>
            </div>

            {/* Workbench Center: Beautiful Live Animated Ring Timer */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center border-y lg:border-y-0 lg:border-x border-white/10 py-6 lg:py-0">
              {isCompleted ? (
                <div className="text-center p-6 space-y-4">
                  <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto border border-brand-gold">
                    <Check className="h-10 w-10 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-white">Extracción Completa</h4>
                    <p className="text-xs text-brand-cream/60 mt-1 max-w-xs mx-auto">
                      Su taza de café está en equilibrio. Disfrute de los matices del Oriente Venezolano.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-brand-gold text-white font-sans text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-brand-dark transition-colors cursor-pointer"
                  >
                    Volver a iniciar
                  </button>
                </div>
              ) : (
                <div className="relative w-56 h-56 flex items-center justify-center">
                  {/* SVG Countdown Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="112" 
                      cy="112" 
                      r="90" 
                      className="stroke-white/10 stroke-2 fill-none" 
                    />
                    <circle 
                      cx="112" 
                      cy="112" 
                      r="90" 
                      className="stroke-brand-gold stroke-[4px] fill-none transition-all duration-1000" 
                      strokeDasharray="565"
                      strokeDashoffset={565 - (565 * (100 - progressPercent)) / 100}
                    />
                  </svg>
                  
                  {/* Center metrics */}
                  <div className="absolute text-center">
                    <span className="font-mono text-4xl font-bold text-white leading-none block">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold block mt-2 font-bold select-all">
                      Fase {activeStepIndex + 1} de {selectedTool.steps.length}
                    </span>
                    <span className="font-mono text-[10px] text-brand-cream/40 block mt-1">
                      Total: {formatTime(totalBrewTime)}
                    </span>
                  </div>
                </div>
              )}

              {/* Media Controls bar */}
              {!isCompleted && (
                <div className="flex items-center gap-4 mt-6">
                  {/* Audio trigger */}
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-colors text-brand-cream/60 cursor-pointer"
                    title={isMuted ? 'Desmutear avisos' : 'Mutear avisos'}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>

                  {/* Play Pause */}
                  <button 
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-brand-gold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
                  </button>

                  {/* Reset */}
                  <button 
                    onClick={handleReset}
                    className="p-2 border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-colors text-brand-cream/60 cursor-pointer"
                    title="Reiniciar paso"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>

                  {/* Skip */}
                  <button 
                    onClick={handleSkip}
                    className="p-2 border border-white/10 hover:border-brand-gold hover:text-brand-gold transition-colors text-brand-cream/60 cursor-pointer"
                    title="Siguiente fase"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Workbench Right: Instruction timeline */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase text-brand-cream/40 block mb-3 font-semibold">
                  Instrucciones del Vertido
                </span>
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
                  {selectedTool.steps.map((step, idx) => {
                    const isPassed = idx < activeStepIndex;
                    const isCurrent = idx === activeStepIndex;
                    return (
                      <div 
                        key={idx} 
                        className={`p-3 transition-colors border ${
                          isCurrent 
                            ? 'border-brand-gold bg-brand-gold/10' 
                            : isPassed 
                            ? 'border-white/5 bg-white/2 opacity-40' 
                            : 'border-white/5 opacity-25'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-sans text-xs font-bold text-white">
                            {idx + 1}. {step.title}
                          </span>
                          <span className="font-mono text-[10px] text-brand-gold font-bold">
                            {step.duration}s
                          </span>
                        </div>
                        {isCurrent && (
                          <p className="text-[11px] text-brand-cream leading-relaxed mt-1 font-sans">
                            {step.instruction}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Tip display */}
              <div className="pt-4 mt-4 border-t border-white/10 text-[10px] text-brand-gold flex items-start gap-2">
                <Flame className="h-3.5 w-3.5 shrink-0" />
                <p className="leading-normal">
                  Consejo: Vierta siempre en círculos desde el centro hacia afuera, evitando verter directamente sobre los filtros de papel.
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Main Static Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BREW_TOOLS.map((tool) => {
              return (
                <div 
                  key={tool.id}
                  onClick={() => selectTool(tool)}
                  className="group bg-transparent flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1"
                >
                  {/* High Quality Image wrapper */}
                  <div className="aspect-square w-full overflow-hidden bg-white/5 border border-white/10 relative">
                    {tool.image ? (
                      <img 
                        src={tool.image} 
                        alt={tool.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-gold">
                        <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                          coffee_maker
                        </span>
                      </div>
                    )}
                    
                    {/* Hover Masterclass overlay banner */}
                    <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-brand-gold text-white font-sans text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2 shadow-lg">
                        Iniciar Masterclass
                      </span>
                    </div>
                  </div>

                  {/* Info details exactly matching screenshot layout */}
                  <div className="mt-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start w-full">
                      <h4 className="font-sans text-xs uppercase font-bold tracking-widest text-white group-hover:text-brand-gold transition-colors">
                        {tool.name}
                      </h4>
                      <p className="font-mono text-xs text-brand-cream/80">${tool.price.toFixed(0)}</p>
                    </div>
                    {tool.subtitle && (
                      <p className="font-sans text-[10px] text-brand-cream/50 mt-1.5 text-left">
                        {tool.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
