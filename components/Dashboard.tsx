
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  LogOut, 
  Wifi, 
  Send,
  BrainCircuit,
  Menu,
  FileText,
  ListTree,
  RotateCcw,
  Mic2,
  Users,
  AlertTriangle,
  Laptop,
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronLeft,
  Search,
  Filter,
  MoreVertical,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar, LogoWithText, FlipCard } from './UI';
import { sendMessageToGemini, generateToolResponse } from '../services/gemini';
import { UserProfile, ChatMessage, LearningModule, GeminiMode, StudyToolType, Flashcard } from '../types';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

// --- MOCK DATA ---
const MOCK_USER: UserProfile = {
  name: "Aarav Patel",
  institution: "Technical Institute of India",
  role: "student",
  accessLevel: "premium",
  literacyScore: {
    total: 82,
    ethics: 90,
    verification: 75,
    prompting: 65,
    analysis: 88
  },
  deviceStatus: 'Active'
};

const ETHICS_BOOK_CONTENT = `
# AI Ethics & Bias: The Complete Guide for Indian Technologists

**Course ID:** ETH-101  
**Version:** 3.0 (2025 Edition)  
**Curriculum Partner:** EARE Institute

---

# Table of Contents
1. [Introduction: The Invisible Algorithm](#intro)
2. [Chapter 1: Understanding Algorithmic Fairness](#chap1)
3. [Chapter 2: The Indian Context - Language & Diversity](#chap2)
4. [Chapter 3: Case Study - Digital Lending](#chap3)
5. [Chapter 4: Mitigating Representation Bias](#chap4)
6. [Chapter 5: Regulatory Landscape in India](#chap5)
7. [Chapter 6: Practical Frameworks for Developers](#chap6)
8. [Conclusion: Your Responsibility](#conc)

---

<a name="intro"></a>
## Introduction: The Invisible Algorithm

In the modern world, Artificial Intelligence is not just a tool; it is an infrastructure. Just as roads and electricity defined the 20th century, algorithms define the 21st. However, unlike physical infrastructure, digital infrastructure is often invisible.

When you apply for a job, scroll through social media, or request a loan, an algorithm is likely making a decision about you. But who designed that algorithm? What data was it trained on? And most importantly, does it treat everyone fairly?

This course is designed to take you from a passive consumer of AI to an active, critical evaluator of automated systems.

> **"Technology is neither good nor bad; nor is it neutral."** — Melvin Kranzberg

---

<a name="chap1"></a>
## Chapter 1: Understanding Algorithmic Fairness

### 1.1 What is Bias?
In statistics, bias refers to the difference between an estimator's expected value and the true value of the parameter being estimated. In AI ethics, bias refers to **systematic and unfair discrimination** against certain individuals or groups of individuals in favor of others.

### 1.2 Types of Bias in AI
1.  **Historical Bias**: The data reflects the state of the world, which may already be unjust. For example, if past hiring decisions favored men, an AI trained on that data will also favor men.
2.  **Representation Bias**: This happens when the training data does not accurately represent the population. If a dataset of faces is 90% light-skinned, the model will perform poorly on dark-skinned faces.
3.  **Measurement Bias**: This occurs when we choose the wrong features to measure a concept. For instance, using "arrest rates" as a proxy for "crime rates" is biased because marginalized communities are often policed more heavily.

---

<a name="chap2"></a>
## Chapter 2: The Indian Context - Language & Diversity

India is a linguistic continent. We have 22 official languages and thousands of dialects. Yet, most Large Language Models (LLMs) are trained primarily on English data from the West.

### 2.1 The "Token" Problem
LLMs process text by breaking it down into "tokens". Hindi, Tamil, and Bengali text often requires more tokens to express the same concept as English, simply because the tokenizers are optimized for English. This means:
*   **Higher Cost**: It costs more to process Indian languages.
*   **Lower Performance**: Models often hallucinate or fail to grasp cultural nuances.

### 2.2 Cultural Alignment
Does an AI understand the difference between *Tu*, *Tum*, and *Aap* in Hindi? Politeness markers are crucial in Indian culture. An AI that translates a respectful request into a casual command can cause social friction.

---

<a name="chap3"></a>
## Chapter 3: Case Study - Digital Lending

Fintech in India is booming. Unified Payments Interface (UPI) has revolutionized transactions. However, AI-driven lending brings risks.

### The Scenario
Consider an AI system used by a Neobank to approve micro-loans for rural farmers.
*   **The Input**: Historical repayment data, pincode, phone usage patterns.
*   **The Logic**: The AI notices that farmers in drought-prone districts often default.
*   **The Outcome**: It systematically denies loans to anyone from those pincodes, regardless of their individual irrigation setup or credit history.

### The Impact
This creates a **Feedback Loop**.
1.  Farmers are denied loans.
2.  They cannot invest in better crops.
3.  They remain poor.
4.  The data confirms they are "high risk".

**Ethical Question:** Is it fair to judge an individual based on the aggregate statistics of their neighbors?

---

<a name="chap4"></a>
## Chapter 4: Mitigating Representation Bias

How do we fix this? It requires intentional engineering.

### 4.1 Data Augmentation
We must actively collect data from underrepresented groups. In the Indian context, this means:
*   Voice data from rural districts.
*   Handwritten text in regional scripts.
*   Images of Indian streets, clothing, and faces.

### 4.2 Adversarial Testing
Don't just test your model on a standard validation set. Attack it.
*   Try to trick the model into generating hate speech.
*   Swap names in a resume (e.g., "Rahul" vs "Robert") and see if the hiring score changes.

### 4.3 Explainable AI (XAI)
We need models that can explain *why* they made a decision. A "black box" that denies a loan is unacceptable. An XAI system should say: *"Loan denied because debt-to-income ratio is too high,"* allowing the user to understand and improve.

---

<a name="chap5"></a>
## Chapter 5: Regulatory Landscape in India

India is rapidly evolving its digital governance framework.

*   **DPDP Act (Digital Personal Data Protection Act, 2023)**: Focuses on user consent and data handling. It mandates that Data Fiduciaries (companies collecting data) must ensure accuracy and completeness.
*   **NITI Aayog's National Strategy for AI**: Emphasizes "#AIforAll", focusing on healthcare, agriculture, and education while ensuring privacy and security.

As a future technologist, compliance is not optional. You must design systems that respect user privacy by default (Privacy by Design).

---

<a name="chap6"></a>
## Chapter 6: Practical Frameworks for Developers

When you build a project, use the **E.T.H.I.C.S.** checklist:

*   **E**xamine your Data: Is it representative?
*   **T**est for Disparate Impact: Does the model fail more for one group?
*   **H**uman in the Loop: For high-stakes decisions (health, finance), always have a human review.
*   **I**dentify Risks: What is the worst-case scenario?
*   **C**onsent: Did the users agree to this data usage?
*   **S**ustainability: Is the model computationally efficient?

---

<a name="conc"></a>
## Conclusion: Your Responsibility

You are the architects of the future. The code you write today will define the opportunities available to millions of Indians tomorrow.

Bias is not a bug that can be fixed with a software patch; it is a reflection of society. To build fair AI, you must understand not just Python and PyTorch, but also sociology and history.

**Assignment:**
Go to the "Study Tools" section and use the *Fact Checker* mode to analyze a news article about a recent AI launch. Identify who benefits and who might be left behind.
`;

