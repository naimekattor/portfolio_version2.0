import { useState, useRef, useCallback } from 'react'
import * as webllm from '@mlc-ai/web-llm'
import Groq from "groq-sdk";
import { PORTFOLIO_KNOWLEDGE } from '../data/portfolioKnowledge.js'

const WEBLLM_MODEL_ID = 'Llama-3.2-1B-Instruct-q4f16_1-MLC'
const GROQ_MODEL_ID = 'llama-3.3-70b-versatile' // High performance model

export function useChatBot() {
  const [status, setStatus] = useState('idle')
  const [loadProgress, setLoadProgress] = useState(0)
  const [messages, setMessages] = useState([])
  const [activeModel, setActiveModel] = useState('groq') // 'groq' | 'webllm'
  const engineRef = useRef(null)

  // Use environment variable for Groq API KEY
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "YOUR_GROQ_API_KEY",
    dangerouslyAllowBrowser: true
  });

  const initialize = useCallback(async () => {
    // If we're already using Groq, we don't necessarily need to "initialize" a local model 
    // unless we're preparing it as a fallback. For better UX, we'll only initialize WebLLM
    // if Groq fails or if we explicitly want to pre-warm it.
    if (activeModel === 'groq') {
      setStatus('ready')
      return
    }

    if (engineRef.current || status === 'loading') return

    setStatus('loading')
    try {
      engineRef.current = await webllm.CreateMLCEngine(WEBLLM_MODEL_ID, {
        initProgressCallback: ({ progress }) => {
          setLoadProgress(Math.round(progress * 100))
        },
      })
      setStatus('ready')
    } catch (err) {
      console.error('WebLLM fallback failed to load:', err)
      setStatus('error')
    }
  }, [status, activeModel])

  const sendMessage = useCallback(async (userText) => {
    const userMsg = { role: 'user', content: userText, id: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setStatus('thinking')

    const botMsgId = Date.now() + 1
    const systemPrompt = `You are a helpful and friendly assistant for Naimur Rahman Naim's portfolio. 
    Here is the portfolio knowledge base in JSON format: ${JSON.stringify(PORTFOLIO_KNOWLEDGE)}.
    Answer questions naturally based on this data.`;

    const history = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userText },
    ]

    setMessages(prev => [...prev, { role: 'assistant', content: '', id: botMsgId }])

    // --- TRY GROQ FIRST ---
    if (activeModel === 'groq') {
      try {
        const stream = await groq.chat.completions.create({
          messages: history,
          model: GROQ_MODEL_ID,
          stream: true,
        });

        let fullText = ''
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content || ''
          fullText += delta
          setMessages(prev =>
            prev.map(m => m.id === botMsgId ? { ...m, content: fullText } : m)
          )
        }
        setStatus('ready')
        return; // Success!
      } catch (error) {
        console.error("Groq API failed, falling back to WebLLM:", error);
        setActiveModel('webllm');
        setStatus('loading');
        // Initialize WebLLM now that Groq failed
        await initialize();
      }
    }

    // --- FALLBACK TO WEBLLM ---
    if (!engineRef.current) {
      // Double check initialization if we just switched
      await initialize();
    }

    try {
      if (!engineRef.current) throw new Error("Local AI Engine not ready");

      const stream = await engineRef.current.chat.completions.create({
        messages: history,
        stream: true,
        temperature: 0.6,
        max_tokens: 300,
      })

      let fullText = ''
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || ''
        fullText += delta
        setMessages(prev =>
          prev.map(m => m.id === botMsgId ? { ...m, content: fullText } : m)
        )
      }
      setStatus('ready')
    } catch (err) {
      console.error('WebLLM failed:', err)
      setStatus('error')
    }
  }, [status, messages, activeModel, initialize])

  return { status, loadProgress, messages, initialize, sendMessage, activeModel }
}