# System Patterns: Yuda Blog

## Architecture Overview

### Core Architecture Pattern
The blog follows a **Static Site Generation (SSG)** pattern with **Incremental Static Regeneration (ISR)** for optimal performance and content freshness.

### Component Architecture
```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#1e293b', 'primaryTextColor': '#f8fafc', 'primaryBorderColor': '#334155', 'lineColor': '#64748b', 'secondaryColor': '#0f172a', 'tertiaryColor': '#334155' }}}%%
graph TB
    subgraph "Client Layer"
        A[Next.js App Router]
        B[React Components]
        C[Tailwind CSS]
    end
    
    subgraph "Data Layer"
        D[Notion API Client]
        E[Content Cache]
        F[ISR Handler]
    end
    
    subgraph "Build Layer"
        G[Static Generation]
        H[Image Optimization]
        I[Bundle Optimization]
    end
    
    A --> D
    B --> E
    C --> B
    D --> F
    F --> G
    G --> H
    H --> I
    
    style A fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style B fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style C fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style D fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style E fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
    style F fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
    style G fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
    style H fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
    style I fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
```

## Design Patterns

### 1. Component Composition Pattern
- **Atomic Design**: Components organized as atoms, molecules, organisms
- **Compound Components**: Related UI elements grouped together
- **Render Props**: Flexible component behavior customization

### 2. Data Fetching Patterns
| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| **Static Generation** | Blog posts, pages | `generateStaticParams()` |
| **ISR** | Content updates | `revalidate` option |
| **Client Fetching** | Dynamic content | SWR for caching |
| **Server Components** | Initial page load | React Server Components |

### 3. State Management
```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#1e293b', 'primaryTextColor': '#f8fafc', 'primaryBorderColor': '#334155', 'lineColor': '#64748b', 'secondaryColor': '#0f172a', 'tertiaryColor': '#334155' }}}%%
stateDiagram-v2
    [*] --> StaticContent: Build Time
    StaticContent --> ISR: Content Update
    ISR --> StaticContent: Regenerate
    StaticContent --> ClientState: Hydration
    ClientState --> Interactive: User Actions
    
    StaticContent: Pre-built pages
    ISR: Incremental updates
    ClientState: React hydration
    Interactive: Dynamic features
    
    note left of StaticContent: Generated at build time
    note right of ISR: Background regeneration
```

## File Structure Patterns

### Directory Organization
```
src/
├── app/                    # App Router
│   ├── blog/              # Blog routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── blog/             # Blog-specific components
├── lib/                  # Utilities and helpers
│   ├── notion/          # Notion integration
│   ├── utils/           # General utilities
│   └── types/           # TypeScript types
└── public/              # Static assets
```

### Naming Conventions
| Type | Pattern | Example |
|------|---------|---------|
| **Components** | PascalCase | `BlogCard.tsx` |
| **Utilities** | camelCase | `formatDate.ts` |
| **Types** | PascalCase with suffix | `BlogPost.type.ts` |
| **CSS Classes** | kebab-case | `blog-card` |
| **API Routes** | kebab-case | `blog-posts.ts` |

## Performance Patterns

### 1. Image Optimization
- Next.js Image component for automatic optimization
- WebP format with fallbacks
- Responsive image sizing
- Blur placeholders for better UX

### 2. Code Splitting
- Route-based splitting with App Router
- Component-level lazy loading
- Dynamic imports for heavy components

### 3. Caching Strategy
```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#1e293b', 'primaryTextColor': '#f8fafc', 'primaryBorderColor': '#334155', 'lineColor': '#64748b', 'secondaryColor': '#0f172a', 'tertiaryColor': '#334155' }}}%%
graph LR
    A[Browser Cache] --> B[CDN Cache]
    B --> C[Next.js Cache]
    C --> D[Notion API]
    
    E[ISR Revalidate] --> C
    F[Build Cache] --> C
    
    style A fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style B fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style C fill:#1e293b,stroke:#334155,stroke-width:3px,color:#f8fafc
    style D fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
    style E fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
    style F fill:#334155,stroke:#475569,stroke-width:2px,color:#f8fafc
```

## Security Patterns

### 1. API Security
- Environment variables for sensitive data
- Rate limiting on API routes
- Input validation and sanitization
- CORS configuration

### 2. Content Security
- Content Security Policy (CSP) headers
- XSS prevention measures
- Secure headers configuration

## Error Handling Patterns

### 1. Error Boundaries
- Global error boundary for the app
- Route-specific error handling
- Graceful degradation for API failures

### 2. User Feedback
| Error Type | User Experience | Technical Response |
|------------|-----------------|-------------------|
| **404 Not Found** | Custom 404 page | Log and redirect |
| **500 Server Error** | Friendly error page | Error boundary |
| **API Failures** | Fallback content | Retry mechanism |
| **Network Issues** | Offline indicator | Service worker |
