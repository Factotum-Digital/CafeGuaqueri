/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { COFFEE_PRODUCTS } from '../data';
import { CoffeeItem } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: CoffeeItem) => void;
}

export default function SearchOverlay({ isOpen, onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = COFFEE_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.origin.toLowerCase().includes(query.toLowerCase()) ||
    p.notes.some(n => n.toLowerCase().includes(query.toLowerCase()))
  );

  const suggestedTags = ['Cacao', 'Mandarina', 'Natural', 'Washed', 'Honey', 'Melaza', 'Sucre'];

  return (
    <div className="fixed inset-0 z-55 flex items-start justify-center p-4 pt-20 select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm cursor-pointer animate-fade-in"
      />

      {/* Search Panel Box */}
      <div className="relative w-full max-w-2xl bg-brand-cream border border-brand-outline/25 shadow-2xl p-6 z-10 animate-fade-in-down">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-dark hover:text-brand-gold cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Input area */}
        <div className="relative flex items-center border-b border-brand-dark pb-2 pr-6">
          <Search className="h-5 w-5 text-brand-gold shrink-0 mr-3" />
          <input 
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por notas de sabor (e.g. Jazmín, Cacao) o nombre..."
            className="w-full bg-transparent outline-none text-base text-brand-dark font-sans"
          />
        </div>

        {/* Quick Suggest tags */}
        <div className="flex flex-wrap gap-1.5 items-center mt-4">
          <span className="text-[10px] font-mono uppercase text-brand-gray mr-1">Sugeridos:</span>
          {suggestedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[10px] uppercase px-2 py-1 border border-brand-outline/20 hover:border-brand-gold hover:text-brand-gold transition-colors font-mono cursor-pointer bg-brand-surface-card"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results list */}
        <div className="mt-6 border-t border-brand-outline/10 pt-4 max-h-[280px] overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-6 text-xs text-brand-gray font-sans italic">
              No se encontraron cosechas con los criterios "{query}"
            </p>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-4 p-2 bg-brand-surface-card border border-brand-outline/5 hover:border-brand-gold/40 cursor-pointer transition-all"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-10 h-12 object-cover bg-brand-cream"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-brand-dark uppercase tracking-tight">
                    {product.name}
                  </h4>
                  <p className="font-mono text-[9px] text-brand-gold uppercase tracking-widest leading-none mt-1 font-bold">
                    {product.origin}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xs font-semibold block">${product.price.toFixed(2)}</span>
                  <p className="text-[9px] text-brand-gray italic">{product.process}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
