/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, User, ShieldCheck, Mail, LogOut, Package2, Truck } from 'lucide-react';
import { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function ProfileModal({ isOpen, onClose, userEmail = 'Wilfredy7@gmail.com' }: ProfileModalProps) {
  const [profileName, setProfileName] = useState('Wilfredy Salazar');
  const [copiedToken, setCopiedToken] = useState(false);

  if (!isOpen) return null;

  const simulatedOrders = [
    { id: 'REC-081226', lot: 'Cumanacoa Washed', status: 'En Ruta (Hub Lechería)', date: '2026-05-26', price: '$32.00' },
    { id: 'REC-079914', lot: 'Caripe Natural', status: 'Entregado', date: '2026-05-20', price: '$38.00' }
  ];

  const handleCopyWalletKey = () => {
    navigator.clipboard.writeText('0xabc8129033f11ac88eedaa9f001b6c77bb8bfb51aaa');
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm cursor-pointer animate-fade-in"
      />

      {/* Profile Box */}
      <div className="relative w-full max-w-md bg-brand-cream border border-brand-outline/25 shadow-2xl p-6 md:p-8 z-10 animate-fade-in-down">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-dark hover:text-brand-gold cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Identity Section */}
        <div className="flex gap-4 items-center border-b border-brand-outline/10 pb-6 mb-6">
          <div className="w-14 h-14 bg-brand-gold/10 border border-brand-gold/35 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-brand-gold" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-brand-dark uppercase tracking-tight">
              {profileName}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full" />
              <span className="font-mono text-[9px] text-brand-gray tracking-wider">CUENTA DE NODO SOBERANO</span>
            </div>
          </div>
        </div>

        {/* Details fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-[9px] uppercase font-mono font-bold text-brand-gray mb-1">Email Registrado</label>
            <div className="flex items-center gap-2 p-2 bg-brand-surface-card border border-brand-outline/15 font-mono text-xs text-brand-dark select-all">
              <Mail className="h-3.5 w-3.5 text-brand-gold shrink-0" />
              <span>{userEmail}</span>
            </div>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-mono font-bold text-brand-gray mb-1">Clave Pública de Cartera Nemónica</label>
            <div className="flex justify-between items-center p-2 bg-brand-surface-card border border-brand-outline/15 font-mono text-[10px] text-brand-dark min-w-0">
              <span className="truncate select-all mr-2">0xabc8129033f11ac88eedaa9f001b6c77bb8bfb51aaa</span>
              <button 
                onClick={handleCopyWalletKey}
                className="text-[9px] uppercase tracking-wider font-bold text-brand-gold hover:text-brand-dark transition-colors cursor-pointer shrink-0"
              >
                {copiedToken ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        {/* Order tracking logs */}
        <div className="border-t border-brand-outline/10 pt-4 mb-6">
          <span className="font-mono text-[9px] uppercase font-bold text-brand-gray tracking-wider block mb-3">Historial de Lotes Solicitados</span>
          <div className="space-y-2 max-h-[140px] overflow-y-auto">
            {simulatedOrders.map((order) => (
              <div 
                key={order.id}
                className="p-3 bg-brand-surface-card border border-brand-outline/10 flex justify-between items-center text-[11px] font-mono hover:border-brand-gold/30 transition-all"
              >
                <div>
                  <div className="flex gap-1.5 items-center">
                    <Package2 className="h-3 w-3 text-brand-gold" />
                    <span className="font-sans font-bold text-brand-dark">{order.lot}</span>
                  </div>
                  <span className="text-brand-gray opacity-85 block mt-0.5 font-mono text-[9px]">ID: {order.id} ({order.date})</span>
                </div>
                <div className="text-right">
                  <span className="font-bold block text-brand-dark">{order.price}</span>
                  <p className="flex items-center gap-1 text-[9px] text-brand-gold uppercase font-bold justify-end mt-0.5">
                    <Truck className="h-2.5 w-2.5" />
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full bg-brand-dark text-white hover:bg-brand-gold py-3 text-xs tracking-widest uppercase font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ShieldCheck className="h-4 w-4" />
          Aceptar Credenciales
        </button>
      </div>
    </div>
  );
}
