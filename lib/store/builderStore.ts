import { create } from 'zustand';

export interface FileContent {
    path: string;
    content: string;
    language: string;
}

export interface TerminalOutput {
    id: string;
    type: 'stdout' | 'stderr' | 'command';
    content: string;
    timestamp: Date;
}

export interface BuildError {
    id: string;
    file: string;
    line: number;
    column: number;
    message: string;
    severity: 'error' | 'warning' | 'info';
}

interface PreviewState {
    url: string | null;
    deviceFrame: 'desktop' | 'tablet' | 'mobile';
    isFullscreen: boolean;
}

interface BuilderState {
    files: Map<string, FileContent>;
    terminal: TerminalOutput[];
    preview: PreviewState;
    activeFile: string | null;
    errors: BuildError[];
    isBuilding: boolean;
    buildProgress: number;

    // File operations
    addFile: (file: FileContent) => void;
    updateFile: (path: string, content: string) => void;
    deleteFile: (path: string) => void;
    setActiveFile: (path: string | null) => void;

    // Terminal operations
    addTerminalOutput: (output: Omit<TerminalOutput, 'id' | 'timestamp'>) => void;
    clearTerminal: () => void;

    // Preview operations
    setPreviewUrl: (url: string | null) => void;
    setDeviceFrame: (device: PreviewState['deviceFrame']) => void;
    toggleFullscreen: () => void;

    // Build operations
    setBuildError: (error: BuildError) => void;
    clearErrors: () => void;
    setIsBuilding: (isBuilding: boolean) => void;
    setBuildProgress: (progress: number) => void;

    // Reset
    reset: () => void;
}

const initialPreviewState: PreviewState = {
    url: null,
    deviceFrame: 'desktop',
    isFullscreen: false,
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
    files: new Map(),
    terminal: [],
    preview: initialPreviewState,
    activeFile: null,
    errors: [],
    isBuilding: false,
    buildProgress: 0,

    // File operations
    addFile: (file) => set((state) => {
        const newFiles = new Map(state.files);
        newFiles.set(file.path, file);
        return { files: newFiles };
    }),

    updateFile: (path, content) => set((state) => {
        const newFiles = new Map(state.files);
        const existing = newFiles.get(path);
        if (existing) {
            newFiles.set(path, { ...existing, content });
        }
        return { files: newFiles };
    }),

    deleteFile: (path) => set((state) => {
        const newFiles = new Map(state.files);
        newFiles.delete(path);
        return {
            files: newFiles,
            activeFile: state.activeFile === path ? null : state.activeFile,
        };
    }),

    setActiveFile: (path) => set({ activeFile: path }),

    // Terminal operations
    addTerminalOutput: (output) => set((state) => ({
        terminal: [
            ...state.terminal,
            {
                ...output,
                id: Math.random().toString(36).substring(7),
                timestamp: new Date(),
            },
        ],
    })),

    clearTerminal: () => set({ terminal: [] }),

    // Preview operations
    setPreviewUrl: (url) => set((state) => ({
        preview: { ...state.preview, url },
    })),

    setDeviceFrame: (device) => set((state) => ({
        preview: { ...state.preview, deviceFrame: device },
    })),

    toggleFullscreen: () => set((state) => ({
        preview: { ...state.preview, isFullscreen: !state.preview.isFullscreen },
    })),

    // Build operations
    setBuildError: (error) => set((state) => ({
        errors: [...state.errors, error],
    })),

    clearErrors: () => set({ errors: [] }),

    setIsBuilding: (isBuilding) => set({ isBuilding }),

    setBuildProgress: (progress) => set({ buildProgress: progress }),

    // Reset
    reset: () => set({
        files: new Map(),
        terminal: [],
        preview: initialPreviewState,
        activeFile: null,
        errors: [],
        isBuilding: false,
        buildProgress: 0,
    }),
}));
