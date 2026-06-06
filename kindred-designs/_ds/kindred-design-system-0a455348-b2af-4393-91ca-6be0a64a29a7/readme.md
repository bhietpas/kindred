# Kindred Design System

> **Find your people.** Kindred is a social app that helps you discover like-minded friends through shared interests, activities, and vibes — addressing the loneliness epidemic by making genuine human connection easier and more joyful.

## Sources

This design system was built from the ground up for the Kindred brand. No external codebase or Figma file was provided — all decisions reflect the brand vision and brief. Assets, tokens, and components are original to this system.

---

## Brand Overview

Kindred is a **friend-finding mobile app** — think dating app UX, but the goal is platonic connection. Users discover potential friends by shared interests (hiking, coffee, reading, music, gaming), send a connection request, and chat to arrange a meetup.

**Core loop:** Browse profiles → find shared interests → connect → meet up.

**Target audience:** Adults 22–45 who feel socially disconnected and want to expand their friend group with genuine, like-minded people.

**Key differentiators:**
- Interest-first matching, not appearance-first
- Activity-based suggestions ("People who love the farmers market near you")
- Warmth and safety as first-class values — never creepy
- Celebrates small connections: a coffee date, a hiking buddy, a book club

---

## Content Fundamentals

### Voice & tone
Kindred's voice is **warm, genuine, and encouraging** — like a thoughtful friend who happens to be great at introductions. Never pushy, salesy, or corporate.

| Quality | In practice |
|---|---|
| Warm | Use "you" directly. Acknowledge feelings. |
| Casual | Contractions always. Short sentences. |
| Encouraging | Celebrate small wins. No shame, no pressure. |
| Human | Write like a person, not a system notification. |

### Person & casing
- **Second person** throughout: "You might love Sarah's taste in music"
- **Sentence case** for all UI copy — no Title Case in body or labels
- **No period** on single-sentence UI strings (toasts, labels, helper text)
- **Exclamation marks** used sparingly — only for genuine celebration moments

### Emoji
Used **sparingly and purposefully** — onboarding celebrations, empty states, and connection moments only. Never in navigation, labels, or form copy.

### Copy examples
| ✅ Do | ❌ Don't |
|---|---|
| "Sarah's into indie films too." | "User profile: Film enthusiast" |
| "3 people share your love of hiking" | "3 mutual interest matches found" |
| "Nice one — you're connected!" | "Connection request accepted successfully." |
| "No connections yet — keep exploring!" | "You have 0 matches in your queue." |
| "What are you into?" | "Please select your interests." |

---

## Visual Foundations

### Colors
Kindred's palette is **warm, optimistic, and human** — coral primary signals energy and warmth; amber secondary adds playfulness; navy grounds and dignifies; warm cream surfaces avoid the coldness of pure white.

- **Coral `#FF5733`** — Primary action, CTAs, brand moments. Energetic but approachable.
- **Amber `#FFBF00`** — Secondary accent, highlights, celebration. Joyful and sunny.
- **Navy `#1D2D58`** — Primary text, depth, contrast. Thoughtful and trustworthy.
- **Sage `#22A063`** — Online status, success states, positive feedback.
- **Warm Neutral** — Backgrounds, dividers, disabled states. Warm-tinted, never cold gray.

No pure black or pure white in the core palette. Everything has warmth baked in.

### Typography
**Plus Jakarta Sans** (Google Fonts) is the single typeface across all surfaces. It's rounded, friendly, and modern — it reads warm without being childish. Used at weights 300–800 depending on context.

Key type rules:
- Headlines use **tight tracking** (`-0.02em`) for punch
- Body copy uses **normal tracking** and `1.5` line-height for readability
- Labels use **semibold + wide tracking** (`0.02em`) for legibility at small sizes
- Overlines use **bold + caps tracking** (`0.10em`) for category headers

### Spacing
4px base grid. Semantic insets (`--inset-sm/md/lg`) for component padding; semantic gaps (`--gap-sm/md/lg`) for flex/grid. Generous white space is preferred — Kindred breathes.

