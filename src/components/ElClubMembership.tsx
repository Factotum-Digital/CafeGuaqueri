/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  QrCode, 
  Search, 
  Network, 
  Crown, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Users, 
  Coffee, 
  Calendar, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { SovereignMember, VerifiableBlock } from '../types';
import { VERIFIABLE_BLOCKS, COFFEE_PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ElClubMembershipProps {
  customReceipts: VerifiableBlock[];
  onOpenCart?: () => void;
  onAddMessage?: (msg: string) => void;
}

// Subscription-specific coffee meta matching our exact COFFEE_PRODUCTS details
const CLUB_COFFEE_SUBSCRIBABLE = [
  {
    id: 'cumanacoa-washed',
    name: 'Cumanacoa Washed',
    origin: 'Sucre, Venezuela',
    notes: 'Cítrico, jazmín, final mielado',
    monthly: 28,
    annual: 268,
    badge: 'Single Origin'
  },
  {
    id: 'caripe-natural',
    name: 'Caripe Natural',
    origin: 'Monagas, Venezuela',
    notes: 'Frutas rojas, melaza, chocolate',
    monthly: 32,
    annual: 307,
    badge: 'Single Origin'
  },
  {
    id: 'sovereign-roast',
    name: 'Sovereign Roast',
    origin: 'Signature Blend',
    notes: 'Caramelo dorado, macadamia, cacao',
    monthly: 24,
    annual: 230,
    badge: 'Artisanal Blend'
  },
  {
    id: 'el-morro-honey',
    name: 'El Morro Honey',
    origin: 'Coastal Range',
    notes: 'Durazno, miel silvestre, té dulce',
    monthly: 38,
    annual: 365,
    badge: 'Ultra-Limited'
  }
];

export default function ElClubMembership({ customReceipts, onOpenCart, onAddMessage }: ElClubMembershipProps) {
  // Subscription state
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<string>('cumanacoa-washed');
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // Join El Club credentials state
  const [useCustomName, setUseCustomName] = useState<string>('');
  const [userState, setUserState] = useState<'Sucre' | 'Monagas' | 'Caracas' | 'Lechería' | 'Nueva Esparta' | 'Miranda'>('Caracas');
  
  const [activeMember, setActiveMember] = useState<SovereignMember | null>({
    name: 'SOVEREIGN USER',
    state: 'Caracas',
    memberId: 'GQR-0812',
    mintedAt: '2026-05-26',
    blockNumber: '921,402',
    hash: '0x8f3c7ea1a600bc56b0d9990f11ac88eedaa9f001b6c77bb8bfb51aaa041ffff',
    tier: 'Ultra-Prime',
    signature: 'ECDSA verified consensus'
  });
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);

  // Blockchain query state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [queriedBlock, setQueriedBlock] = useState<VerifiableBlock | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);

  // Sound generator for credential minting
  const playMintSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(330, audioCtx.currentTime); // E4
      osc.frequency.setValueAtTime(440, audioCtx.currentTime + 0.12); // A4
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.24); // E5
      
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.61);
    } catch (e) {
      console.log('Audio Context error ignored', e);
    }
  };

  // Combine default with custom block receipts
  const allBlocks = [...customReceipts, ...VERIFIABLE_BLOCKS];

  // Selected subscription coffee info
  const selectedCoffee = CLUB_COFFEE_SUBSCRIBABLE.find(c => c.id === selectedCoffeeId) || CLUB_COFFEE_SUBSCRIBABLE[0];
  const activePriceValue = isAnnual ? selectedCoffee.annual : selectedCoffee.monthly;
  const originalFullCost = selectedCoffee.monthly * 12;
  const annualSavingsValue = originalFullCost - selectedCoffee.annual;

  // Handle member pass minting
  const handleMintPass = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = useCustomName.trim() || 'SOVEREIGN USER';

    setIsMinting(true);
    setMintSuccess(false);

    setTimeout(() => {
      const generatedId = Math.floor(1000 + Math.random() * 9000);
      const statePrefix = userState.substring(0, 3).toUpperCase();
      const randomBlock = Math.floor(921000 + Math.random() * 5000);
      const randomHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      setActiveMember({
        name: finalName.toUpperCase(),
        state: userState,
        memberId: `${statePrefix}-${generatedId}`,
        mintedAt: new Date().toISOString().split('T')[0],
        blockNumber: randomBlock.toLocaleString(),
        hash: randomHash,
        tier: isAnnual ? 'Legendary' : 'Ultra-Prime',
        signature: 'Secp256k1 verified consensus'
      });
      setIsMinting(false);
      setMintSuccess(true);
      playMintSound();
      
      if (onAddMessage) {
        onAddMessage(`¡Felicidades! Te has suscrito a ${selectedCoffee.name} (${isAnnual ? 'Plan Anual' : 'Plan Mensual'}) y has ingresado automáticamente a El Club Guaiquerí.`);
      }
    }, 1500);
  };

  // Handle blockchain block search
  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryError(null);
    setQueriedBlock(null);

    if (!searchQuery.trim()) {
      setQueryError('Escriba un ID de Lote o Ref de Transacción para realizar la traza.');
      return;
    }

    const cleanQuery = searchQuery.trim().toUpperCase();
    
    // Find matching block
    const match = allBlocks.find(
      block => 
        block.blockNumber.toUpperCase() === cleanQuery || 
        block.lotId.toUpperCase() === cleanQuery ||
        block.hash.toUpperCase().includes(cleanQuery)
    );

    if (match) {
      setQueriedBlock(match);
    } else {
      setQueryError(`No se encontró registro del código "${cleanQuery}" en el bloque actual. Asegure haberlo copiado bien.`);
    }
  };

  return (
    <section className="bg-brand-cream py-20 border-b border-brand-outline select-none relative" id="club">
      {/* Dynamic background accents referencing Kyoto minimalist blueprint look */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] subtle-grid-bg select-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* UPPER TITLE SECTION */}
        <div className="text-center md:text-left mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold block mb-2">
            CON EL RESPALDO DEL ORIGEN
          </span>
          <h2 className="font-serif text-5xl font-bold text-brand-dark leading-tight">
            Suscripciones <span className="italic italic text-brand-gold font-light">El Club</span>
          </h2>
          <p className="font-sans text-sm text-brand-dark/70 max-w-2xl mt-3 leading-relaxed">
            Cada café tiene su propia suscripción. Al suscribirte a cualquier lote del oriente venezolano, adquieres automáticamente membresía activa en **El Club Guaiquerí**, liberando acceso prioritario, precios de distribuidor y autenticación on-chain.
          </p>
        </div>

        {/* STEPPER METRIC BAR */}
        <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-12 py-3 border-y border-brand-dark/10">
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-dark text-brand-cream font-mono text-[9px] font-bold flex items-center justify-center">1</span>
            <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-brand-dark">Elige tu Café</span>
          </div>
          <ChevronRight className="h-3 w-3 text-brand-dark/30 hidden md:block" />
          
          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-dark text-brand-cream font-mono text-[9px] font-bold flex items-center justify-center">2</span>
            <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-brand-dark">Elige el Plan</span>
          </div>
          <ChevronRight className="h-3 w-3 text-brand-dark/30 hidden md:block" />

          <div className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-cream font-mono text-[9px] font-bold flex items-center justify-center">3</span>
            <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-brand-gold font-bold">Membresía Incluida</span>
          </div>
        </div>

        {/* SUBSCRIPTION CONFIGURATOR WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* LEFT COLUMN: STEPS 1 & 2 */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* STEP 1: SELECT COFFEE UNIT */}
            <div>
              <div className="flex justify-between items-end mb-4 border-b border-brand-dark/5 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                  PASO 01 — SELECCIÓN DE COSECHA
                </span>
                <span className="text-[10px] text-brand-dark/50 italic font-serif">Grano Entero (250g)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CLUB_COFFEE_SUBSCRIBABLE.map((coffee) => {
                  const isSelected = selectedCoffeeId === coffee.id;
                  return (
                    <div
                      key={coffee.id}
                      onClick={() => {
                        setSelectedCoffeeId(coffee.id);
                        setMintSuccess(false);
                      }}
                      className={`p-5 border cursor-pointer transition-all duration-300 relative group flex flex-col justify-between ${
                        isSelected 
                          ? 'border-brand-gold bg-[#FAF8F3] shadow-md' 
                          : 'border-brand-dark/10 hover:border-brand-dark/30 bg-transparent'
                      }`}
                    >
                      {/* Selection dot */}
                      <div className="absolute top-4 right-4 flex items-center justify-center">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-brand-gold bg-brand-gold' : 'border-brand-dark/20'
                        }`}>
                          {isSelected && <Check className="h-2 w-2 text-white stroke-[3px]" />}
                        </div>
                      </div>

                      <div>
                        {/* Badge */}
                        <span className={`text-[9px] uppercase font-mono tracking-widest px-1.5 py-0.5 inline-block mb-3 border ${
                          isSelected ? 'border-brand-gold/30 text-brand-gold bg-brand-gold/5' : 'border-brand-dark/10 text-brand-dark/40'
                        }`}>
                          {coffee.badge}
                        </span>

                        <h3 className="font-serif text-lg font-bold text-brand-dark">
                          {coffee.name}
                        </h3>
                        <p className="font-mono text-[9px] text-brand-gold uppercase tracking-wider mt-0.5">
                          {coffee.origin}
                        </p>
                        <p className="font-sans text-xs text-brand-dark/60 italic mt-2 leading-relaxed">
                          "{coffee.notes}"
                        </p>
                      </div>

                      {/* Display small equivalent price */}
                      <div className="mt-5 pt-3 border-t border-brand-dark/5 flex justify-between items-baseline">
                        <span className="text-[10px] text-brand-dark/40 font-mono">Cuota de Lote</span>
                        <span className="font-serif text-base font-bold text-brand-dark">
                          ${coffee.monthly} <span className="font-sans text-[10px] font-normal text-brand-dark/50">/ mes</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: PLAN SELECTOR (FREQUENCY & RECURRENCE) */}
            <div>
              <div className="flex justify-between items-end mb-4 border-b border-brand-dark/5 pb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                  PASO 02 — CADENCIA O FRECUENCIA
                </span>
                <span className="text-[10px] text-[#A57C5A] font-mono font-bold">Descuento Anual del 20%</span>
              </div>

              <div className="bg-[#FAF8F3] border border-brand-dark/10 p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-dark/50 tracking-wider">Duración de Contrato</span>
                  <p className="font-serif text-lg text-brand-dark font-semibold mt-1">
                    {isAnnual ? 'Plan de Consumo Anual (Ahorro)' : 'Plan Mensual Variable'}
                  </p>
                </div>

                {/* Custom toggle button track */}
                <div className="flex items-center gap-4 bg-brand-cream border border-brand-dark/10 p-1.5 rounded-full">
                  <button
                    onClick={() => {
                      setIsAnnual(false);
                      setMintSuccess(false);
                    }}
                    className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full cursor-pointer transition-all ${
                      !isAnnual 
                        ? 'bg-brand-dark text-brand-cream' 
                        : 'text-brand-dark/55 hover:text-brand-dark'
                    }`}
                  >
                    Mensual
                  </button>
                  <button
                    onClick={() => {
                      setIsAnnual(true);
                      setMintSuccess(false);
                    }}
                    className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full cursor-pointer transition-all flex items-center gap-1.5 ${
                      isAnnual 
                        ? 'bg-brand-gold text-white' 
                        : 'text-brand-dark/55 hover:text-brand-dark'
                    }`}
                  >
                    Anual
                    <span className="bg-brand-cream/20 text-[9px] text-white px-1 py-0.5 font-bold rounded-sm">
                      -20%
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* AUTOMATIC CLUB MEMBERSHIP BENEFITS CARD */}
            <div className="bg-brand-surface-highest border border-brand-outline p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-brand-dark/10">
                <div className="p-2 bg-brand-gold/15 border border-brand-gold rounded-full">
                  <Crown className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-dark">
                    Membresía El Club — Acceso Automático Garantizado
                  </h3>
                  <p className="text-[11px] text-brand-dark/60 font-sans">
                    Sin tarifas ocultas, el Club es un derecho innato para toda suscripción de origen.
                  </p>
                </div>
              </div>

              {/* Grid of benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-brand-dark/75 leading-relaxed">
                <div className="flex gap-3 items-start">
                  <Check className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-brand-dark">Cosechas Primera Vista:</span> Reserva microlotes exclusivos 7 días antes de que salgan al público general.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-brand-dark">Tarifa Distribuidor:</span> Obtén 10% de descuento automático en cualquier compra complementaria en la tienda.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-brand-dark">Legado & Preparación:</span> Recibe cada mes folletos físicos y guías de origen que narran la historia de la familia roaster.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <Check className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-brand-dark">Cuppings Presenciales:</span> Acceso prioritario a cataciones en Caracas, Lechería y Cumanacoa con nuestros maestros tostadores.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE TOTAL CALCULATION & IDENTITY VERIFICATION CARD MINT */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            
            {/* CALCULATE SUMMARY PANEL */}
            <div className="bg-brand-surface-card border border-brand-outline p-6 space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-dark/50 block">RESUMEN DEL CONSENSO</span>
              
              <div className="space-y-2 border-b border-brand-dark/10 pb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-serif font-bold text-brand-dark">{selectedCoffee.name}</span>
                  <span className="font-mono text-xs text-brand-dark/80">
                    {isAnnual ? 'Plan Anual' : 'Suscripción Mensual'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-brand-dark/60">
                  <span>Membresía El Club Guaiquerí</span>
                  <span className="text-brand-gold font-bold">Incluida</span>
                </div>
                {isAnnual && (
                  <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-100/70 p-1.5 rounded-sm font-semibold border border-emerald-800/15">
                    <span>Ahorro Plan Anual</span>
                    <span>-${annualSavingsValue} / año</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-sans text-xs uppercase font-bold text-brand-dark/70">Total del Lote:</span>
                <div className="text-right">
                  <span className="font-serif text-3xl font-bold text-brand-dark block leading-none">
                    ${isAnnual ? selectedCoffee.annual : selectedCoffee.monthly}
                  </span>
                  <span className="font-mono text-[9px] text-brand-dark/40 tracking-wider">
                    {isAnnual ? 'facturado anual' : 'facturado mes a mes'}
                  </span>
                </div>
              </div>

              {/* Dynamic Credential inputs in summary card for smooth checkout flow */}
              <form onSubmit={handleMintPass} className="space-y-3 pt-4 border-t border-brand-dark/15">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-brand-dark/50 mb-1">Nombre del Firmante</label>
                  <input 
                    type="text"
                    value={useCustomName}
                    onChange={(e) => {
                      setUseCustomName(e.target.value);
                      setMintSuccess(false);
                    }}
                    placeholder="e.g. Wilfredy Salazar"
                    className="w-full px-3 py-2 bg-brand-cream border border-brand-outline/40 text-xs focus:border-brand-gold outline-none text-brand-dark font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-brand-dark/50 mb-1">Ubicación Primaria</label>
                  <select
                    value={userState}
                    onChange={(e: any) => {
                      setUserState(e.target.value);
                      setMintSuccess(false);
                    }}
                    className="w-full px-3 py-2 bg-brand-cream border border-brand-outline/40 text-xs focus:border-brand-gold outline-none text-brand-dark"
                  >
                    <option value="Caracas">Caracas (Capital)</option>
                    <option value="Lechería">Lechería (Anzoátegui)</option>
                    <option value="Sucre">Sucre (Cariaco/Cumaná)</option>
                    <option value="Monagas">Monagas (Caripe)</option>
                    <option value="Nueva Esparta">Nueva Esparta (Margarita)</option>
                    <option value="Miranda">Miranda</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isMinting}
                  className="w-full bg-brand-dark text-[#D4AF37] hover:bg-brand-dark/95 py-3.5 text-[10px] tracking-widest uppercase font-mono font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {isMinting ? (
                    'Procesando Red d\'Origen...'
                  ) : (
                    <>
                      Suscribirme & Unirme al Club
                      <ArrowRight className="h-3 w-3" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-[10px] text-brand-dark/50 text-center italic mt-2">
                Cancela cuando quieras • Envío incluido sin costos ocultos
              </p>
            </div>

            {/* LIVE SOVEREIGN IDENTITY CERTIFICATE PASSPORT */}
            {activeMember && (
              <div className="w-full relative shadow-2xl transition-all duration-700 hover:-translate-y-1">
                {/* Visual success splash */}
                {mintSuccess && (
                  <div className="absolute -top-3 -right-3 bg-brand-gold text-white text-[9px] uppercase font-mono font-bold px-2 py-1 rounded-sm shadow-md z-20 flex items-center gap-1 animate-bounce">
                    <Sparkles className="h-3 w-3" />
                    Suscripción Activa / Club Minted
                  </div>
                )}

                <div className="w-full glass-card border-2 border-brand-gold/20 p-6 relative overflow-hidden flex flex-col justify-between aspect-[1.58/1]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-light/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif text-lg font-bold tracking-tighter text-brand-dark">
                      GUAIQUERÍ
                    </span>
                    <div className="p-1 border border-brand-gold rounded-full flex items-center justify-center bg-brand-cream">
                      <span className="font-mono text-[9px] font-bold text-brand-gold">฿</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mb-6">
                    <p className="font-mono text-[8px] text-brand-dark/40 uppercase tracking-widest mb-1 select-none">
                      Sovereign Club Identity
                    </p>
                    <p className="font-serif text-xl font-bold tracking-wider text-brand-dark uppercase truncate">
                      {activeMember.name}
                    </p>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="inline-block w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping" />
                      <span className="font-mono text-[80%] text-brand-dark/55 leading-none">{activeMember.signature}</span>
                    </div>
                  </div>

                  {/* Footer specs */}
                  <div className="grid grid-cols-3 gap-2 border-t border-brand-dark/10 pt-3.5 font-mono text-[8px]">
                    <div>
                      <span className="text-brand-dark/50 block uppercase text-[7px]">Sovereign ID</span>
                      <span className="font-bold text-brand-dark truncate block max-w-full">{activeMember.memberId}</span>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 block uppercase text-[7px]">Ubicación</span>
                      <span className="font-bold text-brand-gold block truncate">{activeMember.state}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-brand-dark/50 block uppercase text-[7px]">Acceso</span>
                      <span className="font-bold text-brand-cream bg-brand-gold/90 px-1 inline-block uppercase text-[7px] font-mono">
                        {activeMember.tier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* LOWER PART: BLOCKCHAIN VERIFIABILITY SEARCH PORTAL (Remains fully secure and solid) */}
        <div className="bg-brand-surface-card border border-brand-outline p-6 md:p-10">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <div className="inline-flex py-1 px-3 bg-brand-gold/10 border border-brand-gold/25 font-mono text-[10px] uppercase font-bold text-brand-gold gap-1.5 items-center mx-auto">
              <Network className="h-3 w-3" />
              Direct-Trade Verification Protocol
            </div>
            
            <h3 className="font-serif text-3xl font-bold text-brand-dark">
              Auditor de Cosechas d'Oriente
            </h3>
            
            <p className="font-sans text-xs text-brand-dark/65 max-w-lg mx-auto leading-relaxed">
              Consulte la pureza, tueste e ingresos devengados por familia agricultora. Inserte un código de lote de compra o elija uno del registro inferior.
            </p>

            {/* Blockchain Query Form */}
            <form onSubmit={handleVerifySearch} className="flex gap-2 max-w-md mx-auto relative pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-dark/50" />
                <input 
                  type="text"
                  placeholder="e.g. GQR-2024-V3 o el hash d'un lote"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F2EEE5] border border-brand-outline text-xs focus:border-brand-gold outline-none text-brand-dark font-mono placeholder:font-sans placeholder:text-neutral-400"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-dark text-brand-cream hover:bg-brand-gold hover:text-white font-sans text-xs tracking-widest uppercase px-5 py-2 font-bold cursor-pointer transition-colors shrink-0"
              >
                Verificar Lote
              </button>
            </form>

            {/* Verification Result Output Drawer */}
            <AnimatePresence>
              {queriedBlock && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="bg-brand-cream border-l-4 border-brand-gold p-6 text-left font-mono text-xs space-y-4 my-6 shadow-md"
                >
                  <div className="flex flex-col md:flex-row justify-between border-b border-brand-dark/10 pb-3 gap-2">
                    <div>
                      <span className="text-[10px] text-brand-gold block font-bold">BLOCK STATUS: VERIFIED ON-CHAIN CONSENSUS</span>
                      <h4 className="font-serif text-lg font-bold text-brand-dark tracking-tight mt-0.5">
                        Transacción: {queriedBlock.blockNumber} (Lote: {queriedBlock.lotId})
                      </h4>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="text-brand-dark/50 text-[10px] block">ROAST TIMESTAMP</span>
                      <p className="font-bold text-brand-dark">{queriedBlock.roastDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 py-2">
                    <div>
                      <span className="text-brand-dark/50 text-[10px] block uppercase">Establecimiento</span>
                      <p className="font-sans font-bold text-brand-dark">{queriedBlock.originState}</p>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 text-[10px] block uppercase">Propietario d'Hacienda</span>
                      <p className="font-sans font-bold text-brand-dark">{queriedBlock.farmerName}</p>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 text-[10px] block uppercase">Especificación de Altura</span>
                      <p className="font-sans font-bold text-brand-dark">{queriedBlock.altitude}</p>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 text-[10px] block uppercase">Prima Directa al Productor</span>
                      <p className="font-sans font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 inline-block rounded-sm text-[11px] font-semibold border border-emerald-800/25">
                        {queriedBlock.fairTradePremium}
                      </p>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 text-[10px] block uppercase">Humedad d'Grano</span>
                      <p className="font-sans font-bold text-brand-dark">{queriedBlock.moistureLevel}</p>
                    </div>
                    <div>
                      <span className="text-brand-dark/50 text-[10px] block uppercase">Puntaje Catación SCAA</span>
                      <p className="font-sans font-bold text-brand-gold">{queriedBlock.qualityScore}</p>
                    </div>
                  </div>

                  {/* SHA-256 Hash Display */}
                  <div className="bg-brand-dark text-brand-cream p-3 rounded-sm text-[10px] space-y-1 block select-all">
                    <p className="text-brand-gold font-bold">CONSENSUS SEAL (SHA-256):</p>
                    <p className="break-all opacity-80">{queriedBlock.hash}</p>
                  </div>
                </motion.div>
              )}

              {queryError && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-mono text-left max-w-md mx-auto flex gap-2 items-center"
                >
                  <ShieldAlert className="h-4 w-4 shrink-0 text-red-600" />
                  <p>{queryError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Verification Ledger Table */}
            <div className="pt-6 text-left">
              <span className="font-mono text-[9px] text-brand-dark/40 uppercase tracking-widest block mb-3 font-semibold">
                Registro General de Bloques Activos
              </span>
              
              <div className="bg-brand-cream border border-brand-outline overflow-x-auto">
                <table className="w-full text-left font-mono text-[10px] select-all">
                  <thead>
                    <tr className="bg-[#E8E4DA] border-b border-brand-outline uppercase text-[9px] text-brand-dark/50">
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Hacienda d'Origen</th>
                      <th className="p-3">Productor</th>
                      <th className="p-3">Tueste</th>
                      <th className="p-3 text-right">Premios directos</th>
                      <th className="p-3 text-center">Auditar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBlocks.map((block, idx) => (
                      <tr 
                        key={idx} 
                        className="border-b border-brand-outline hover:bg-brand-gold/5 transition-colors cursor-pointer"
                        onClick={() => {
                          setSearchQuery(block.blockNumber);
                          setQueriedBlock(block);
                          setQueryError(null);
                        }}
                      >
                        <td className="p-3 font-bold text-brand-dark">{block.blockNumber}</td>
                        <td className="p-3 font-sans">{block.originState}</td>
                        <td className="p-3 font-sans truncate max-w-[120px]">{block.farmerName}</td>
                        <td className="p-3">{block.roastDate}</td>
                        <td className="p-3 text-right font-medium text-emerald-800">{block.fairTradePremium.split(' Direct')[0]}</td>
                        <td className="p-3 text-center text-brand-gold py-2 font-bold uppercase text-[9px]">
                          ✓ Cargar Block
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
