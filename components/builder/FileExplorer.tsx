'use client';

import { useState } from 'react';
import { Folder, FolderOpen, File, MoreVertical, Plus, Trash2 } from 'lucide-react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileNode {
    name: string;
    path: string;
    type: 'file' | 'directory';
    children?: FileNode[];
}

function buildFileTree(files: Map<string, any>): FileNode[] {
    const tree: FileNode[] = [];
    const pathMap = new Map<string, FileNode>();

    files.forEach((_, path) => {
        const parts = path.split('/');
        let currentPath = '';

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            if (!pathMap.has(currentPath)) {
                const node: FileNode = {
                    name: part,
                    path: currentPath,
                    type: isLast ? 'file' : 'directory',
                    children: isLast ? undefined : [],
                };

                pathMap.set(currentPath, node);

                if (index === 0) {
                    tree.push(node);
                } else {
                    const parentPath = parts.slice(0, index).join('/');
                    const parent = pathMap.get(parentPath);
                    if (parent && parent.children) {
                        parent.children.push(node);
                    }
                }
            }
        });
    });

    return tree;
}

function FileTreeNode({ node, level = 0 }: { node: FileNode; level?: number }) {
    const [isOpen, setIsOpen] = useState(level === 0);
    const { activeFile, setActiveFile } = useBuilderStore();
    const isActive = activeFile === node.path;

    const handleClick = () => {
        if (node.type === 'file') {
            setActiveFile(node.path);
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div>
            <div
                className={cn(
                    'flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/50 rounded-md transition-colors',
                    isActive && 'bg-primary/10 text-primary',
                    level > 0 && 'ml-' + (level * 4)
                )}
                onClick={handleClick}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
                {node.type === 'directory' ? (
                    isOpen ? (
                        <FolderOpen className="w-4 h-4 text-primary" />
                    ) : (
                        <Folder className="w-4 h-4 text-muted-foreground" />
                    )
                ) : (
                    <File className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="flex-1 truncate">{node.name}</span>
            </div>

            {node.type === 'directory' && isOpen && node.children && (
                <div>
                    {node.children.map((child) => (
                        <FileTreeNode key={child.path} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function FileExplorer() {
    const { files } = useBuilderStore();
    const fileTree = buildFileTree(files);

    return (
        <div className="flex flex-col h-full bg-background border-r border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <span className="text-sm font-medium">Explorer</span>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Plus className="w-3 h-3" />
                    </Button>
                </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-auto p-2 scrollbar-thin">
                {fileTree.length === 0 ? (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                        No files yet
                    </div>
                ) : (
                    fileTree.map((node) => (
                        <FileTreeNode key={node.path} node={node} />
                    ))
                )}
            </div>
        </div>
    );
}
