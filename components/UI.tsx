
import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';

// --- TYPOGRAPHY ---
export const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-br from-[#1D1D1F] to-[#5e5e60] ${className}`}>
    {children}
  </span>
);

// --- LOGO COMPONENT ---
export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dims = size === 'sm' ? 24 : size === 'md' ? 32 : 48;
  return (
    <div className="relative inline-block" style={{ width: dims, height: dims }}>
      {/* Equity Loop Concept */}
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="loopGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            {/* Updated to Black/Dark Grey Gradient as requested */}
            <stop stopColor="#1D1D1F" />
            <stop offset="1" stopColor="#434344" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="2" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28" stroke="url(#loopGradient)" strokeWidth="4" strokeLinecap="round" />
        <path d="M16 28C22.63 28 28 22.63 28 16C28 9.37 22.63 4 16 4" stroke="url(#loopGradient)" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
        <circle cx="16" cy="16" r="4" fill="url(#loopGradient)" />
      </svg>
    </div>
  );
};

export const LogoWithText: React.FC<{ size?: 'sm' | 'md'; lightMode?: boolean }> = ({ size = 'md', lightMode = true }) => {
  return (
    <div className="group flex items-center cursor-pointer select-none">
      <Logo size={size} />
      <div className="ml-3 flex flex-col justify-center">
            <span className={`font-bold font-['Poppins'] tracking-tight ${size === 'sm' ? 'text-base' : 'text-xl'} leading-none text-[#1D1D1F]`}>
              EARE
            </span>
            {/* Full form reveal on hover */}
            <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <span className="text-[10px] font-medium text-[#86868B] whitespace-nowrap block pt-1">
                Equitable AI Readiness Ecosystem
              </span>
            </div>
      </div>
    </div>
  );
};

// --- BUTTONS ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'accent' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center rounded-full font-medium font-['Inter'] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6F5AFF]/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const variants = {
    primary: "bg-[#1D1D1F] text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] border border-transparent hover:bg-black",
    secondary: "bg-white text-zinc-900 hover:bg-[#F5F5F7] border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
    glass: "bg-white/60 text-zinc-900 hover:bg-white/80 border border-white/40 backdrop-blur-xl shadow-sm",
    accent: "bg-gradient-to-r from-[#6F5AFF] to-[#5842f5] text-white shadow-[0_4px_14px_0_rgba(111,90,255,0.39)] hover:shadow-[0_6px_20px_rgba(111,90,255,0.23)] border border-transparent",
    premium: "glass-skeuo text-[#1D1D1F]"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};

// --- CARDS ---

export const Card: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean; glass?: boolean }> = ({ children, className = '', noPadding = false, glass = true }) => (
  <div className={`${glass ? 'glass-skeuo' : 'rounded-3xl shadow-2xl'} ${noPadding ? '' : 'p-8'} ${className}`}>
    {children}
  </div>
);

// Alias for backwards compatibility if needed, but simplified to Card
export const GlassCard = Card;

export const Badge: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({ 
  children, 
  color = 'bg-zinc-100 text-zinc-800',
  className = ''
}) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide font-['Inter'] shadow-sm border border-black/5 ${color} ${className}`}>
    {children}
  </span>
);

export const ProgressBar: React.FC<{ progress: number; colorClass?: string; trackColorClass?: string }> = ({ progress, colorClass = "bg-[#6F5AFF]", trackColorClass = "bg-zinc-100" }) => (
  <div className={`h-2 w-full ${trackColorClass} rounded-full overflow-hidden shadow-inner`}>
    <div 
      className={`h-full ${colorClass} transition-all duration-1000 ease-out`} 
      style={{ width: `${progress}%` }}
    />
  </div>
);

// --- MODAL ---
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="glass-skeuo w-full max-w-lg p-8 animate-in fade-in zoom-in-95 duration-300 relative z-10">
        <div className="flex justify-between items-center mb-6 border-b border-black/5 pb-4">
          <h2 className="text-xl font-bold font-['Poppins'] text-[#1D1D1F]">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} className="text-zinc-400 hover:text-zinc-600" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- FLIP CARD ---
export const FlipCard: React.FC<{ front: string; back: string }> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="w-full h-48 cursor-pointer perspective-1000"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full glass-skeuo flex items-center justify-center p-6 backface-hidden">
           <p className="text-center font-bold text-lg">{front}</p>
           <p className="absolute bottom-4 text-xs text-zinc-400 uppercase tracking-widest">Click to Flip</p>
        </div>
        <div className="absolute w-full h-full glass-skeuo bg-white flex items-center justify-center p-6 backface-hidden rotate-y-180 border-l-4 border-[#6F5AFF]">
           <p className="text-center text-sm">{back}</p>
        </div>
      </div>
    </div>
  );
};
