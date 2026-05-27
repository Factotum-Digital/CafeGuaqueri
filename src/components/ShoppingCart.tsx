/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Plus, Minus, Trash2, Wallet, CreditCard, Landmark, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import React, { useState } from 'react';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (pId: string, delta: number) => void;
  onRemove: (pId: string) => void;
  onClear: () => void;
  onAddBlockchainReceipt: (block: { blockNumber: string; lotId: string; originState: string; farmerName: string; altitude: string; fairTradePremium: string; roastDate: string; moistureLevel: string; qualityScore: string; hash: string }) => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onClear,
  onAddBlockchainReceipt
}: ShoppingCartProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'pago_movil' | 'card' | 'crypto'>('pago_movil');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    bankReceiptOrTx: ''
  });
  const [finalReceipt, setFinalReceipt] = useState<any>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const ivaRate = 0.16; // 16% Venezuelan IVA
  const iva = subtotal * ivaRate;
  const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
  const total = subtotal + iva + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.shippingAddress) {
      alert('Por favor llene todos los campos obligatorios para asegurar su envío.');
      return;
    }

    // Generate custom cryptographic receipt
    const txId = 'GQR-' + Math.floor(100000 + Math.random() * 900000);
    const hashStr = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const blockReceipt = {
      blockNumber: txId,
      lotId: items[0]?.product?.id?.toUpperCase()?.substring(0, 6) || 'SOV-MX',
      originState: items[0]?.product?.origin || 'Oriente de Venezuela',
      farmerName: items[0]?.product?.farmer || 'Pacto de Productores',
      altitude: items[0]?.product?.altitude || '1,400m',
      fairTradePremium: '+35% Pago Directo al Productor',
      roastDate: new Date().toISOString().split('T')[0],
      moistureLevel: '10.8%',
      qualityScore: '87.5 ptos SCAA',
      hash: hashStr
    };

    setFinalReceipt(blockReceipt);
    onAddBlockchainReceipt(blockReceipt);
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClear();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm cursor-pointer"
      />

      {/* Cart Drawer */}
      <div className="relative w-full max-w-md h-full bg-brand-cream border-l border-brand-outline/20 shadow-2xl flex flex-col z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-brand-outline/10 bg-brand-cream">
          <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-brand-dark">
            {checkoutStep === 'cart' ? 'Tu Pedido' : checkoutStep === 'checkout' ? 'Despacho Soberano' : 'Orden Mintada'}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Dynamic Content */}
        {checkoutStep === 'cart' && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-brand-gray">
                <ShoppingBag className="h-16 w-16 mb-4 stroke-[1] opacity-40 text-brand-gold" />
                <p className="font-serif text-xl font-medium mb-1">Cesta Vacía</p>
                <p className="text-sm opacity-70">Empieza seleccionando una de nuestras cosechas de micro-lotes.</p>
                <button
                  onClick={onClose}
                  className="mt-6 border border-brand-dark hover:bg-brand-dark hover:text-brand-cream px-6 py-2.5 font-sans text-xs tracking-widest uppercase cursor-pointer"
                >
                  Volver a la selección
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {items.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="flex gap-4 p-3 bg-brand-surface-card border border-brand-outline/10 hover:border-brand-gold/40 transition-all duration-300"
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-20 object-cover bg-brand-cream shrink-0 border border-brand-outline/5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif text-base font-bold text-brand-dark leading-tight">
                              {item.product.name}
                            </h4>
                            <span className="font-mono text-xs font-semibold shrink-0">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider mt-0.5">
                            {item.product.origin}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-brand-outline/20 bg-brand-cream">
                            <button 
                              onClick={() => onUpdateQty(item.product.id, -1)}
                              className="px-2 py-1 hover:text-brand-gold transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2.5 text-xs font-mono font-medium text-brand-dark">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => onUpdateQty(item.product.id, 1)}
                              className="px-2 py-1 hover:text-brand-gold transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button 
                            onClick={() => onRemove(item.product.id)}
                            className="p-1 text-brand-gray/60 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing summary */}
                <div className="p-6 border-t border-brand-outline/10 bg-brand-surface-card bg-opacity-70">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-brand-gray">
                      <span>Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-gray">
                      <span>IVA Especial (16%)</span>
                      <span className="font-mono">${iva.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-gray">
                      <span>Envío Asegurado</span>
                      <span className="font-mono">
                        {shipping === 0 ? <span className="text-emerald-700 font-sans uppercase text-[11px] font-bold">Gratuito</span> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="h-[1px] bg-brand-outline/10 my-3" />
                    <div className="flex justify-between text-base font-bold text-brand-dark">
                      <span>TOTAL</span>
                      <span className="font-mono text-brand-gold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full mt-6 bg-brand-dark text-white hover:bg-brand-gold active:scale-95 py-4 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300"
                  >
                    Proceder al Pago
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {checkoutStep === 'checkout' && (
          <form onSubmit={processPayment} className="flex-1 flex flex-col h-full bg-brand-cream overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Shipping Form fields */}
              <div>
                <h3 className="text-xs uppercase font-bold tracking-widest text-brand-gold mb-4">Información de Envío</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-brand-gray mb-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Wilfredy Salazar"
                      className="w-full px-3 py-2 border-b border-brand-outline/30 focus:border-brand-gold bg-transparent outline-none text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-brand-gray mb-1">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="coffeelover@gmail.com"
                        className="w-full px-3 py-2 border-b border-brand-outline/30 focus:border-brand-gold bg-transparent outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider text-brand-gray mb-1">Teléfono *</label>
                      <input 
                        type="text" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+58 414-1234567"
                        className="w-full px-3 py-2 border-b border-brand-outline/30 focus:border-brand-gold bg-transparent outline-none text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-brand-gray mb-1">Dirección de Despacho (Venezuela) *</label>
                    <textarea 
                      name="shippingAddress"
                      required
                      rows={2}
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Calle Sabana Grande, Quinta Guaiquerí, Caracas o Av Américo Vespucio, Lechería."
                      className="w-full px-3 py-2 border-b border-brand-outline/30 focus:border-brand-gold bg-transparent outline-none text-xs resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods tabs */}
              <div className="pt-2">
                <h3 className="text-xs uppercase font-bold tracking-widest text-brand-gold mb-3">Método de Pago</h3>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pago_movil')}
                    className={`p-3 border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'pago_movil' 
                        ? 'border-brand-gold bg-brand-gold/10 font-bold text-brand-gold' 
                        : 'border-brand-outline/20 hover:border-brand-gold/40 text-brand-dark'
                    }`}
                  >
                    <Landmark className="h-4 w-4" />
                    <span className="text-[9px] uppercase tracking-wider">Pago Móvil</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'crypto' 
                        ? 'border-brand-gold bg-brand-gold/10 font-bold text-brand-gold' 
                        : 'border-brand-outline/20 hover:border-brand-gold/40 text-brand-dark'
                    }`}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-[9px] uppercase tracking-wider">Crypto (BTC)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-brand-gold bg-brand-gold/10 font-bold text-brand-gold' 
                        : 'border-brand-outline/20 hover:border-brand-gold/40 text-brand-dark'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="text-[9px] uppercase tracking-wider">Tarjeta USD</span>
                  </button>
                </div>

                {/* Method instructions */}
                <div className="mt-3 p-3 bg-brand-surface-card border border-brand-outline/15 text-[11px] space-y-1.5 text-brand-gray">
                  {paymentMethod === 'pago_movil' && (
                    <>
                      <p className="font-bold text-brand-dark">Datos Pago Móvil (BCV Rate):</p>
                      <p>Rif: J-40812903-3</p>
                      <p>Banco Mercantil (0105)</p>
                      <p>Celular: 0414-081-3033</p>
                      <p className="mt-1 text-[10px] italic">Simule el pago y coloque el nº de referencia de la transferencia abajo:</p>
                    </>
                  )}
                  {paymentMethod === 'crypto' && (
                    <>
                      <p className="font-bold text-brand-dark">Dirección de Depósito (BTC/USDT):</p>
                      <p className="font-mono text-[9px] break-all select-all">bc1qguaiquericafe0812verifiablechainkeys</p>
                      <p>Red: Bitcoin Native SegWit / USDT TRC20</p>
                      <p className="mt-1 text-[10px] italic">Simule la transferencia crypto y coloque el Hash Tx hash abajo:</p>
                    </>
                  )}
                  {paymentMethod === 'card' && (
                    <>
                      <p className="font-bold text-brand-dark">Tarjeta de Crédito Internacional:</p>
                      <p>Pagos procesados por pasarela de seguridad SSL de 256 bits.</p>
                      <p className="mt-1 text-[10px] italic">Ingrese números ficticios de tarjeta abajo:</p>
                    </>
                  )}

                  <input 
                    type="text" 
                    name="bankReceiptOrTx"
                    value={formData.bankReceiptOrTx}
                    onChange={handleInputChange}
                    placeholder={paymentMethod === 'pago_movil' ? 'Nº de Referencia (e.g. 981240)' : paymentMethod === 'crypto' ? 'Tx Hash o Firma ID' : 'Número de Tarjeta / CVC'}
                    className="w-full mt-2 px-3 py-1.5 border border-brand-outline/30 bg-brand-cream focus:border-brand-gold outline-none text-xs text-brand-dark font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Total checkout footer */}
            <div className="p-6 border-t border-brand-outline/10 bg-brand-surface-card flex flex-col gap-3">
              <div className="flex justify-between text-sm font-bold text-brand-dark">
                <span>Total a Liquidar</span>
                <span className="font-mono text-brand-gold">${total.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="border border-brand-dark font-sans text-xs tracking-widest uppercase font-semibold py-3 transition-colors hover:bg-brand-dark hover:text-white"
                >
                  Volver al Carrito
                </button>
                <button
                  type="submit"
                  className="bg-brand-gold text-white font-sans text-xs tracking-widest uppercase font-semibold py-3 transition-colors hover:bg-brand-dark"
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          </form>
        )}

        {checkoutStep === 'success' && finalReceipt && (
          <div className="flex-1 flex flex-col p-6 bg-brand-cream select-none text-center">
            <div className="flex-1 flex flex-col items-center justify-center space-y-5 py-6">
              <CheckCircle2 className="h-14 w-14 text-emerald-700 animate-bounce" />
              <div>
                <h3 className="font-serif text-xl font-bold uppercase text-brand-dark">¡Cosecha Asegurada!</h3>
                <p className="text-sm text-brand-gray mt-1 px-4 leading-relaxed">
                  Pago verificado mediante multiconsenso. Su lote ha sido asignado y reservado.
                </p>
              </div>

              {/* Cryptographic Block Print */}
              <div className="w-full p-4 border-2 border-dashed border-brand-gold/30 bg-brand-surface-card text-left font-mono text-[11px] space-y-1.5 select-all">
                <div className="flex justify-between">
                  <span className="text-brand-gold font-bold uppercase">ID DEL BLOQUE GENERADO</span>
                  <span className="font-bold">{finalReceipt.blockNumber}</span>
                </div>
                <div className="h-[1px] bg-brand-outline/20 my-1" />
                <p><span className="text-brand-gray">ID DE LOTE:</span> {finalReceipt.lotId}</p>
                <p><span className="text-brand-gray">PRODUCTOR:</span> {finalReceipt.farmerName}</p>
                <p><span className="text-brand-gray">ORIGEN:</span> {finalReceipt.originState}</p>
                <p><span className="text-brand-gray">HASH DE EMISIÓN:</span></p>
                <p className="break-all text-[10px] opacity-75">{finalReceipt.hash}</p>
                <div className="p-1 px-2 bg-emerald-100 text-emerald-800 text-[10px] text-center font-bold font-sans uppercase">
                  ✓ VERIFICAR ESTADO EN LA PÁGINA DEL CLUB
                </div>
              </div>

              <p className="text-[11px] text-brand-gray italic leading-relaxed">
                Su código <span className="font-bold underline">{finalReceipt.blockNumber}</span> ha sido adicionado al nodo de verificación. Copie este código o diríjase a la sección "Club" para el seguimiento en tiempo real.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-brand-dark text-white hover:bg-brand-gold py-4 font-sans text-xs tracking-widest uppercase font-semibold transition-colors mt-auto"
            >
              Completar y Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