const MOCK_MODULES: LearningModule[] = [
  { 
    id: '1', 
    title: 'AI Ethics & Bias', 
    description: 'Understanding algorithmic fairness in Indian contexts.', 
    progress: 100, 
    category: 'Ethics', 
    icon: '⚖️', 
    status: 'completed',
    content: ETHICS_BOOK_CONTENT
  },
  { 
    id: '2', 
    title: 'Prompt Engineering', 
    description: 'Effective communication with LLMs.', 
    progress: 65, 
    category: 'Technical', 
    icon: '⌨️', 
    status: 'active',
    content: `
# Master Class: Prompt Engineering

**Duration:** 60 Minutes  
**Difficulty:** Intermediate

## 1. The Anatomy of a Perfect Prompt
A Large Language Model (LLM) is like a very smart intern. It needs clear instructions to succeed.

### The C.R.E.A.T.E Framework
* **C**ontext: "You are a senior Java developer..."
* **R**ole: "Act as a mentor..."
* **E**xplicit Constraints: "Use only standard libraries, no external dependencies."
* **A**udience: "Explain this to a first-year student."
* **T**ask: "Write a function to sort this array."
* **E**xample: "Output should look like this JSON..."

---

## 2. Chain-of-Thought Prompting
Instead of asking for the answer, ask for the *reasoning*.
* **Bad:** "Is this news real?"
* **Good:** "Analyze this article step-by-step. First check the source credibility. Then cross-reference the dates. Finally, give a verdict."

## 3. Zero-Shot vs Few-Shot
* **Zero-Shot:** Giving no examples.
* **Few-Shot:** Giving 2-3 examples of input/output pairs to guide the style.

*Exercise: Try rewriting a vague email request into a structured prompt using the framework above.*
    `
  },
  { id: '3', title: 'Deepfake Detection', description: 'Verifying digital media sources.', progress: 30, category: 'Safety', icon: '🕵️', status: 'active', content: '# Content Coming Soon' },
  { id: '4', title: 'AI in Workplace', description: 'Future-proofing your career.', progress: 0, category: 'Employability', icon: '💼', status: 'locked', content: '# Content Coming Soon' },
  { id: '5', title: 'Algorithmic Fairness', description: 'Detecting hidden bias in datasets.', progress: 0, category: 'Ethics', icon: '🔍', status: 'locked', content: '# Content Coming Soon' },
  { id: '6', title: 'Safety & Compliance', description: 'Data privacy laws and IP protection.', progress: 0, category: 'Safety', icon: '🛡️', status: 'locked', content: '# Content Coming Soon' },
];

const LITERACY_DATA = [
  { subject: 'Ethics', A: 90, fullMark: 100 },
  { subject: 'Verify', A: 75, fullMark: 100 },
  { subject: 'Prompt', A: 65, fullMark: 100 },
  { subject: 'Analysis', A: 88, fullMark: 100 },
  { subject: 'Safety', A: 80, fullMark: 100 },
];

