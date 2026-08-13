export interface ProjectResult {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  confidenceLabel?: string;
}

export interface RagSource {
  documentId: string;
  title: string;
  source: string; // Could be JSON or plain text depending on what backend returns
  relevance: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  projects?: ProjectResult[];
  sources?: RagSource[];
  isStreaming?: boolean;
}

export interface ChatResponse {
  answer: string;
  sources: RagSource[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
