'use client';

import { useState } from 'react';
import { useAIStore } from '@/lib/store/aiStore';
import { Send, Mic, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from ('@/components/ui/input';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDark DarkCodeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUpVariants } from '@/lib/design-system/motion';

export default function ChatInterface() {
    const { messages, isStreaming, addMessage } = useAIStore();
    const [input, setInput] = useState('');
    const [isVoiceActive, setIsVoiceActive] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isStreaming) return;

        // Add user message
        addMessage({ role: 'user', content: input });
        setInput('');

        // TODO: Call AI API
        // For now, just add a mock response
        setTimeout(() => {
            addMessage({
                role: 'assistant',
                content: 'I received your message: "' + input + '". AI integration coming soon!',
            });
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-background border-r border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div>
                    <h2 className="text-sm font-semibold">AI Assistant</h2>
                    <p className="text-xs text-muted-foreground">
                        Describe what you want to build
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin">
                <AnimatePresence>
                    {messages.length === 0 ? (
                        <motion.div
                            className="flex flex-col items-center justify-center h-full text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Start Building</h3>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                Describe your app idea and I'll help you build it. Be as detailed or as vague as you like!
                            </p>
                        </motion.div>
                    ) : (
                        messages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                variants={fadeInUpVariants}
                                initial="initial"
                                animate="animate"
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'glass border border-white/10'
                                        }`}
                                >
                                    {message.role === 'assistant' ? (
                                        <div className="prose prose-invert max-w-none text-sm">
                                            <ReactMarkdown
                                                components={{
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                            <SyntaxHighlighter
                                                                style={vscDarkCodeTheme as any}
                                                                language={match[1]}
                                                                PreTag="div"
                                                                {...props}
                                                            >
                                                                {String(children).replace(/\n$/, '')}
                                                            </SyntaxHighlighter>
                                                        ) : (
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                }}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <div className="text-sm">{message.content}</div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>

                {/* Streaming indicator */}
                {isStreaming && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>AI is thinking...</span>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your app idea..."
                        disabled={isStreaming}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsVoiceActive(!isVoiceActive)}
                        className={isVoiceActive ? 'text-primary' : ''}
                    >
                        <Mic className="w-4 h-4" />
                    </Button>
                    <Button type="submit" disabled={!input.trim() || isStreaming}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
}
