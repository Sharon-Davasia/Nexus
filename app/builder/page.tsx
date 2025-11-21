'use client';

import { useEffect } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import ChatInterface from '@/components/builder/ChatInterface';
import FileExplorer from '@/components/builder/FileExplorer';
import Terminal from '@/components/builder/Terminal';
import LivePreview from '@/components/builder/LivePreview';
import { Code, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BuilderPage() {
    const [showChat, setShowChat] = useState(true);
    const [showFileExplorer, setShowFileExplorer] = useState(true);
    const { activeFile } = useBuilderStore();

    // Add some demo files on mount
    useEffect(() => {
        const { addFile } = useBuilderStore.getState();
        addFile({
            path: 'src/App.tsx',
            content: '// Your app code will appear here\nexport default function App() {\n  return <div>Hello World</div>\n}',
            language: 'typescript',
        });
        addFile({
            path: 'src/index.css',
            content: '/* Your styles */\nbody {\n  margin: 0;\n  font-family: sans-serif;\n}',
            language: 'css',
        });
    }, []);

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <Code className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold">Nexus Builder</h1>
                        <p className="text-xs text-muted-foreground">Untitled Project</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Save
                    </Button>
                    <Button variant="default" size="sm" className="gradient-primary">
                        Deploy
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Chat */}
                {showChat && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '350px', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex-shrink-0"
                    >
                        <ChatInterface />
                    </motion.div>
                )}

                {/* Center - Code Editor */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowChat(!showChat)}
                            className="h-7"
                        >
                            {showChat ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFileExplorer(!showFileExplorer)}
                            className="h-7"
                        >
                            Files
                        </Button>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                        {/* File Explorer */}
                        {showFileExplorer && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '250px' }}
                                exit={{ width: 0 }}
                                className="flex-shrink-0"
                            >
                                <FileExplorer />
                            </motion.div>
                        )}

                        {/* Code Editor Area */}
                        <div className="flex-1 flex flex-col min-w-0">
                            <div className="flex-1 p-4 overflow-auto scrollbar-thin">
                                {activeFile ? (
                                    <div className="glass p-6 rounded-lg border border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-mono text-muted-foreground">
                                                {activeFile}
                                            </h3>
                                        </div>
                                        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                                            <p className="text-muted-foreground">
                                                Code editor integration coming soon...
                                            </p>
                                            <p className="text-muted-foreground mt-2">
                                                Monaco Editor will be integrated here for full IDE experience.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <Code className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">
                                                Select a file to view or start chatting to generate code
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Terminal */}
                            <div className="h-48 flex-shrink-0">
                                <Terminal />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Preview */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '400px', opacity: 1 }}
                    className="flex-shrink-0"
                >
                    <LivePreview />
                </motion.div>
            </div>
        </div>
    );
}
