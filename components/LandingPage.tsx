
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, BrainCircuit, ShieldCheck, 
  TrendingUp, Building2, Lock, GraduationCap,
  Globe, Zap, X, Network, CheckCircle2, AlertCircle, ShieldAlert,
  HelpCircle, TrendingDown
} from 'lucide-react';
import { Button, LogoWithText, Badge, Modal, Card } from './UI';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onEnterStudent: () => void;
  onEnterAdmin: () => void;
}

// --- HERO BACKGROUND GRAPH ---
const HeroBackgroundGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Float animations for nodes
      gsap.to('.hero-node', {
        y: (i) => (i % 2 === 0 ? -15 : 15),
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // 2. Entrance animation
      gsap.from('.hero-node', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.2
      });
      
      // 3. Subtle pulse for the highlight
      gsap.to('.hero-glow', {
          opacity: 0.7,
          scale: 1.1,
          duration: 5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
       {/* Background Dot Grid Pattern */}
       <div className="absolute inset-0 w-full h-full opacity-[0.5]"
            style={{ 
                backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)', 
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black 40%, transparent 100%)'
            }}
       ></div>
       
       {/* Central Subtle Highlight Blob */}
       <div className="hero-glow absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-blue-200/40 via-indigo-100/20 to-transparent blur-[90px] rounded-full mix-blend-multiply"></div>

       {/* Floating Glass Nodes - Repositioned strictly to periphery */}
       
       {/* Node 1: Privileged Access (Top Left) */}
       <div className="hero-node absolute top-[15%] left-[3%] glass-skeuo p-3 pr-6 flex items-center space-x-3 shadow-lg z-10">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
             <GraduationCap size={20} />
          </div>
          <span className="text-sm font-semibold text-[#1D1D1F]">Privileged Access</span>
       </div>

       {/* Node 2: Under-resourced (Bottom Left) */}
       <div className="hero-node absolute bottom-[15%] left-[3%] glass-skeuo p-3 pr-6 flex items-center space-x-3 shadow-lg z-10">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 shadow-inner">
             <X size={20} />
          </div>
          <span className="text-sm font-semibold text-[#1D1D1F] decoration-red-300/50 line-through decoration-2">Under-resourced</span>
       </div>

       {/* Node 3: AI Ready (Top Right) */}
       <div className="hero-node absolute top-[18%] right-[3%] glass-skeuo p-3 pr-6 flex items-center space-x-4 shadow-xl shadow-blue-500/10 scale-90 md:scale-100 z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#0071E3] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
             <Network size={24} />
          </div>
          <div>
            <span className="text-base font-bold text-[#1D1D1F] block">AI Ready</span>
            <span className="text-[10px] text-[#86868B] font-medium uppercase tracking-wider">Unified Cluster</span>
          </div>
       </div>

       {/* Node 4: Skill Gap (Bottom Right) */}
       <div className="hero-node absolute bottom-[28%] right-[3%] glass-skeuo p-3 pr-6 flex items-center space-x-3 shadow-md opacity-90 z-10">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
             <ShieldAlert size={16} />
          </div>
          <span className="text-xs font-semibold text-[#1D1D1F]">Skill Gap</span>
       </div>
    </div>
  );
};

