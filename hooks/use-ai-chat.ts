import { useState, useCallback } from 'react';
import { ChatMessage, ProjectResult } from '../types/ai';
import { sendChatMessage } from '../lib/ai-client';

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Add a temporary loading message for the assistant
    const loadingId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: loadingId, role: 'assistant', content: '', isStreaming: true },
    ]);

    try {
      const response = await sendChatMessage(content);
      
      // Parse projects from sources if they exist (assuming source is a JSON string of project data)
      const extractedProjects: ProjectResult[] = [];
      if (response.sources) {
        response.sources.forEach(source => {
          try {
            // Attempt to parse the source string. If it's a project, it should have a title and description.
            const parsed = typeof source.source === 'string' ? JSON.parse(source.source) : source.source;
            if (parsed && (parsed.technologies || parsed.tech || parsed.liveUrl || parsed.githubUrl)) {
              if (!extractedProjects.find(p => p.title === parsed.title)) {
                let confidenceLabel = 'Good match';
                if (source.relevance >= 0.50) confidenceLabel = 'Highly relevant';
                else if (source.relevance >= 0.40) confidenceLabel = 'Strong match';

                extractedProjects.push({
                  id: source.documentId,
                  title: parsed.title || source.title,
                  description: parsed.description || parsed.solution || '',
                  technologies: parsed.technologies || parsed.tech || [],
                  image: (parsed.images && parsed.images[0]) || parsed.image || undefined,
                  liveUrl: parsed.liveUrl,
                  githubUrl: parsed.githubUrl,
                  confidenceLabel,
                });
              }
            }
          } catch (e) {
            // Not a JSON string or not a structured project, safely ignore
          }
        });
      }

      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === loadingId 
            ? { 
                ...msg, 
                content: response.answer, 
                isStreaming: false,
                sources: response.sources,
                projects: extractedProjects.length > 0 ? extractedProjects : undefined
              }
            : msg
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve response. Please try again.');
      // Remove the loading message and show error instead
      setMessages((prev) => prev.filter(msg => msg.id !== loadingId));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
  };
}