### Cards & surfaces
Cards use `--radius-card` (24px), `--shadow-card` (subtle warm shadow), and always `--surface-raised` (#FFFFFF) on `--surface-base` (warm cream). Profile cards use the special `--shadow-profile` (coral-tinted shadow) for brand warmth. No harsh borders on cards — shadow creates the separation.

### Animation & motion
Kindred uses **springy, playful transitions** for anything interactive:
- Buttons: fast snap (`120ms`) with a slight spring on press (`transform: scale(0.97)`)
- Cards: spring lift on hover; profile swipe cards use `--ease-bounce`
- Modals/sheets: slide in from bottom (`480ms`, `ease-snap`)
- Presence indicators: pulse animation for online status
- Avoid abrupt cuts — even small state changes get a `120ms` transition

### Imagery & backgrounds
- Photos: **warm-toned, candid, lifestyle**. No stock-photo stiffness.
- Backgrounds: warm cream base (`--neutral-50`), occasionally `--coral-50` for onboarding/celebration moments
- No hero gradients or gradient cards — warmth comes from color + shadow, not overlays
- Profile card photos: full-bleed with a bottom gradient overlay for text legibility

### Hover & press states
- **Hover**: slightly darker background + shadow lift (`--shadow-card-hover`)
- **Press/active**: `scale(0.97)` + darker background (no harsh color flash)
- **Focus**: `--focus-ring` (coral glow ring, 3px, 25% opacity)
- **Disabled**: `opacity: 0.45`, `cursor: not-allowed`, no hover effect

### Borders & radius
Highly rounded throughout — Kindred avoids sharp edges everywhere:
- Buttons: fully rounded pill (`--radius-full`)
- Inputs: 16px radius (`--radius-input`)
- Cards: 24px (`--radius-card`)
- Modals/sheets: 32px top corners (`--radius-modal`)
- Badges/chips/tags: fully rounded (`--radius-full`)

### Icons
Rounded, filled icon style. Lucide Icons (CDN) used throughout — `stroke-width: 1.5`, `size: 20` default. See ICONOGRAPHY section below.

---

## Iconography

Kindred uses **[Lucide Icons](https://lucide.dev)** loaded from CDN. The style is clean, rounded, with `stroke-width: 1.5` for a friendly weight.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<!-- After DOM: -->
<script>lucide.createIcons();</script>
<!-- Usage: -->
<i data-lucide="heart" class="icon"></i>
```

**Icon sizes:**
- Navigation: 24px
- In-text / button: 16px
- Status indicators: 12px
- Large feature icons: 32–40px

**Emoji:** Used only in interest tags and empty-state illustrations. Never in navigation or form chrome.

**Unicode chars:** Not used as icons — only Lucide SVGs.

---

## File Index

```
styles.css                  ← Global entry point (import only)
tokens/
  colors.css                ← Full color system + semantic tokens
  typography.css            ← Font imports + type scale + semantic styles
  spacing.css               ← Spacing scale + border radius
  shadows.css               ← Elevation + glow effects
  motion.css                ← Easing + durations + semantic transitions
assets/
  logo.svg                  ← Full horizontal logo (mark + wordmark)
  logo-mark.svg             ← Logomark only (square usage)
  logo-wordmark.svg         ← Wordmark only (text only)
guidelines/
  colors-brand.card.html    ← Coral + amber palette swatches
  colors-neutral.card.html  ← Navy + warm neutral swatches
  colors-semantic.card.html ← Semantic token reference
  type-scale.card.html      ← Font size scale
  type-styles.card.html     ← Named text styles (Display, H1, Body, etc.)
  spacing.card.html         ← Spacing scale
  radius.card.html          ← Border radius scale
  shadows.card.html         ← Shadow levels
  motion.card.html          ← Easing + duration tokens
  brand-logo.card.html      ← Logo variants
components/
  core/                     ← Button, Avatar, Badge, Tag, Input, Card, Switch
  social/                   ← ProfileCard, InterestTag, MatchScore
ui_kits/
  app/                      ← Kindred mobile app (Discover, Chat, Profile)
```

### Components
| Component | Group | Description |
|---|---|---|
| Button | core | Primary, secondary, ghost, soft, danger — sm/md/lg |
| Avatar | core | With presence indicator, initials fallback |
| Badge | core | Status, count, dot variants |
| Tag | core | Selectable, removable interest tags |
| Input | core | Text, search, password |
| Card | core | Flat, raised, outlined containers |
| Switch | core | Toggle with label |
| ProfileCard | social | Discovery card with photo, interests, actions |
| InterestTag | social | Color-coded interest/hobby tag |
| MatchScore | social | Shared-interest compatibility indicator |

---

*Kindred Design System · Built for warmth, connection, and joy.*
