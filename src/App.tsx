/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Globe, Share2, Mail, ShieldCheck, Heart, ArrowRight, CornerDownRight, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data and types
import { CoffeeItem, CartItem, VerifiableBlock } from './types';
import { COFFEE_PRODUCTS } from './data';

// Components
import TopNavBar from './components/TopNavBar';
import CoffeeSelector from './components/CoffeeSelector';
import BrewingAtelier from './components/BrewingAtelier';
import ElClubMembership from './components/ElClubMembership';
import ShoppingCart from './components/ShoppingCart';
import SearchOverlay from './components/SearchOverlay';
import ProfileModal from './components/ProfileModal';

export default function App() {
  // Global drawers state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Dynamic blockchain blocks from cart purchases
  const [customReceipts, setCustomReceipts] = useState<VerifiableBlock[]>([]);

  // Track scroll intersection to update TopNavBar active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'shop', 'equipment', 'club', 'story'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Management
  const handleAddToCart = (product: CoffeeItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer for instant feedback
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty >= 1 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Add new block to verification ledger when payment goes through
  const handleAddBlockchainReceipt = (block: VerifiableBlock) => {
    setCustomReceipts(prev => [block, ...prev]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-sans relative flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Global Navigation Bar */}
      <TopNavBar 
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Hero Section with plantation parallax-like aesthetic */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden" 
        id="home"
      >
        <div 
          className="absolute inset-0 z-0 parallax-bg filter saturate-[0.85] brightness-[0.7]"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD85Ac04EoSie2ykALklscyG6qqJELJ33i9NH2Y_Q7KyLAeEDeeZSxytp11BUIKFLN-wZ_IPkMVClJf3CDi9HetxmpkFoZcfABtCHF1JTg2Npp5uaZjYBZClatIgBRkHv1jBQRvKUwcQWc3mVLTjAzH2GUVk7hI4PkA1yLqFF_MGsSh1fHPyOJ6w5CM_5i077qQzA805M_7EcUTukHATWJrJ6Dl9B21UBOv6IByBfJpgs85rn-cFti6LOKbCSiflpqsFsLnj3X0hxJV')",
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Dark subtle overlay vignette for branding pop */}
        <div className="absolute inset-0 bg-brand-dark/35 z-5" />

        {/* Subtle dot-grid pattern overlay to enforce Kyoto minimalist blueprint look */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none z-5 subtle-grid-bg" />

        {/* Vertical Rail Text Left (Kyoto Space-Void design blueprint look) */}
        <div className="absolute left-6 bottom-24 hidden xl:block rotate-180 [writing-mode:vertical-rl] text-[8px] uppercase tracking-[0.4em] font-mono text-white/50 border-r border-white/20 pr-4 z-10 select-none">
          Redefining Coffee Provenance with Sovereign Integrity
        </div>

        {/* Vertical Rail Text Right (Kyoto Space-Void design blueprint look) */}
        <div className="absolute right-6 top-24 hidden xl:block [writing-mode:vertical-rl] text-[8px] uppercase tracking-[0.4em] font-mono text-white/50 border-l border-white/20 pl-4 z-10 select-none">
          Cultivado en Caripe y Turimiquire / Issue 08
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl select-none">
          <span className="text-[10px] uppercase tracking-[0.4em] mb-4 text-brand-gold-light font-bold block">
            Featured Heritage Origin
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="font-serif text-5xl md:text-[88px] tracking-tight font-bold drop-shadow-xl p-2 select-all leading-[0.9] uppercase"
          >
            GUAIQUERÍ <br/><span className="text-brand-gold-light italic">CAFÉ</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-serif text-lg md:text-2xl italic tracking-wide font-light opacity-90 mt-4 leading-relaxed max-w-xl mx-auto"
          >
            "El Café del Oriente para los Venezolanos"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12"
          >
            <a 
              href="#shop"
              className="bg-brand-dark text-brand-cream border border-brand-outline/20 px-10 py-4 font-sans text-xs tracking-widest uppercase hover-letter-spacing hover:bg-brand-gold hover:text-white active:scale-95 transition-all duration-300 inline-block font-bold"
            >
              Explore the Harvest
            </a>
          </motion.div>
        </div>

        {/* Floating Overlapping Meta Info (Kyoto exhibition layout look) */}
        <div className="hidden lg:block absolute right-16 bottom-16 bg-brand-dark text-brand-cream p-8 w-[280px] z-10 border border-white/10 shadow-2xl">
          <h3 className="font-serif text-lg mb-4 italic leading-snug">"Un sorbo de café es el respirar libre del alma."</h3>
          <p className="text-[9px] opacity-50 leading-normal uppercase tracking-widest font-mono">Guaiquerí Edición 08 / Reserva Privada de Cosecha</p>
        </div>
      </section>

      {/* 3. Shop - Cosechas / The Selection */}
      <CoffeeSelector 
        products={COFFEE_PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Equipment - El Atelier (Extraction simulators) */}
      <BrewingAtelier />

      {/* 5. El Club - Memberships and Ledger Verification */}
      <ElClubMembership 
        customReceipts={customReceipts}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 6. Our Story - Born in the Oriente Venezolano */}
      <section className="py-24 bg-white select-none border-b border-brand-outline/10" id="story">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Image box with mood grayscale transitions */}
            <div className="order-2 md:order-1 relative aspect-square overflow-hidden border border-brand-outline/10">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqYIw10zAfJh8_aXdXAps61cP-iBIbmWAl02YRK2l4P9rBNy_e9MIiC6_JqeEOrFY9P77blxlp-RA0wqY_RRy72WsNyRYzFUv90CMcUfw7bjygBxroijWe5f-tadHCPG3DeLU7jjZno6PlRpxfWcitiWIPCjih9lUQ6MpnGkDmX7XRpyayDuxHb01RlpxvlVZPOai4T5nH0BR5WbM5aWsh2wgTeuu0oj607XHrCclbELylKHAWbQZ96wFSuRvt1IS6HLYhHAqxxOXB" 
                alt="Manos Caficultores de Sucre"
                className="w-full h-full object-cover grayscale hover:grayscale-0 filter saturate-110 contrast-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 right-3 bg-brand-dark/60 backdrop-blur-sm text-white font-mono text-[9px] uppercase px-2 py-0.5 font-bold tracking-widest leading-none">
                Hacienda Turimiquire, Sucre
              </span>
            </div>

            {/* Right Story block */}
            <div className="order-1 md:order-2 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
                Nuestra Tradición
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark leading-tight whitespace-normal">
                Born in the<br />Oriente Venezolano
              </h2>
              <p className="font-sans text-base text-brand-gray leading-relaxed">
                GUAIQUERÍ was founded to honor the fierce, untamed spirit of the indigenous Guaquerí warriors of eastern Venezuela and the rich volcanic mountain soil of our highlands.
              </p>
              <p className="font-sans text-xs text-brand-gray/80 leading-relaxed">
                Our artisanal journey began in the mist-covered peaks of Sucre and the lush lime soils of Caripe, Monagas, where the Caribbean breeze sweeps across the Andean foothills. We don't just roast and distribute coffee; we compile a legacy, certifying that every individual sip carries the sovereign identity, aroma, and pride of its true origin.
              </p>
              
              <button 
                onClick={() => setIsManifestoOpen(true)}
                className="font-sans text-xs font-bold text-brand-dark tracking-widest uppercase border-b-2 border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5"
              >
                Read the Manifesto
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Footer Layout */}
      <footer className="bg-brand-surface-highest border-t border-brand-outline/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-16 max-w-7xl mx-auto select-none">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="font-serif text-2xl font-bold tracking-tight text-brand-dark">
              GUAIQUERÍ CAFÉ
            </div>
            <p className="font-sans text-xs text-brand-gray max-w-sm leading-relaxed">
              The pinnacle of Venezuelan specialty coffee. Direct from the mist-covered mountains to your artisanal cup, verified on-chain, and roasted with ancestral heritage.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 border border-brand-outline/20 hover:border-brand-gold text-brand-gray hover:text-brand-gold bg-brand-cream transition-colors rounded-sm" title="Website Node">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 border border-brand-outline/20 hover:border-brand-gold text-brand-gray hover:text-brand-gold bg-brand-cream transition-colors rounded-sm" title="Compartir Nodo">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="mailto:Wilfredy7@gmail.com" className="p-2 border border-brand-outline/20 hover:border-brand-gold text-brand-gray hover:text-brand-gold bg-brand-cream transition-colors rounded-sm" title="Contact Us">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-brand-dark">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-gray font-sans">
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors block">Políticas de Privacidad</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors block">Envíos Asegurados & Retornos</a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-gold transition-colors block">Venta al Mayor y Alianzas</a>
              </li>
              <li className="pt-2">
                <a href="#club" className="font-bold text-brand-dark hover:text-brand-gold transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                  Blockchain Verification Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-brand-dark border-brand-gold">
              Verification State
            </h4>
            <div className="p-4 border border-brand-outline/2 border-dashed bg-brand-cream inline-block select-all">
              <p className="font-mono text-[9px] text-brand-gold font-bold mb-1.5 uppercase">MINTED REGISTRY ACTIVE</p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-brand-dark text-[36px]">qr_code_2</span>
                <div className="font-mono text-[10px]">
                  <p className="font-bold text-brand-dark">GQR-2024-V3</p>
                  <p className="text-[9px] opacity-60 leading-none mt-0.5 uppercase">Trusted nodes active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outer bottom strip */}
        <div className="border-t border-brand-outline/10 py-6 px-6 bg-brand-surface-highest select-none">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-brand-gray uppercase tracking-wider font-semibold">
            <p>© 2026 GUAIQUERÍ CAFÉ. VENEZUELAN HERITAGE ROASTERS. ALL RIGHTS RESERVED.</p>
            <p className="text-brand-gold flex items-center gap-1">
              Elevating the Oriente
            </p>
          </div>
        </div>
      </footer>

      {/* 8. Sliding Drawers and Overlays */}
      <ShoppingCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        onAddBlockchainReceipt={handleAddBlockchainReceipt}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product: CoffeeItem) => {
          // Direct custom trigger
          alert(`Explorando micro-lote: ${product.name}. Abriendo panel detallado.`);
        }}
      />

      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail="Wilfredy7@gmail.com"
      />

      {/* Poetic Golden Manifesto overlay drawer */}
      <AnimatePresence>
        {isManifestoOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 select-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManifestoOpen(false)}
              className="absolute inset-0 bg-brand-dark/70 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-brand-cream border border-brand-gold/20 p-8 md:p-12 z-10 text-center space-y-8 shadow-2xl"
            >
              <h3 className="font-serif text-3xl font-bold uppercase tracking-widest text-brand-gold">
                EL MANIFIESTO GUAIQUERÍ
              </h3>
              
              <div className="h-[1px] bg-brand-gold/30 max-w-[140px] mx-auto" />

              <div className="space-y-5 text-sm md:text-base font-serif italic text-brand-dark leading-relaxed max-h-[300px] overflow-y-auto pr-3">
                <p>
                  "No solo tostamos café; resguardamos la memoria líquida del Oriente de Venezuela. Cada grano cultivado en las cumbres volcánicas de Caripe y el macizo del Turimiquire absorbe la bravura y orgullo de nuestros ancestros."
                </p>
                <p>
                  "Consagrados por el viento del Mar Caribe, nuestros caficultores dedican su vida a cosechar el micro-lote perfecto. Por medio de un consenso tecnológico descentralizado, protegemos y legitimamos que cada centavo sea devuelto de forma justa y directa a la manos que labran la tierra."
                </p>
                <p>
                  "Al servir esta taza, usted no solo degusta notas florales y cacao criollo; usted firma un compromiso solemne de mantener viva la soberanía, el territorio y el místico aroma venezolano."
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsManifestoOpen(false)}
                  className="bg-brand-dark hover:bg-brand-gold text-brand-cream px-8 py-3 font-sans text-xs tracking-widest uppercase font-bold transition-all cursor-pointer"
                >
                  Entendido y Consagrado
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