// --- EQUALIZER VISUALIZATION COMPONENT (Kept for Campus Section) ---
const EqualizerGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const points = [
    { id: 'state', label: 'State Univ', x: 15, y: 65 },
    { id: 'mit', label: 'MIT', x: 32, y: 35 },
    { id: 'comm', label: 'Comm. College', x: 50, y: 75 },
    { id: 'stanford', label: 'Stanford', x: 68, y: 20 },
    { id: 'rural', label: 'Rural HEI', x: 85, y: 55 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      const path = svgRef.current?.querySelector('.graph-path');
      if (path instanceof SVGPathElement) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
          });
      }
      gsap.fromTo('.graph-node', 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.3, ease: "back.out(1.7)", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getX = (val: number) => (val / 100) * 800;
  const getY = (val: number) => (val / 100) * 500;
  
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${getX(p.x)} ${getY(p.y)}` : `${acc} L ${getX(p.x)} ${getY(p.y)}`;
  }, "");

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px] relative bg-[#DCE2E8]/60 rounded-3xl overflow-hidden shadow-inner border border-white/50 backdrop-blur-sm">
        <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 max-w-[240px]">
            <div className="flex items-center space-x-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3FDB8D]"></span>
                </span>
                <span className="text-[10px] font-bold text-[#86868B] tracking-wider uppercase">Live Metrics</span>
            </div>
            <div className="text-3xl font-bold text-[#1D1D1F] mb-1">38%</div>
            <div className="text-xs text-[#86868B] leading-snug">Reduction in Confidence Gap across partner institutions.</div>
        </div>
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5"/>
                </pattern>
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            <path className="graph-path" d={pathD} fill="none" stroke="#8AB4F8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {points.map((p) => (
                <g key={p.id} className="graph-node">
                    <circle cx={getX(p.x)} cy={getY(p.y)} r="14" fill="white" fillOpacity="0.3" filter="url(#node-glow)" />
                    <circle cx={getX(p.x)} cy={getY(p.y)} r="14" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                    <circle cx={getX(p.x)} cy={getY(p.y)} r="6" fill="#4285F4" stroke="white" strokeWidth="2" />
                </g>
            ))}
        </svg>
        {points.map((p) => (
            <div key={p.id} className="absolute transform -translate-x-1/2 px-3 py-1.5 bg-white rounded-full shadow-lg border border-white/60 pointer-events-none" style={{ left: `${p.x}%`, top: `calc(${p.y}% + 24px)` }}>
                <span className="text-[10px] font-bold text-[#1D1D1F] tracking-wide whitespace-nowrap">{p.label.toUpperCase()}</span>
            </div>
        ))}
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterStudent, onEnterAdmin }) => {
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <div className="relative min-h-screen text-[#1D1D1F] overflow-hidden bg-[#F5F5F7]">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300">
        <div className="glass-skeuo max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <LogoWithText size="sm" lightMode={true} />
          <div className="flex space-x-3">
             <Button variant="ghost" onClick={() => setShowAdminModal(true)} className="text-xs font-medium">Faculty Access</Button>
            <Button onClick={onEnterStudent} variant="primary" size="sm" className="shadow-lg shadow-[#0071E3]/20">Student Portal</Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Graphic Layer */}
        <HeroBackgroundGraph />

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-10 z-10 relative">
            
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 shadow-sm backdrop-blur-sm">
                <span className="text-[10px] font-bold text-[#0071E3] uppercase tracking-widest">Institutional AI Infrastructure</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] text-[#1D1D1F]">
                AI is rewriting <br/>
                higher education.
                <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#42A5F5]">Equity must keep up.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-[#86868B] max-w-3xl font-light leading-relaxed text-balance mx-auto">
                EARE equips every student — regardless of background — with the AI literacy, and readiness needed to thrive in an AI-driven world.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 pt-8 w-full">
                <Button onClick={onEnterStudent} variant="primary" size="lg" className="w-full sm:w-auto px-12 h-16 text-lg rounded-full shadow-xl shadow-[#0071E3]/30">
                    Explore the Ecosystem
                </Button>
                <Button 
                    variant="glass" 
                    size="lg"
                    onClick={() => document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-12 h-16 text-[#1D1D1F] text-lg rounded-full bg-white/60 hover:bg-white/80"
                >
                    View Research
                </Button>
            </div>
        </div>
      </section>

      {/* NEW SECTION: STRUCTURAL BARRIER */}
      <section className="py-24 px-6 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Headings (Span 4) */}
            <div className="lg:col-span-4">
                <span className="text-xs font-bold text-[#0071E3] tracking-widest uppercase mb-4 block">The Structural Barrier</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-6 leading-[1.1]">
                Inequality is no longer just digital. <br/>
                It's algorithmic.
                </h2>
                <p className="text-lg text-[#86868B] leading-relaxed">
                Without intervention, AI adoption will widen the gap between well-resourced students and the rest of the academic population.
                </p>
            </div>

            {/* Right Column: 3 Items (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Item 1 */}
                <div className="space-y-4 group cursor-default">
                    <div className="flex justify-between items-start border-t border-zinc-200 pt-4 transition-colors group-hover:border-[#0071E3]">
                        <span className="text-lg font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]">01</span>
                        <Lock className="text-[#86868B]/40 transition-colors group-hover:text-[#0071E3]" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]">Socioeconomic Access Gap</h3>
                    <p className="text-sm text-[#86868B] leading-relaxed">
                        Premium AI models cost $20-30/month. For many students, this paywall creates a definitive advantage for those who can pay, leaving others with inferior tools.
                    </p>
                </div>

                {/* Item 2 */}
                <div className="space-y-4 group cursor-default">
                    <div className="flex justify-between items-start border-t border-zinc-200 pt-4 transition-colors group-hover:border-[#0071E3]">
                        <span className="text-lg font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]">02</span>
                        <HelpCircle className="text-[#86868B]/40 transition-colors group-hover:text-[#0071E3]" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]">AI Literacy Confidence Gap</h3>
                    <p className="text-sm text-[#86868B] leading-relaxed">
                        Access isn't enough. Students without guidance lack the framework to prompt effectively, verify hallucinations, or understand ethical boundaries.
                    </p>
                </div>

                {/* Item 3 */}
                <div className="space-y-4 group cursor-default">
                    <div className="flex justify-between items-start border-t border-zinc-200 pt-4 transition-colors group-hover:border-[#0071E3]">
                        <span className="text-lg font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]">03</span>
                        <TrendingDown className="text-[#86868B]/40 transition-colors group-hover:text-[#0071E3]" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] transition-colors group-hover:text-[#0071E3]">Skills Atrophy & Anxiety</h3>
                    <p className="text-sm text-[#86868B] leading-relaxed">
                        As entry-level roles are automated, students feel unprepared. The traditional curriculum has not yet adapted to the 'human-in-the-loop' skillset required.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* FEATURE BENTO GRID */}
      <section id="bento" className="py-24 px-6 relative bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#1D1D1F]">The Equalizer Architecture</h2>
                <p className="text-xl text-[#86868B] leading-relaxed">
                    We don't just provide access; we build capability. Our four-pillar approach ensures no student is left behind in the AI revolution.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Large Card 1 */}
                <Card className="md:col-span-2 min-h-[320px] flex flex-col justify-between group cursor-pointer relative overflow-hidden bg-[#F5F5F7] border-white/50">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                        <Globe size={240} className="text-[#0071E3]" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-[#0071E3] flex items-center justify-center mb-6 shadow-lg shadow-[#0071E3]/20 text-white">
                            <BrainCircuit size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[#1D1D1F]">Democratized Compute</h3>
                        <p className="text-[#86868B] text-lg max-w-md">
                            A cloud-native gateway that gives students on ₹5,000 smartphones the same reasoning power as those on high-end MacBooks.
                        </p>
                    </div>
                    <div className="relative z-10 mt-8 flex items-center text-[#0071E3] font-semibold group-hover:translate-x-2 transition-transform text-sm">
                        View Technical Specs <ArrowRight size={16} className="ml-2" />
                    </div>
                </Card>

                {/* Tall Card 2 */}
                <Card className="md:row-span-2 flex flex-col justify-between group cursor-pointer bg-white border-zinc-100 shadow-xl shadow-zinc-200/50">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-[#3FDB8D] flex items-center justify-center mb-6 shadow-lg shadow-[#3FDB8D]/20 text-white">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[#1D1D1F]">Verification Engine</h3>
                        <p className="text-[#86868B] leading-relaxed">
                            Deepfake detection and hallucination checkers integrated directly into the study workflow. We teach trust through verification.
                        </p>
                    </div>
                    <div className="mt-8 p-4 bg-[#F5F5F7] rounded-xl border border-zinc-200">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Threat Blocked</span>
                        </div>
                        <div className="text-sm font-mono text-[#1D1D1F] opacity-60">"Write a script to bypass..."</div>
                        <div className="text-xs text-red-500 mt-2 font-semibold flex items-center"><Lock size={10} className="mr-1"/> Action Denied</div>
                    </div>
                </Card>

                {/* Card 3 */}
                <Card className="flex flex-col justify-between group cursor-pointer bg-[#F5F5F7]">
                    <div>
                         <div className="w-12 h-12 rounded-xl bg-[#FF9F0A] flex items-center justify-center mb-6 shadow-lg shadow-[#FF9F0A]/20 text-white">
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#1D1D1F]">Cognitive Curriculum</h3>
                        <p className="text-[#86868B] text-sm">Modules on Ethics, Prompting, and Bias designed for the Indian context.</p>
                    </div>
                </Card>

                {/* Card 4 */}
                <Card className="flex flex-col justify-between group cursor-pointer bg-[#F5F5F7]">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-[#6F5AFF] flex items-center justify-center mb-6 shadow-lg shadow-[#6F5AFF]/20 text-white">
                            <TrendingUp size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#1D1D1F]">Employability Score</h3>
                        <p className="text-[#86868B] text-sm">Real-time matching of learned AI skills with market demand.</p>
                    </div>
                </Card>

            </div>
        </div>
      </section>

      {/* CAMPUS NETWORK MAP SECTION */}
      <section className="py-24 px-6 bg-[#F5F5F7] border-t border-white/50">
         <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
               <h2 className="text-3xl font-bold text-[#1D1D1F] mb-4">Live Campus Network</h2>
               <p className="text-[#86868B] text-lg">Real-time equity bridging across partner institutions.</p>
            </div>
            <EqualizerGraph />
         </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 px-6 bg-[#F5F5F7]">
         <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 p-12 md:p-20 text-center">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1D1D1F] mb-6 leading-[1.1]">
                    Prepare every student for <br className="hidden md:block" /> the <br className="hidden md:block" />
                    <span className="text-[#0071E3]">AI-powered future.</span>
                </h2>
                <p className="text-[#86868B] text-lg mb-10 max-w-2xl mx-auto">
                    Join the consortium of forward-thinking institutions closing the AI divide today.
                </p>
                <div className="flex justify-center">
                    <button 
                        onClick={() => setShowAdminModal(true)}
                        className="bg-[#1D1D1F] text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-black hover:scale-105 transition-all shadow-xl shadow-zinc-300 duration-300"
                    >
                        Bring EARE to Your Institution
                    </button>
                </div>
            </div>
            <p className="mt-12 text-[#86868B] text-xs font-medium text-center">
                &copy; 2025 EARE Initiative. Built with Gemini 3.0 Pro.
            </p>
         </div>
      </section>

      {/* ADMIN LOGIN MODAL */}
      <Modal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)}
        title="Institutional Login"
      >
        <div className="space-y-6 text-[#1D1D1F]">
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#F5F5F7] border border-zinc-200">
            <Building2 className="text-[#6F5AFF]" />
            <div>
              <p className="font-bold text-sm">Technical Institute of India</p>
              <p className="text-xs text-[#86868B]">Verified Educational Partner</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
                 <label className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1 block">Email</label>
                <input 
                type="email" 
                placeholder="admin@institute.edu.in" 
                className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-[#6F5AFF]/20 outline-none text-[#1D1D1F] placeholder:text-zinc-400 transition-all shadow-sm text-sm" 
                />
            </div>
            <div>
                 <label className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-1 block">Password</label>
                <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:ring-2 focus:ring-[#6F5AFF]/20 outline-none text-[#1D1D1F] placeholder:text-zinc-400 transition-all shadow-sm text-sm" 
                />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={() => { setShowAdminModal(false); onEnterAdmin(); }} className="w-full h-12" variant="accent">
              Access Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
