/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, ShoppingCart as CartIcon, Eye, Check, X, ShieldCheck, Landmark } from 'lucide-react';
import React, { useState } from 'react';
import { CoffeeItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CoffeeSelectorProps {
  products: CoffeeItem[];
  onAddToCart: (product: CoffeeItem) => void;
}

export default function CoffeeSelector({ products, onAddToCart }: CoffeeSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'single' | 'limited'>('all');
  const [selectedProduct, setSelectedProduct] = useState<CoffeeItem | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleAddToCart = (e: React.MouseEvent, product: CoffeeItem) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1800);
  };

  return (
    <section className="bg-brand-cream py-20 border-b border-brand-outline/10 select-none" id="shop">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold tracking-tight text-brand-dark mb-4">
              The Selection
            </h2>
            <p className="font-sans text-base text-brand-gray max-w-xl leading-relaxed">
              Curated micro-lots from the Sucre and Monagas highlands, roasted to perfection for the modern connoisseur.
            </p>
          </div>
          
          {/* Filtering Tabs */}
          <div className="flex gap-8 mt-6 md:mt-0 font-sans text-[10px] tracking-[0.2em] uppercase font-semibold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`pb-1 cursor-pointer transition-all border-b ${
                selectedCategory === 'all'
                  ? 'text-brand-dark border-brand-dark'
                  : 'text-brand-dark/40 border-transparent hover:text-brand-dark'
              }`}
            >
              All Origins
            </button>
            <button
              onClick={() => setSelectedCategory('single')}
              className={`pb-1 cursor-pointer transition-all border-b ${
                selectedCategory === 'single'
                  ? 'text-brand-dark border-brand-dark'
                  : 'text-brand-dark/40 border-transparent hover:text-brand-dark'
              }`}
            >
              Single Estate
            </button>
            <button
              onClick={() => setSelectedCategory('limited')}
              className={`pb-1 cursor-pointer transition-all border-b ${
                selectedCategory === 'limited'
                  ? 'text-brand-dark border-brand-dark'
                  : 'text-brand-dark/40 border-transparent hover:text-brand-dark'
              }`}
            >
              Limited Release
            </button>
          </div>
        </div>

        {/* Coffee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Product Image Box */}
              <div className="aspect-[4/5] overflow-hidden mb-4 relative bg-brand-surface-card border border-brand-outline/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro-Lot Quick Indicators */}
                <span className="absolute top-2 left-2 bg-brand-dark text-white text-[9px] uppercase font-mono font-bold tracking-widest px-2 py-0.5">
                  {product.process}
                </span>

                {/* Overlays on hover */}
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-brand-cream text-brand-dark hover:bg-brand-gold hover:text-white p-3 border border-brand-dark/10 transition-colors cursor-pointer"
                    title="Explorar Micro-lote"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-brand-dark text-brand-cream hover:bg-brand-gold p-3 border border-brand-dark/10 transition-colors cursor-pointer"
                    title="Añadir al carrito"
                  >
                    <CartIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Product Details info block */}
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-dark leading-tight group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-mono text-[11px] text-brand-gold uppercase tracking-wider mt-0.5 font-bold">
                      {product.origin}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-semibold">${product.price.toFixed(2)}</span>
                </div>

                {/* Star Ratings */}
                <div className="flex items-center gap-1 mt-2 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-brand-gold' : 'opacity-30'}`} 
                    />
                  ))}
                  <span className="font-mono text-[10px] text-brand-gray ml-1">({product.rating})</span>
                </div>

                {/* Small Direct Add To Basket inside layout */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className={`w-full mt-4 font-sans text-[10px] tracking-widest uppercase py-2 border transition-all duration-300 font-bold flex items-center justify-center gap-2 cursor-pointer ${
                    addedProductId === product.id
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-transparent text-brand-dark border-brand-dark hover:bg-brand-dark hover:text-white'
                  }`}
                >
                  {addedProductId === product.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Asignado
                    </>
                  ) : (
                    <>
                      <CartIcon className="h-3.5 w-3.5 stroke-[1.5]" />
                      Adquirir Lote
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Modal / Slider for the selected Coffee */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4 md:p-6 select-none">
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm cursor-pointer"
              />

              {/* Modal Card */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="relative w-full max-w-4xl bg-brand-cream border border-brand-outline/20 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 z-10"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-1 rounded-full text-brand-dark hover:text-brand-gold hover:bg-brand-dark/5 transition-all cursor-pointer z-20"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Left Side: Product Image & Blockchain Seal */}
                <div className="relative aspect-[3/4] bg-brand-surface-card border border-brand-outline/10">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 right-3 glass-card p-3 border border-brand-gold/25 font-mono text-[10px] leading-relaxed flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-brand-gold shrink-0" />
                    <div>
                      <p className="font-bold text-brand-dark">PROVENANCE BLOCK VERIFIED</p>
                      <p className="text-brand-gray truncate">Hash: {selectedProduct.blockchainHash}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Product Details & Specs */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase text-brand-gold tracking-widest font-bold">
                      {selectedProduct.category === 'limited' ? 'Micro-Lote Limitado' : 'Hacienda Única'}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-brand-dark mt-1 leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <p className="font-mono text-xs text-brand-gold uppercase tracking-wider font-semibold mb-3">
                      {selectedProduct.origin}
                    </p>

                    <div className="flex items-center gap-1.5 my-3">
                      <span className="font-serif text-2xl font-bold">${selectedProduct.price.toFixed(2)}</span>
                      <span className="font-mono text-[11px] text-brand-gray ml-2">Caja de 340g (Molido o En Grano)</span>
                    </div>

                    <p className="text-xs text-brand-gray leading-relaxed mb-5">
                      {selectedProduct.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-brand-outline/15 py-4 my-4 font-mono text-[11px]">
                      <div>
                        <span className="text-brand-gray block uppercase text-[9px]">Altura</span>
                        <span className="font-bold text-brand-dark">{selectedProduct.altitude}</span>
                      </div>
                      <div>
                        <span className="text-brand-gray block uppercase text-[9px]">Proceso</span>
                        <span className="font-bold text-brand-dark">{selectedProduct.process}</span>
                      </div>
                      <div>
                        <span className="text-brand-gray block uppercase text-[9px]">Tueste</span>
                        <span className="font-bold text-brand-dark">{selectedProduct.roastLevel}</span>
                      </div>
                      <div>
                        <span className="text-brand-gray block uppercase text-[9px]">Cosecha</span>
                        <span className="font-bold text-brand-dark">{selectedProduct.harvestDate}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-brand-gray block uppercase text-[9px]">Caficultor</span>
                        <span className="font-bold text-brand-dark text-xs">{selectedProduct.farmer}</span>
                      </div>
                    </div>

                    {/* Tasting Notes */}
                    <div className="my-4">
                      <span className="font-mono text-[10px] text-brand-gray uppercase block mb-1.5">Perfil Sensorial</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.notes.map((note, index) => (
                          <span 
                            key={index}
                            className="text-[10px] px-2.5 py-1 bg-brand-gold/5 border border-brand-gold/15 text-brand-gold font-sans font-bold uppercase rounded-sm"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={(e) => {
                        handleAddToCart(e, selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-brand-dark text-white hover:bg-brand-gold active:scale-95 py-3.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CartIcon className="h-4 w-4" />
                      Añadir al Pedido
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="border border-brand-dark hover:bg-brand-dark hover:text-white px-6 py-3.5 font-sans text-xs tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
