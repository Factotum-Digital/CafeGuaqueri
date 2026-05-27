/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface TopNavBarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
  onProfileClick: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function TopNavBar({
  cartCount,
  onCartClick,
  onSearchClick,
  onProfileClick,
  activeSection,
  setActiveSection
}: TopNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Cafés', id: 'shop' },
    { name: 'Métodos', id: 'equipment' },
    { name: 'Historia', id: 'story' },
    { name: 'Club', id: 'club' },
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full z-45 bg-brand-cream/90 backdrop-blur-md border-b border-brand-outline/10 select-none">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          className="font-serif text-2xl font-bold tracking-tighter text-brand-dark cursor-pointer select-none italic flex items-center gap-1"
        >
          GUAIQUERÍ<span className="text-brand-gold">.</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 items-center justify-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-sans text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 pb-1 cursor-pointer border-b ${
                  isActive
                    ? 'text-brand-dark border-brand-dark'
                    : 'text-brand-dark/50 border-transparent hover:text-brand-dark hover:border-brand-dark/30'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Issue designation and Utility Toolbar */}
        <div className="flex items-center gap-6">
          <span className="hidden lg:inline font-sans text-[9px] uppercase tracking-[0.2em] text-brand-dark/40 font-semibold border-r border-brand-dark/10 pr-6">
            Edición 08 / 2026
          </span>

          <div className="flex items-center gap-4">
            <button 
              onClick={onSearchClick}
              className="p-1 text-brand-dark/70 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5 stroke-[1.5]" />
            </button>

            <button 
              onClick={onProfileClick}
              className="p-1 text-brand-dark/70 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
              aria-label="User profile"
            >
              <User className="h-4.5 w-4.5 stroke-[1.5]" />
            </button>

            <button 
              onClick={onCartClick}
              className="relative p-1 text-brand-dark/70 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-4.5 w-4.5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[9px] uppercase font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 text-brand-dark/70 hover:text-brand-gold transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[1.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-b border-brand-outline/10 py-6 px-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-sans text-left text-sm tracking-widest uppercase py-1 border-l-2 pl-3 ${
                    isActive
                      ? 'text-brand-gold border-brand-gold font-semibold'
                      : 'text-brand-dark border-transparent hover:text-brand-gold'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
