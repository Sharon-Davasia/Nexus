'use client';

import { useEffect, useState } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Play, Square, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Terminal() {
    const { terminal, clearTerminal } = useBuilderStore();
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        if (autoScroll) {
            const terminalElement = document.getElementById('terminal-output');
            if (terminalElement) {
                terminalElement.scrollTop = terminalElement.scrollHeight;
            }
        }
    }, [terminal, autoScroll]);

    return (
        <div className="flex flex-col h-full bg-background border-t border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearTerminal}
                        className="h-7"
                    >
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            </div>

            {/* Output */}
            <div
                id="terminal-output"
                className="flex-1 overflow-auto p-4 font-mono text-sm scrollbar-thin"
            >
                {terminal.length === 0 ? (
                    <div className="text-muted-foreground">
                        No output yet. Start building to see terminal output.
                    </div>
                ) : (
                    terminal.map((output) => (
                        <div
                            key={output.id}
                            className={`mb-1 ${output.type === 'stderr'
                                    ? 'text-destructive'
                                    : output.type === 'command'
                                        ? 'text-primary'
                                        : 'text-foreground'
                                }`}
                        >
                            {output.type === 'command' && '$ '}
                            {output.content}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
