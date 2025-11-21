'use client';

import { useState } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Monitor, Tablet, Smartphone, Maximize2, Minimize2, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LivePreview() {
    const { preview, setDeviceFrame, toggleFullscreen, setPreviewUrl } = useBuilderStore();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Trigger iframe reload
        const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
        if (iframe) {
            iframe.src = iframe.src;
        }
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const deviceFrames = [
        { name: 'desktop', icon: Monitor, width: '100%' },
        { name: 'tablet', icon: Tablet, width: '768px' },
        { name: 'mobile', icon: Smartphone, width: '375px' },
    ] as const;

    return (
        <div className="flex flex-col h-full bg-background border-l border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                    {deviceFrames.map((device) => {
                        const Icon = device.icon;
                        return (
                            <Button
                                key={device.name}
                                variant={preview.deviceFrame === device.name ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setDeviceFrame(device.name)}
                                className="h-7"
                            >
                                <Icon className="w-3 h-3" />
                            </Button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="h-7"
                    >
                        <RotateCw className={cn('w-3 h-3', isRefreshing && 'animate-spin')} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="h-7"
                    >
                        {preview.isFullscreen ? (
                            <Minimize2 className="w-3 h-3" />
                        ) : (
                            <Maximize2 className="w-3 h-3" />
                        )}
                    </Button>
                </div>
            </div>

            {/* URL Bar */}
            <div className="px-4 py-2 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background border border-border text-sm">
                    <span className="text-muted-foreground">localhost:3000</span>
                </div>
            </div>

            {/* Preview */}
            <div className="flex-1 overflow-auto p-4 bg-muted/20">
                <div
                    className="mx-auto transition-all duration-300"
                    style={{
                        width: deviceFrames.find((d) => d.name === preview.deviceFrame)?.width,
                    }}
                >
                    {preview.url ? (
                        <iframe
                            id="preview-iframe"
                            src={preview.url}
                            className="w-full h-full bg-white rounded-lg shadow-lg border border-border"
                            style={{ minHeight: '600px' }}
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            title="App Preview"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-96 glass rounded-lg border border-border">
                            <div className="text-center">
                                <Monitor className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                    No preview available yet.
                                    <br />
                                    Start building to see your app here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Performance Metrics */}
            {preview.url && (
                <div className="px-4 py-2 border-t border-border bg-muted/30">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Build time: 2.3s</span>
                        <span>Bundle size: 245 KB</span>
                        <span>Memory: 45 MB</span>
                    </div>
                </div>
            )}
        </div>
    );
}
