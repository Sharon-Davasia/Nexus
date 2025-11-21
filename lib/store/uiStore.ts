import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
    theme: 'dark' | 'light';
    isSidebarOpen: boolean;
    isCommandPaletteOpen: boolean;
    activeModal: string | null;
    notifications: Array<{
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        title: string;
        message?: string;
    }>;

    // Panel visibility (for builder interface)
    panelVisibility: {
        chat: boolean;
        code: boolean;
        preview: boolean;
        terminal: boolean;
    };

    // Actions
    setTheme: (theme: 'dark' | 'light') => void;
    toggleTheme: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    setCommandPaletteOpen: (isOpen: boolean) => void;
    openModal: (modalId: string) => void;
    closeModal: () => void;
    addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
    removeNotification: (id: string) => void;
    togglePanel: (panel: keyof UIState['panelVisibility']) => void;
    setPanelVisibility: (panel: keyof UIState['panelVisibility'], visible: boolean) => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'dark',
            isSidebarOpen: true,
            isCommandPaletteOpen: false,
            activeModal: null,
            notifications: [],
            panelVisibility: {
                chat: true,
                code: true,
                preview: true,
                terminal: true,
            },

            setTheme: (theme) => set({ theme }),

            toggleTheme: () => set((state) => ({
                theme: state.theme === 'dark' ? 'light' : 'dark',
            })),

            setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

            setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),

            openModal: (modalId) => set({ activeModal: modalId }),

            closeModal: () => set({ activeModal: null }),

            addNotification: (notification) => set((state) => ({
                notifications: [
                    ...state.notifications,
                    { ...notification, id: Math.random().toString(36).substring(7) },
                ],
            })),

            removeNotification: (id) => set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id),
            })),

            togglePanel: (panel) => set((state) => ({
                panelVisibility: {
                    ...state.panelVisibility,
                    [panel]: !state.panelVisibility[panel],
                },
            })),

            setPanelVisibility: (panel, visible) => set((state) => ({
                panelVisibility: {
                    ...state.panelVisibility,
                    [panel]: visible,
                },
            })),
        }),
        {
            name: 'nexus-ui',
        }
    )
);
