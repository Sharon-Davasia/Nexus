/**
 * Design System - Color Tokens
 * Centralized color palette for the Nexus platform
 */

export const colors = {
    // Background colors
    background: {
        primary: '#0A0A0B',    // Near black
        secondary: '#141416',  // Elevated surfaces
        tertiary: '#1C1C1F',   // Cards, modals
    },

    // Border colors
    border: {
        subtle: '#27272A',     // Subtle borders
        default: '#3F3F46',    // Default borders
        strong: '#52525B',     // Strong borders
    },

    // Brand colors
    brand: {
        primary: '#3B82F6',    // Electric blue
        primaryHover: '#2563EB',
        primaryActive: '#1D4ED8',
    },

    // Accent colors
    accent: {
        success: '#10B981',    // Emerald green
        warning: '#F59E0B',    // Amber
        error: '#EF4444',      // Red
        info: '#06B6D4',       // Cyan
    },

    // Text colors
    text: {
        primary: '#FAFAFA',    // Primary text
        secondary: '#A1A1AA',  // Secondary text
        tertiary: '#71717A',   // Tertiary text
        disabled: '#52525B',   // Disabled text
    },

    // Semantic colors
    semantic: {
        building: '#F59E0B',   // Building status
        deployed: '#10B981',   // Deployed status
        error: '#EF4444',      // Error status
        draft: '#71717A',      // Draft status
    },
} as const;

/**
 * Spacing System
 * Based on 4px grid
 */
export const spacing = {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
} as const;

/**
 * Typography Scale
 */
export const typography = {
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
    },
    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

/**
 * Border Radius
 */
export const borderRadius = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
} as const;

/**
 * Shadow System
 */
export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    glowStrong: '0 0 40px rgba(59, 130, 246, 0.5)',
} as const;

/**
 * Z-Index Layers
 */
export const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
} as const;

/**
 * Breakpoints
 */
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;
