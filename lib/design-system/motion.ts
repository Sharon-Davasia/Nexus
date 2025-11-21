/**
 * Design System - Motion Specifications
 * Animation durations, easing curves, and Framer Motion variants
 */

/**
 * Duration Constants (in milliseconds)
 */
export const duration = {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
} as const;

/**
 * Easing Curves
 * Custom cubic-bezier curves for smooth animations
 */
export const easing = {
    // Standard easing
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],

    // Custom easing for UI
    spring: [0.34, 1.56, 0.64, 1],      // Bouncy spring
    anticipate: [0.36, 0, 0.66, -0.56],  // Anticipate motion
    smooth: [0.16, 1, 0.3, 1],           // Smooth and elegant
    snappy: [0.4, 0, 0.2, 1],            // Quick and snappy
} as const;

/**
 * CSS Timing Functions
 */
export const timingFunctions = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/**
 * Framer Motion Variants
 */

// Fade animations
export const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

export const fadeInDownVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

// Slide animations
export const slideInRightVariants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
};

export const slideInLeftVariants = {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
};

// Scale animations
export const scaleVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
};

export const scaleSpringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        },
    },
    exit: { scale: 0.8, opacity: 0 },
};

// Hover animations
export const hoverLiftVariants = {
    rest: { y: 0, scale: 1 },
    hover: {
        y: -4,
        scale: 1.02,
        transition: { duration: duration.fast / 1000 },
    },
};

export const hoverGlowVariants = {
    rest: { boxShadow: '0 0 0 rgba(59, 130, 246, 0)' },
    hover: {
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        transition: { duration: duration.normal / 1000 },
    },
};

// Stagger children
export const staggerContainerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const staggerItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

/**
 * Micro-Interaction Recipes
 * Pre-configured animation configs for common interactions
 */

// Button press effect
export const buttonPressConfig = {
    whileTap: { scale: 0.95 },
    transition: { duration: duration.fast / 1000 },
};

// Card hover effect
export const cardHoverConfig = {
    whileHover: {
        scale: 1.02,
        y: -4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    },
    transition: {
        duration: duration.normal / 1000,
        ease: easing.smooth,
    },
};

// Drawer animation
export const drawerVariants = {
    initial: { x: '100%' },
    animate: {
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
    exit: {
        x: '100%',
        transition: {
            duration: duration.normal / 1000,
            ease: easing.easeIn,
        },
    },
};

// Modal animation
export const modalVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: duration.normal / 1000,
            ease: easing.smooth,
        },
    },
    exit: {
        scale: 0.9,
        opacity: 0,
        transition: {
            duration: duration.fast / 1000,
            ease: easing.easeIn,
        },
    },
};

// Backdrop animation
export const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

// Loading pulse
export const loadingPulseVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1],
        transition: {
            duration: duration.slower / 1000,
            repeat: Infinity,
            ease: easing.easeInOut as any,
        },
    },
};

// Typewriter cursor
export const cursorBlinkVariants = {
    initial: { opacity: 1 },
    animate: {
        opacity: [1, 0, 1],
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop' as const,
        },
    },
};

/**
 * Page Transition Config
 */
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.normal / 1000,
            ease: easing.smooth,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: duration.fast / 1000,
        },
    },
};

/**
 * Cursor Trail Config
 * For interactive cursor effects
 */
export const cursorTrailConfig = {
    size: 40,
    color: 'rgba(59, 130, 246, 0.5)',
    duration: duration.slow,
    easing: timingFunctions.smooth,
};

/**
 * Export default motion config
 */
export const defaultTransition = {
    duration: duration.normal / 1000,
    ease: easing.smooth,
};
