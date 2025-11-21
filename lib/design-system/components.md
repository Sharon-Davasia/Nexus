# Nexus Design System - Component Guidelines

This document outlines the design system components, usage patterns, and customization guidelines for the Nexus platform.

## Component Library

We use **shadcn/ui** as our base component library with custom theming to match the Nexus aesthetic.

## Core Components

### Button

Buttons are the primary call-to-action elements in the interface.

**Variants:**
- `default` - Primary blue gradient
- `secondary` - Subtle gray background
- `outline` - Transparent with border
- `ghost` - No background, minimal styling
- `destructive` - Red for dangerous actions

**Sizes:**
- `sm` - Small (32px height)
- `md` - Medium (40px height) - Default
- `lg` - Large (48px height)

**Usage:**
```tsx
<Button variant="default" size="md">
  Start Building
</Button>
```

**Animation:**
- Scale down to 0.95 on press
- Smooth 300ms transitions
- Hover lift effect (4px up, scale 1.02)

### Card

Cards are container components with glassmorphism styling.

**Variants:**
- `default` - Subtle glass effect
- `strong` - Stronger backdrop blur
- `elevated` - With shadow elevation

**Usage:**
```tsx
<Card className="glass">
  <CardHeader>
    <CardTitle>Project Name</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Input

Form inputs with floating labels and focus states.

**States:**
- Default
- Focus (blue ring)
- Error (red ring)
- Disabled (reduced opacity)

**Accessibility:**
- Always include labels
- Use `aria-describedby` for errors
- Provide clear error messages

### Dialog/Modal

Modals use portal rendering with backdrop blur.

**Animation:**
- Fade in backdrop (300ms)
- Scale spring animation (0.9 → 1.0)
- Smooth exit transitions

**Accessibility:**
- Focus trap within modal
- ESC key to close
- Click outside to dismiss
- Return focus on close

### Tooltip

Contextual help text that appears on hover.

**Placement:**
- `top`, `bottom`, `left`, `right`, `auto`

**Delay:**
- Show: 200ms
- Hide: 0ms

**Usage:**
```tsx
<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Helpful text</TooltipContent>
</Tooltip>
```

## Custom Components

### ChatInterface

The AI chat interface with markdown rendering and syntax highlighting.

**Features:**
- Real-time streaming responses
- Code syntax highlighting
- Typewriter effect for AI messages
- Message history scrolling
- Voice input support

**File:** `components/builder/ChatInterface.tsx`

### CodeEditor

Monaco editor integration for code editing.

**Features:**
- Syntax highlighting for 50+ languages
- File tabs
- Auto-save
- Vim mode support (optional)
- Minimap

**File:** `components/builder/CodeEditor.tsx`

### FileExplorer

Tree view of project file system.

**Features:**
- Collapsible folders
- File icons by type
- Context menu (right-click)
- Drag and drop
- Search/filter

**File:** `components/builder/FileExplorer.tsx`

### Terminal

Terminal output display with ANSI color support.

**Features:**
- Auto-scroll to bottom
- Command history
- Clear output button
- Copy output

**File:** `components/builder/Terminal.tsx`

### LivePreview

Sandboxed iframe for preview.

**Features:**
- Device frame selector
- Refresh button
- Full-screen mode
- Performance metrics
- Responsive testing

**File:** `components/builder/LivePreview.tsx`

## Theming

### Colors

All colors use CSS variables defined in `app/globals.css`:

```css
--background: 0 0% 4%;
--foreground: 0 0% 98%;
--primary: 217 91% 60%;
--accent: 158 64% 52%;
```

### Dark Mode

Dark mode is the default. Light mode can be toggled via the theme provider.

### Glassmorphism

Use the `glass` utility class for glassmorphism effects:

```tsx
<div className="glass p-6 rounded-lg">
  Content with glass effect
</div>
```

## Animation Guidelines

### Micro-Interactions

Every interactive element should have subtle feedback:

1. **Hover states** - Lift and shadow elevation
2. **Active states** - Scale down (0.95)
3. **Focus states** - Blue ring outline

### Loading States

Use skeleton loaders during data fetching:

```tsx
<Skeleton className="h-20 w-full" />
```

For AI processing, use the pulsing gradient animation.

### Success States

Show confetti animation on successful deployment:

```tsx
import confetti from 'canvas-confetti';

confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
});
```

## Accessibility

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Provide keyboard shortcuts for common actions
- Show focus indicators clearly

### Screen Readers

- Use semantic HTML
- Provide ARIA labels
- Use `aria-live` regions for dynamic content

### Color Contrast

All text must meet WCAG 2.1 AA standards:
- Normal text: 4.5:1
- Large text: 3:1

### Reduced Motion

Respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

## Best Practices

1. **Consistent spacing** - Use the spacing scale (4px grid)
2. **Meaningful animations** - Every animation should have a purpose
3. **Performance** - Keep animations at 60fps
4. **Accessibility first** - Always consider keyboard and screen reader users
5. **Mobile responsive** - Test on all breakpoints
6. **Error states** - Provide clear error messages and recovery paths

## Component Checklist

Before creating a new component, ensure:

- [ ] TypeScript types defined
- [ ] Variants and sizes configured
- [ ] Animations implemented
- [ ] Accessibility attributes added
- [ ] Responsive behavior tested
- [ ] Dark mode styles verified
- [ ] Documentation written
- [ ] Tests created

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Framer Motion API](https://www.framer.com/motion)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