// --- SUB-COMPONENTS ---

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-[#0F0F15] text-white shadow-lg' : 'text-[#0F0F15]/60 hover:bg-white/50 hover:text-[#0F0F15]'}`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

// --- GEMINI CHAT COMPONENT ---
const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: "Namaste Aarav. I am your EARE Thinking Partner. I'm powered by Gemini 3.0 Pro. Select a mode below to begin.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<GeminiMode>(GeminiMode.MENTOR);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    
    // Optimistic UI update
    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await sendMessageToGemini(history, userMsg.text, mode);
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: response, mode, timestamp: Date.now() }]);
    setIsThinking(false);
  };

  return (
    <Card className="h-[650px] flex flex-col p-0 overflow-hidden shadow-2xl shadow-[#6F5AFF]/10 border-white/50" noPadding>
      {/* Header with Mode Switcher */}
      <div className="p-4 border-b border-white/30 bg-white/40 backdrop-blur-md flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6F5AFF] to-[#3A3F92] rounded-full flex items-center justify-center shadow-lg shadow-[#6F5AFF]/30">
              <BrainCircuit className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0F0F15] flex items-center">
                Gemini 3.0 Thinking Partner
                <span className="ml-2 text-[10px] bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                   Thinking Enabled
                </span>
              </h3>
              <p className="text-xs text-[#0F0F15]/60">Connected • {mode.replace('_', ' ')} Mode</p>
            </div>
          </div>
          <Badge color="bg-[#3FDB8D]/20 text-[#3FDB8D] border border-[#3FDB8D]/30">Online</Badge>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {Object.values(GeminiMode).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${mode === m ? 'bg-[#0F0F15] text-white shadow-md' : 'bg-white/50 text-[#0F0F15]/70 hover:bg-white'}`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-3xl px-6 py-4 text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#0F0F15] text-white rounded-br-none' 
                : 'bg-white border border-white/50 text-[#0F0F15] rounded-bl-none'
            }`}>
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white/80 border border-[#6F5AFF]/20 rounded-2xl px-6 py-4 shadow-lg flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                 <div className="relative">
                    <div className="w-2 h-2 bg-[#6F5AFF] rounded-full animate-ping absolute top-0 left-0 opacity-75"></div>
                    <div className="w-2 h-2 bg-[#6F5AFF] rounded-full relative"></div>
                 </div>
                 <span className="text-xs text-[#6F5AFF] font-bold uppercase tracking-wider">Processing Thoughts</span>
              </div>
              <p className="text-xs text-[#0F0F15]/60 pl-5">Generating chain-of-thought analysis...</p>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/60 border-t border-white/30 backdrop-blur-md">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask in ${mode.toLowerCase().replace('_', ' ')} mode... (Hinglish supported)`}
            className="w-full pl-6 pr-14 py-4 bg-white border border-white/50 rounded-full focus:ring-2 focus:ring-[#6F5AFF]/20 outline-none transition-all shadow-sm text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#0F0F15] text-white rounded-full hover:bg-[#272730] disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

// --- STUDY TOOLS COMPONENT ---
const StudyToolsSuite: React.FC = () => {
  const [activeTool, setActiveTool] = useState<StudyToolType | null>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);

  const tools = [
    { id: StudyToolType.SUMMARIZER, name: 'Smart Summarizer', icon: <FileText size={24} />, desc: 'Concept extraction & bias check', color: 'text-blue-600 bg-blue-50' },
    { id: StudyToolType.STRUCTURE_BUILDER, name: 'Structure Builder', icon: <ListTree size={24} />, desc: 'Essay outlines & logic flow', color: 'text-purple-600 bg-purple-50' },
    { id: StudyToolType.REVISION_GENERATOR, name: 'Revision Generator', icon: <RotateCcw size={24} />, desc: 'Flashcards & Quizzes', color: 'text-pink-600 bg-pink-50' },
    { id: StudyToolType.PRESENTATION_COACH, name: 'Presentation Coach', icon: <Mic2 size={24} />, desc: 'Script critique & delivery tips', color: 'text-orange-600 bg-orange-50' },
  ];

  const handleToolRun = async () => {
    if (!activeTool || !input) return;
    setLoading(true);
    setFlashcards([]); 
    setResult(null);

    const res = await generateToolResponse(activeTool, input);
    
    if (activeTool === StudyToolType.REVISION_GENERATOR) {
        try {
            const cards = JSON.parse(res);
            if (Array.isArray(cards)) {
                setFlashcards(cards);
            } else {
                setResult(res); 
            }
        } catch (e) {
            console.error("Failed to parse flashcards", e);
            setResult(res); 
        }
    } else {
        setResult(res);
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {!activeTool ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="glass-panel p-8 rounded-3xl text-left hover:scale-[1.02] transition-transform group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${tool.color} group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{tool.name}</h3>
              <p className="text-[#0F0F15]/60">{tool.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Button variant="ghost" onClick={() => { setActiveTool(null); setResult(null); setInput(''); setFlashcards([]); }} className="mb-4 pl-0 hover:bg-transparent">
            ← Back to Tools
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="h-fit">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                {tools.find(t => t.id === activeTool)?.icon}
                <span className="ml-2">{tools.find(t => t.id === activeTool)?.name}</span>
              </h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your text, topic, or script here..."
                className="w-full h-64 p-4 rounded-xl bg-white/50 border border-white/60 focus:ring-2 focus:ring-[#6F5AFF]/20 outline-none resize-none text-sm mb-4"
              />
              <Button onClick={handleToolRun} isLoading={loading} className="w-full">
                Generate Output
              </Button>
            </Card>
            
            <div className="min-h-[400px]">
                {loading && (
                    <div className="h-full flex flex-col items-center justify-center text-[#0F0F15]/40 glass-panel">
                        <LoaderIcon />
                        <p className="mt-4">Generating...</p>
                    </div>
                )}

                {!loading && !result && flashcards.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-[#0F0F15]/40 glass-panel">
                        <BrainCircuit size={48} className="mx-auto mb-4 opacity-20" />
                        <p>AI Output will appear here</p>
                    </div>
                )}

                {!loading && flashcards.length > 0 && (
                    <div className="grid grid-cols-1 gap-6">
                         <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold">Your Revision Deck</h4>
                            <Badge color="bg-[#6F5AFF]/20 text-[#6F5AFF]">{flashcards.length} Cards</Badge>
                         </div>
                         <div className="grid grid-cols-1 gap-4">
                            {flashcards.map((card, i) => (
                                <FlipCard key={i} front={card.front} back={card.back} />
                            ))}
                         </div>
                    </div>
                )}

                {!loading && result && (
                    <Card className="h-full">
                        <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                    </Card>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoaderIcon = () => (
    <svg className="animate-spin h-8 w-8 text-[#6F5AFF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
)

// --- ADMIN SUB-COMPONENTS ---

const StudentRegistry: React.FC = () => (
  <Card className="animate-in fade-in">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-lg">Student Registry</h3>
      <div className="flex space-x-2">
        <div className="relative">
          <input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 bg-white/50 border border-white/60 rounded-lg text-sm focus:ring-1 focus:ring-[#6F5AFF]" />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F0F15]/40" />
        </div>
        <Button variant="secondary" size="sm"><Filter size={14} className="mr-2"/> Filter</Button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#0F0F15]/5 text-[#0F0F15]/60">
          <tr>
            <th className="px-4 py-3 text-left rounded-l-lg">Name</th>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Dept</th>
            <th className="px-4 py-3 text-left">Literacy Score</th>
            <th className="px-4 py-3 text-left">Access Level</th>
            <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#0F0F15]/5">
          {[
            { name: "Priya Singh", id: "CS-24-001", dept: "CompSci", score: 88, level: "Premium" },
            { name: "Rahul Verma", id: "ME-24-042", dept: "MechEng", score: 62, level: "Basic" },
            { name: "Ananya Gupta", id: "EE-24-112", dept: "ElecEng", score: 91, level: "Premium" },
            { name: "Vikram Das", id: "CV-24-089", dept: "CivilEng", score: 45, level: "Basic" },
            { name: "Sneha Reddy", id: "CS-24-022", dept: "CompSci", score: 78, level: "Premium" }
          ].map((student, i) => (
            <tr key={i} className="hover:bg-white/40 transition-colors">
              <td className="px-4 py-3 font-medium">{student.name}</td>
              <td className="px-4 py-3 text-[#0F0F15]/60">{student.id}</td>
              <td className="px-4 py-3">{student.dept}</td>
              <td className="px-4 py-3">
                <span className={`inline-block w-8 text-center rounded ${student.score > 80 ? 'bg-green-100 text-green-700' : student.score < 50 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {student.score}
                </span>
              </td>
              <td className="px-4 py-3">
                 <Badge color={student.level === 'Premium' ? 'bg-[#6F5AFF]/10 text-[#6F5AFF]' : 'bg-zinc-100 text-zinc-500'}>{student.level}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="p-1 hover:bg-black/5 rounded"><MoreVertical size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const DeviceManager: React.FC = () => (
  <Card className="animate-in fade-in">
    <h3 className="font-bold text-lg mb-6">Device Loan Management</h3>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F0F15]/40 mb-3">Inventory Status</h4>
        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-white/60 rounded-xl border border-white/60">
             <p className="text-sm text-[#0F0F15]/60">Laptops Available</p>
             <p className="text-3xl font-bold">12</p>
           </div>
           <div className="p-4 bg-white/60 rounded-xl border border-white/60">
             <p className="text-sm text-[#0F0F15]/60">Tablets Available</p>
             <p className="text-3xl font-bold">45</p>
           </div>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F0F15]/40 mb-3">Quick Actions</h4>
        <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="w-full">Scan Return</Button>
            <Button size="sm" variant="primary" className="w-full">Approve Loan</Button>
        </div>
      </div>
    </div>
    
    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F0F15]/40 mt-8 mb-3">Active Loans & Requests</h4>
    <div className="space-y-3">
       {[
         { user: "Priya Singh", device: "MacBook Air M1", due: "2 Days Left", status: "Active" },
         { user: "Karan Mehta", device: "iPad Pro 11", due: "Overdue (2 days)", status: "Overdue" },
         { user: "Request #4492", device: "Windows Laptop", due: "Pending Approval", status: "Pending" },
       ].map((item, i) => (
         <div key={i} className="flex items-center justify-between p-3 bg-white/40 rounded-lg border border-white/40">
           <div className="flex items-center space-x-3">
             <div className="bg-[#0F0F15]/5 p-2 rounded-lg"><Laptop size={16} /></div>
             <div>
               <p className="text-sm font-bold">{item.user}</p>
               <p className="text-xs text-[#0F0F15]/60">{item.device}</p>
             </div>
           </div>
           <div className="text-right">
              <Badge color={item.status === 'Overdue' ? 'bg-red-100 text-red-700' : item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                {item.due}
              </Badge>
              {item.status === 'Pending' && (
                <div className="flex gap-1 mt-1 justify-end">
                    <button className="text-[10px] bg-[#0F0F15] text-white px-2 py-0.5 rounded">Approve</button>
                    <button className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded">Reject</button>
                </div>
              )}
           </div>
         </div>
       ))}
    </div>
  </Card>
);

const RiskAlerts: React.FC = () => (
  <Card className="animate-in fade-in">
    <div className="flex items-center space-x-3 mb-6">
        <ShieldAlert className="text-red-500" />
        <h3 className="font-bold text-lg">System Risk Alerts</h3>
    </div>
    <div className="space-y-4">
        {[
            { severity: 'high', title: "Repeated Unsafe Prompting", user: "ID: ME-24-042", time: "10 mins ago", desc: "User attempted to bypass safety filters regarding chemical synthesis." },
            { severity: 'medium', title: "Potential Plagiarism", user: "ID: CS-24-001", time: "2 hours ago", desc: "Assignment submission matches 85% of generated training data." },
            { severity: 'low', title: "Login Anomaly", user: "ID: EE-24-112", time: "5 hours ago", desc: "Access detected from unusual IP range." }
        ].map((alert, i) => (
            <div key={i} className={`p-4 rounded-xl border-l-4 ${alert.severity === 'high' ? 'border-red-500 bg-red-50' : alert.severity === 'medium' ? 'border-orange-500 bg-orange-50' : 'border-yellow-500 bg-yellow-50'}`}>
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm">{alert.title}</h4>
                    <span className="text-xs opacity-60">{alert.time}</span>
                </div>
                <p className="text-xs font-mono mt-1 mb-2 opacity-70">{alert.user}</p>
                <p className="text-sm opacity-90">{alert.desc}</p>
                <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white border-none shadow-sm h-8 text-xs">Investigate</Button>
                    <Button size="sm" variant="ghost" className="h-8 text-xs">Dismiss</Button>
                </div>
            </div>
        ))}
    </div>
  </Card>
);

// --- ADMIN VIEW MANAGER ---
const AdminView: React.FC<{ tab: string }> = ({ tab }) => {
  if (tab === 'registry') return <StudentRegistry />;
  if (tab === 'devices') return <DeviceManager />;
  if (tab === 'risks') return <RiskAlerts />;
  
  // Default Overview
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex justify-between items-end mb-4">
            <div>
                <h2 className="text-2xl font-bold font-['Poppins'] text-[#0F0F15]">Institutional Overview</h2>
                <p className="text-[#0F0F15]/60 text-sm">Technical Institute of India • Semester 2, 2025</p>
            </div>
            <Button size="sm" variant="secondary"><TrendingUp size={16} className="mr-2"/> Generate Report</Button>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#0F0F15] text-white">
            <p className="text-white/60 text-sm mb-1">Institution Literacy Index</p>
            <h2 className="text-4xl font-bold !text-white">78.4</h2>
            <Badge color="bg-[#3FDB8D]/20 text-[#3FDB8D] border border-[#3FDB8D]/30 mt-3">+4.2% this month</Badge>
        </Card>
        <Card>
            <p className="text-[#0F0F15]/60 text-sm mb-1">Active Device Loans</p>
            <h2 className="text-4xl font-bold text-[#0F0F15]">1,245</h2>
            <p className="text-xs text-[#FF7A6E] mt-2">15 Overdue • Action Required</p>
        </Card>
        <Card>
            <p className="text-[#0F0F15]/60 text-sm mb-1">Modules Completed</p>
            <h2 className="text-4xl font-bold text-[#0F0F15]">15.2k</h2>
            <p className="text-xs text-[#3FDB8D] mt-2">92% Completion Rate</p>
        </Card>
        <Card>
            <p className="text-[#0F0F15]/60 text-sm mb-1">Misuse Flags</p>
            <h2 className="text-4xl font-bold text-[#FF7A6E]">3</h2>
            <p className="text-xs text-[#0F0F15]/40 mt-2">Plagiarism / Unsafe Prompting</p>
        </Card>
        </div>

        {/* Device Loan Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold flex items-center"><Wifi className="mr-2" size={20} /> Digital Equity: Loan Requests</h3>
                        <Badge color="bg-orange-100 text-orange-700">4 Pending</Badge>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Priya Singh", id: "CS-2024-001", reason: "Laptop Damaged", urgency: "High" },
                            { name: "Rahul Verma", id: "ME-2024-042", reason: "No Internet at Home", urgency: "Medium" },
                            { name: "Ananya Gupta", id: "EE-2024-112", reason: "Project Requirement", urgency: "Low" }
                        ].map((req, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/60">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                                        {req.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-[#0F0F15]">{req.name}</p>
                                        <p className="text-xs text-[#0F0F15]/60">{req.id} • {req.reason}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge color={req.urgency === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>{req.urgency}</Badge>
                                    <button className="p-2 hover:bg-green-100 rounded-full text-green-600 transition-colors"><CheckCircle size={18} /></button>
                                    <button className="p-2 hover:bg-red-100 rounded-full text-red-600 transition-colors"><XCircle size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Equity Impact Metrics */}
            <Card>
                <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Equity Impact Metrics</h3>
                </div>
                <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span>Rural Access Improvement</span>
                    <span className="font-bold">94%</span>
                    </div>
                    <ProgressBar progress={94} colorClass="bg-[#3FDB8D]" />
                    <p className="text-xs text-[#0F0F15]/40 mt-1">Based on login geolocation</p>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span>Employability Match Rate</span>
                    <span className="font-bold">82%</span>
                    </div>
                    <ProgressBar progress={82} colorClass="bg-[#6F5AFF]" />
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-1">
                    <span>Hardware Utilization</span>
                    <span className="font-bold">98%</span>
                    </div>
                    <ProgressBar progress={98} colorClass="bg-[#A7B4FF]" />
                </div>
                </div>
                <div className="mt-6 pt-6 border-t border-dashed border-zinc-200">
                    <Button variant="ghost" className="w-full text-sm text-[#0F0F15]/60 justify-between">
                        View Full Compliance Report <ArrowRight size={16} />
                    </Button>
                </div>
            </Card>
        </div>
    </div>
  );
}

// --- CURRICULUM VIEWER COMPONENT ---
const ModuleViewer: React.FC<{ module: LearningModule; onBack: () => void }> = ({ module, onBack }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <Button variant="ghost" onClick={onBack} className="mb-6 pl-0 hover:bg-transparent">
        <ChevronLeft size={20} className="mr-2" /> Back to Curriculum
      </Button>

      <Card className="max-w-4xl mx-auto min-h-[80vh]">
        <div className="flex items-start justify-between mb-8 pb-8 border-b border-zinc-100">
           <div>
              <div className="flex items-center space-x-3 mb-4">
                 <span className="text-4xl">{module.icon}</span>
                 <Badge color="bg-[#6F5AFF]/20 text-[#6F5AFF]">{module.category}</Badge>
              </div>
              <h1 className="text-4xl font-bold font-['Poppins'] mb-2">{module.title}</h1>
              <p className="text-[#0F0F15]/60 text-lg">{module.description}</p>
           </div>
           <div className="text-right hidden sm:block">
              <div className="inline-block p-4 bg-zinc-50 rounded-xl">
                 <p className="text-xs font-bold text-[#0F0F15]/40 uppercase mb-1">Status</p>
                 <p className="font-bold text-[#6F5AFF]">{module.status.toUpperCase()}</p>
              </div>
           </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-['Poppins'] prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#0F0F15]/70 prose-strong:text-[#0F0F15] prose-li:text-[#0F0F15]/70">
           {module.content ? (
             <div dangerouslySetInnerHTML={{ __html: module.content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/# (.*?)(<br\/>|$)/g, '<h1>$1</h1>').replace(/## (.*?)(<br\/>|$)/g, '<h2>$1</h2>').replace(/### (.*?)(<br\/>|$)/g, '<h3>$1</h3>') }} />
           ) : (
             <div className="flex flex-col items-center justify-center py-20 opacity-50">
               <BookOpen size={64} className="mb-4" />
               <p>Content module loading or locked.</p>
             </div>
           )}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-between items-center">
            <Button variant="secondary" onClick={onBack}>Save Progress</Button>
            <Button onClick={() => alert("Module completed! +50 Literacy Points.")}>Complete Module</Button>
        </div>
      </Card>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export const Dashboard: React.FC<{ onLogout: () => void; initialAdmin?: boolean }> = ({ onLogout, initialAdmin = false }) => {
  const [activeTab, setActiveTab] = useState(initialAdmin ? 'overview' : 'overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(initialAdmin);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  // Reset module selection when changing tabs
  useEffect(() => {
    setSelectedModule(null);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[var(--color-mist-grey)] flex overflow-hidden font-['Inter']">
      {/* Sidebar - Updated with stronger glass effect */}
      <aside className={`fixed md:sticky top-0 h-screen w-72 bg-white/70 backdrop-blur-xl border-r border-white/40 z-50 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col justify-between rounded-none border-t-0 border-b-0 border-l-0`}>
        <div className="p-6">
          <div className="mb-12">
             <LogoWithText size="md" />
          </div>

          <div className="space-y-2">
            {!isAdminMode ? (
              <>
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <SidebarItem icon={<BookOpen size={20} />} label="Curriculum" active={activeTab === 'curriculum'} onClick={() => setActiveTab('curriculum')} />
                <SidebarItem icon={<BrainCircuit size={20} />} label="Thinking Partner" active={activeTab === 'tutor'} onClick={() => setActiveTab('tutor')} />
                <SidebarItem icon={<FileText size={20} />} label="Study Tools" active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} />
                <SidebarItem icon={<TrendingUp size={20} />} label="Employability" active={activeTab === 'employability'} onClick={() => setActiveTab('employability')} />
              </>
            ) : (
              <>
                <SidebarItem icon={<LayoutDashboard size={20} />} label="Admin Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <SidebarItem icon={<Users size={20} />} label="Student Registry" active={activeTab === 'registry'} onClick={() => setActiveTab('registry')} />
                <SidebarItem icon={<Laptop size={20} />} label="Device Manager" active={activeTab === 'devices'} onClick={() => setActiveTab('devices')} />
                <SidebarItem icon={<AlertTriangle size={20} />} label="Risk Alerts" active={activeTab === 'risks'} onClick={() => setActiveTab('risks')} />
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center space-x-2">
            <span className="text-xs font-medium text-[#0F0F15]/60">View Mode:</span>
            <button 
              onClick={() => { setIsAdminMode(!isAdminMode); setActiveTab('overview'); }}
              className={`text-xs px-2 py-1 rounded-md border transition-colors ${isAdminMode ? 'bg-[#0F0F15] text-white border-[#0F0F15]' : 'bg-white text-[#0F0F15] border-[#0F0F15]/20'}`}
            >
              {isAdminMode ? 'Administrator' : 'Student'}
            </button>
          </div>
          <div className="p-4 bg-white/40 rounded-2xl border border-white/50 backdrop-blur-sm">
             <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6F5AFF] to-[#A7B4FF] flex items-center justify-center text-lg shadow-sm border border-white">
                  {isAdminMode ? '🛡️' : '🎓'}
                </div>
                <div>
                   <p className="text-sm font-semibold text-[#0F0F15]">{isAdminMode ? 'Dr. Sharma' : MOCK_USER.name}</p>
                   <p className="text-xs text-[#0F0F15]/60">{MOCK_USER.institution}</p>
                </div>
             </div>
             <SidebarItem icon={<LogOut size={16} />} label="Sign Out" onClick={onLogout} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative z-0">
        <header className="sticky top-0 bg-[#F2F4F7]/80 backdrop-blur-xl border-b border-white/20 px-8 py-5 flex items-center justify-between z-30">
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-[#0F0F15]/60">
               <Menu />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#0F0F15] hidden md:block tracking-tight font-['Poppins']">
            {isAdminMode ? 
                (activeTab === 'overview' ? 'Institutional Dashboard' : 
                 activeTab === 'registry' ? 'Student Registry' : 
                 activeTab === 'devices' ? 'Device Inventory' : 'Risk Management') : 
             (activeTab === 'overview' ? 'My Progress' :
             activeTab === 'tutor' ? 'Thinking Partner' :
             activeTab === 'curriculum' ? (selectedModule ? selectedModule.title : 'Learning Path') :
             activeTab === 'tools' ? 'AI Study Suite' :
             'Job Readiness')
            }
          </h1>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center px-3 py-1 bg-white/50 rounded-full border border-white/50">
               <div className="w-2 h-2 bg-[#3FDB8D] rounded-full mr-2 animate-pulse"></div>
               <span className="text-xs font-medium text-[#0F0F15]/60">System Operational</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
          
          {isAdminMode ? <AdminView tab={activeTab} /> : (
            <>
            {activeTab === 'overview' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                 {/* Top Row: Literacy Score */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Dark Card with glass effect DISABLED to fix hover issues */}
                    <Card glass={false} className="lg:col-span-1 bg-gradient-to-br from-[#0F0F15] to-[#272730] text-white border-none relative overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F5AFF]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                       <div className="relative z-10">
                         <div className="flex justify-between items-start mb-6">
                           <div>
                             <p className="text-white/60 text-sm font-medium mb-1">AI Literacy Index</p>
                             <h2 className="text-5xl font-bold tracking-tight !text-white">{MOCK_USER.literacyScore.total}</h2>
                           </div>
                           <div className="w-12 h-12 rounded-full border-2 border-[#6F5AFF] flex items-center justify-center text-xs font-bold text-[#A7B4FF]">
                             +12%
                           </div>
                         </div>
                         <div className="space-y-4">
                           <div>
                             <div className="flex justify-between text-xs text-white/60 mb-1">
                               <span>Ethical Reasoning</span>
                               <span>{MOCK_USER.literacyScore.ethics}/100</span>
                             </div>
                             <ProgressBar progress={MOCK_USER.literacyScore.ethics} colorClass="bg-[#6F5AFF]" trackColorClass="bg-white/10" />
                           </div>
                           <div>
                             <div className="flex justify-between text-xs text-white/60 mb-1">
                               <span>Verification Skills</span>
                               <span>{MOCK_USER.literacyScore.verification}/100</span>
                             </div>
                             <ProgressBar progress={MOCK_USER.literacyScore.verification} colorClass="bg-[#3FDB8D]" trackColorClass="bg-white/10" />
                           </div>
                         </div>
                       </div>
                    </Card>

                    <Card className="lg:col-span-2">
                       <div className="flex justify-between items-center mb-6">
                         <h3 className="font-bold text-[#0F0F15]">Skill Radar</h3>
                         <Badge>Live Analysis</Badge>
                       </div>
                       <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={LITERACY_DATA}>
                              <PolarGrid stroke="#e5e7eb" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 12 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar name="Student" dataKey="A" stroke="#6F5AFF" fill="#6F5AFF" fillOpacity={0.3} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            </RadarChart>
                          </ResponsiveContainer>
                       </div>
                    </Card>
                 </div>

                 {/* Modules Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_MODULES.slice(0, 4).map((mod) => (
                      <Card 
                        key={mod.id} 
                        className="group hover:scale-[1.02] transition-transform cursor-pointer"
                        // For the overview, we just switch tab and set selected module
                        // but actually let's just make it link to curriculum tab
                      >
                        <div onClick={() => { setActiveTab('curriculum'); setSelectedModule(mod); }}>
                            <div className="flex justify-between items-start mb-4">
                            <span className="text-3xl filter drop-shadow-sm">{mod.icon}</span>
                            <div className={`w-2 h-2 rounded-full ${mod.status === 'completed' ? 'bg-[#3FDB8D]' : mod.status === 'active' ? 'bg-[#6F5AFF]' : 'bg-zinc-300'}`}></div>
                            </div>
                            <h4 className="font-bold text-[#0F0F15] mb-1">{mod.title}</h4>
                            <p className="text-xs text-[#0F0F15]/60 mb-4 line-clamp-2">{mod.description}</p>
                            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#0F0F15]" style={{ width: `${mod.progress}%` }}></div>
                            </div>
                        </div>
                      </Card>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'tutor' && (
              <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
                <ChatInterface />
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="max-w-5xl mx-auto">
                <StudyToolsSuite />
              </div>
            )}
            
            {activeTab === 'curriculum' && (
               <>
                 {selectedModule ? (
                    <ModuleViewer module={selectedModule} onBack={() => setSelectedModule(null)} />
                 ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                        {MOCK_MODULES.map(mod => (
                        <Card key={mod.id} className={`hover:shadow-lg transition-all ${mod.status === 'locked' ? 'opacity-60 grayscale' : ''}`}>
                            <div className="flex justify-between items-start mb-4">
                            <span className="text-4xl">{mod.icon}</span>
                            <Badge color={mod.status === 'completed' ? 'bg-[#3FDB8D]/20 text-[#3FDB8D]' : mod.status === 'active' ? 'bg-[#6F5AFF]/20 text-[#6F5AFF]' : 'bg-zinc-100 text-zinc-500'}>
                                {mod.status.toUpperCase()}
                            </Badge>
                            </div>
                            <h3 className="font-bold text-lg mb-2">{mod.title}</h3>
                            <p className="text-[#0F0F15]/60 text-sm mb-6 min-h-[40px]">{mod.description}</p>
                            <Button 
                                variant={mod.status === 'locked' ? 'ghost' : 'secondary'} 
                                className="w-full"
                                disabled={mod.status === 'locked'}
                                onClick={() => setSelectedModule(mod)}
                            >
                            {mod.status === 'completed' ? 'Review Module' : mod.status === 'locked' ? 'Locked' : 'Start Learning'}
                            </Button>
                        </Card>
                        ))}
                    </div>
                 )}
               </>
            )}
            
            {activeTab === 'employability' && (
               <Card className="max-w-4xl mx-auto text-center py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <div className="w-24 h-24 bg-[#6F5AFF]/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#6F5AFF] shadow-xl shadow-[#6F5AFF]/10">
                    <TrendingUp size={48} />
                 </div>
                 <h2 className="text-4xl font-bold text-[#0F0F15] mb-4">You are Future Ready.</h2>
                 <p className="text-xl text-[#0F0F15]/60 max-w-2xl mx-auto mb-10">
                    Based on your literacy score of <strong>82/100</strong>, you qualify for 85% of entry-level AI-augmented roles in Maharashtra.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                   <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                      <p className="text-[#0F0F15]/40 text-xs font-bold uppercase tracking-wider mb-2">Top Skill</p>
                      <p className="font-bold text-lg">Ethical Reasoning</p>
                   </div>
                   <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                      <p className="text-[#0F0F15]/40 text-xs font-bold uppercase tracking-wider mb-2">Growth Area</p>
                      <p className="font-bold text-lg">Prompt Engineering</p>
                   </div>
                   <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                      <p className="text-[#0F0F15]/40 text-xs font-bold uppercase tracking-wider mb-2">Est. Salary Premium</p>
                      <p className="font-bold text-lg text-[#3FDB8D]">+18%</p>
                   </div>
                 </div>
                 <Button variant="primary" className="px-8 py-4 text-base shadow-xl shadow-[#0F0F15]/20">Download Certified Resume</Button>
               </Card>
            )}
            </>
          )}

        </div>
      </main>
    </div>
  );
};
