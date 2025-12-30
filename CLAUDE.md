# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimalist, typography-focused blog built with Astro 5.x and styled with Tailwind CSS 4.x. The design philosophy is "Classic Text Stream" - prioritizing readability, whitespace, and content hierarchy over visual decorations.

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands

# Deployment
# Build artifacts in ./dist/ are static and can be deployed to any static hosting
```

## Architecture & Design System

### Design Philosophy: "Classic Text Stream"
- **Text-first**: No hero images, no visual distractions
- **Optimal reading width**: 650px max-width (~70 characters per line)
- **Typography hierarchy**: Large bold sans-serif titles → muted metadata → serif body text
- **Minimal color palette**: Warm off-white background, dark gray text, saddle brown accents

### Color System (tailwind.config.cjs)
```
warm-white:   #FDFCFB  (background)
dark-gray:    #1A1A1A  (primary text)
saddle-brown: #8B4513  (accent - links, progress bar)
muted-gray:   #6B7280  (secondary text - dates, metadata)
```

### Typography System
- **Body text**: Lora serif (Google Fonts) - 18px, line-height 1.75-1.8
- **UI elements**: System font stack (header, footer, navigation)
- **Prose styling**: Tailwind Typography plugin with custom overrides

### Layout Architecture

**Two primary layouts:**

1. **BaseLayout** (`src/layouts/BaseLayout.astro`)
   - Used by: Homepage, blog listing, about page
   - Structure: Header → Main (650px centered) → Footer
   - No image support (text-first)

2. **BlogPost** (`src/layouts/BlogPost.astro`)
   - Used by: Individual blog posts
   - Features:
     - Code copy buttons (appears on hover, Clipboard API)
     - Tailwind Typography `prose prose-lg` classes
     - Center-aligned header with date above title

### Key Components

**BaseHead** (`src/components/BaseHead.astro`)
- Critical: Imports global.css (entire Tailwind styling depends on this)
- Handles: SEO meta tags, Open Graph, Twitter Cards, favicon, RSS feed
- Google Fonts preconnect for performance
- No image prop (uses favicon as OG fallback)

**Header** (`src/components/Header.astro`)
- Full-width white bar with 650px centered content
- Navigation: Home, Blog, About
- Active state: Bold + saddle brown underline

**Footer** (`src/components/Footer.astro`)
- Minimalist: Copyright text only, no social links
- 650px centered, matches main content width

### Content Collections

**Blog posts** (`src/content/blog/`)
- Schema defined in `src/content.config.ts`
- Required frontmatter:
  ```yaml
  title: string
  description: string
  pubDate: date (YYYY-MM-DD or 'MMM DD YYYY')
  ```
- Optional frontmatter:
  ```yaml
  updatedDate: date
  heroImage: image (optional, but currently not displayed in design)
  ```
- Supports both Markdown (.md) and MDX (.mdx) files
- Accessed via `getCollection('blog')` in pages

### Styling Approach

**Tailwind 4.x specifics:**
- Uses Vite plugin architecture (`@tailwindcss/vite`)
- Config: `tailwind.config.cjs` (CommonJS format required)
- **Important**: Cannot use `@apply` with custom color names in `@layer base` - use direct hex values instead

**Global CSS** (`src/styles/global.css`)
- **Must** have `@import` statements at the very top (CSS spec requirement)
- Order: Google Fonts import → Tailwind directives → Base styles
- Body styles use direct CSS values (not @apply)

**Typography Plugin**
- `@tailwindcss/typography` provides `prose` classes
- Custom overrides in tailwind.config.cjs set 650px max-width, 18px font, 1.75 line-height
- Code blocks: Dark slate background (#1e293b) with light text

### Interactive Features (Client-side JavaScript)

**Code Copy Buttons** (`BlogPost.astro`)
- Wraps `<pre>` elements in relative container
- Button appears on hover (opacity transition)
- Uses `navigator.clipboard.writeText()` API
- Visual feedback: "Copy" → "Copied!" → resets after 2s

### Configuration Files

**Site constants** (`src/consts.ts`)
- `SITE_TITLE` and `SITE_DESCRIPTION` used throughout app
- Update these to customize site metadata

**Astro config** (`astro.config.mjs`)
- Update `site: 'https://example.com'` for production deployment
- Integrations: MDX, Sitemap
- Tailwind via Vite plugin

### Content Guidelines

When adding new blog posts:
1. Create `.md` or `.mdx` file in `src/content/blog/`
2. Include required frontmatter (title, description, pubDate)
3. Posts automatically appear in homepage and blog listing (sorted by date, newest first)
4. Access via `/blog/{filename}/` route

### Build Output

- Static site generated to `./dist/`
- Automatic generation: Sitemap (sitemap-index.xml), RSS feed (rss.xml)
- Image optimization: Sharp processes images to WebP
- No runtime server required (100% static)

## Important Notes

**Tailwind 4.x Compatibility:**
- Avoid `@apply` with custom Tailwind utilities in CSS files
- Use direct CSS values in `@layer base` instead
- Move `@import` statements to top of CSS file

**Content Width:**
- All content should respect 650px max-width for readability
- This is enforced in BaseLayout and BlogPost layouts
- Tailwind prose plugin also configured for 650px

**Font Loading:**
- Lora loaded via Google Fonts in global.css
- Preconnect links in BaseHead.astro optimize load time
- System fonts used for UI to minimize HTTP requests

**No Images:**
- Design intentionally excludes hero images
- `heroImage` field still exists in schema but isn't rendered
- Focus is entirely on typography and text content