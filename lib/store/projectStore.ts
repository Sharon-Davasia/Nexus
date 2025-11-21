import { create } from 'zustand';

export interface Project {
    id: string;
    userId: string;
    name: string;
    description: string;
    techStack: {
        framework: string;
        language: string;
        database?: string;
        styling: string;
    };
    files: Record<string, string>;
    deploymentUrl?: string;
    githubUrl?: string;
    status: 'draft' | 'building' | 'deployed' | 'error';
    createdAt: Date;
    updatedAt: Date;
}

interface ProjectState {
    projects: Project[];
    activeProject: Project | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    filterStatus: string | null;

    // Actions
    setProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    setActiveProject: (project: Project | null) => void;
    setSearchQuery: (query: string) => void;
    setFilterStatus: (status: string | null) => void;

    // Computed
    getFilteredProjects: () => Project[];
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    activeProject: null,
    isLoading: false,
    error: null,
    searchQuery: '',
    filterStatus: null,

    setProjects: (projects) => set({ projects, error: null }),

    addProject: (project) => set((state) => ({
        projects: [project, ...state.projects],
    })),

    updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        ),
        activeProject:
            state.activeProject?.id === id
                ? { ...state.activeProject, ...updates, updatedAt: new Date() }
                : state.activeProject,
    })),

    deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        activeProject: state.activeProject?.id === id ? null : state.activeProject,
    })),

    setActiveProject: (project) => set({ activeProject: project }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    setFilterStatus: (status) => set({ filterStatus: status }),

    getFilteredProjects: () => {
        const { projects, searchQuery, filterStatus } = get();

        return projects.filter((project) => {
            const matchesSearch = searchQuery
                ? project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            const matchesFilter = filterStatus
                ? project.status === filterStatus
                : true;

            return matchesSearch && matchesFilter;
        });
    },
}));
