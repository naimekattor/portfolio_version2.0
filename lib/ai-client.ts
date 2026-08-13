import { ApiResponse, ChatResponse } from '../types/ai';

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
  
  const res = await fetch(`${baseUrl}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.statusText}`);
  }

  const json: ApiResponse<ChatResponse> = await res.json();
  
  if (!json.success || !json.data) {
    throw new Error(json.message || 'Failed to fetch AI response');
  }

  return json.data;
}
