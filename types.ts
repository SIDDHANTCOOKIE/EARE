
export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD_STUDENT = 'DASHBOARD_STUDENT',
  DASHBOARD_ADMIN = 'DASHBOARD_ADMIN'
}

export enum GeminiMode {
  MENTOR = 'MENTOR', // Socratic
  FACT_CHECKER = 'FACT_CHECKER', // Strict verification
  SANDBOX = 'SANDBOX', // Safe creative exploration
  CAREER_COACH = 'CAREER_COACH', // Employability
  REFLECTION = 'REFLECTION' // Self-analysis
}

export enum StudyToolType {
  SUMMARIZER = 'SUMMARIZER',
  STRUCTURE_BUILDER = 'STRUCTURE_BUILDER',
  REVISION_GENERATOR = 'REVISION_GENERATOR',
  PRESENTATION_COACH = 'PRESENTATION_COACH',
  LITERACY_ANALYZER = 'LITERACY_ANALYZER'
}

export interface UserProfile {
  name: string;
  institution: string;
  role: 'student' | 'faculty' | 'admin';
  accessLevel: 'basic' | 'premium';
  literacyScore: {
    total: number;
    ethics: number;
    verification: number;
    prompting: number;
    analysis: number;
  };
  deviceStatus: 'Active' | 'Due Soon' | 'Overdue' | 'None';
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'Ethics' | 'Technical' | 'Employability' | 'Safety';
  icon: string;
  status: 'locked' | 'active' | 'completed';
  content?: string; // Markdown content for reading
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  mode?: GeminiMode;
  timestamp: number;
}

export interface StudyToolResult {
  tool: StudyToolType;
  output: string; // Markdown content
  meta?: any; // Score, bias check result, etc.
}

export interface Flashcard {
  front: string;
  back: string;
}
