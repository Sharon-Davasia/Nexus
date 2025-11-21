import { create } from 'zustand';

export interface AIMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    isStreaming?: boolean;
}

export interface AgentStatus {
    name: string;
    status: 'idle' | 'thinking' | 'working' | 'done' | 'error';
    message?: string;
}

interface AIState {
    messages: AIMessage[];
    currentAgent: AgentStatus | null;
    agentPipeline: AgentStatus[];
    isStreaming: boolean;
    tokensUsed: number;

    // Actions
    addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
    updateLastMessage: (content: string) => void;
    setStreaming: (isStreaming: boolean) => void;
    setCurrentAgent: (agent: AgentStatus | null) => void;
    updateAgentPipeline: (pipeline: AgentStatus[]) => void;
    addTokensUsed: (tokens: number) => void;
    clearConversation: () => void;
}

export const useAIStore = create<AIState>((set) => ({
    messages: [],
    currentAgent: null,
    agentPipeline: [],
    isStreaming: false,
    tokensUsed: 0,

    addMessage: (message) => set((state) => ({
        messages: [
            ...state.messages,
            {
                ...message,
                id: Math.random().toString(36).substring(7),
                timestamp: new Date(),
            },
        ],
    })),

    updateLastMessage: (content) => set((state) => {
        const messages = [...state.messages];
        if (messages.length > 0) {
            messages[messages.length - 1] = {
                ...messages[messages.length - 1],
                content,
            };
        }
        return { messages };
    }),

    setStreaming: (isStreaming) => set({ isStreaming }),

    setCurrentAgent: (agent) => set({ currentAgent: agent }),

    updateAgentPipeline: (pipeline) => set({ agentPipeline: pipeline }),

    addTokensUsed: (tokens) => set((state) => ({
        tokensUsed: state.tokensUsed + tokens,
    })),

    clearConversation: () => set({
        messages: [],
        currentAgent: null,
        agentPipeline: [],
        isStreaming: false,
        tokensUsed: 0,
    }),
}));
