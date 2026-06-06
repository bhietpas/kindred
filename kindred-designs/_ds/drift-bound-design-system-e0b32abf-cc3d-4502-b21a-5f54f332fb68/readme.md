# Drift Bound — Design System

A brand and interface system for **Drift Bound**, an asynchronous, mobile-first,
play-by-post tabletop RPG platform. Players take turns over hours or days; the
fiction drifts forward while everyone is busy living their lives, and pulls them
back with a push notification when it's their move.

> **"A navigator's grimoire."** Atmospheric, literary, built for *reading and
> writing prose over days* — not gamer-RGB, not generic SaaS. Midnight-ink
> surfaces, warm bone text, candlelight where it matters.

---

## Where this came from

There was **no existing visual design** to mine — Drift Bound today is a
backend domain model and a planned Flutter client. This system was authored
from the product's domain and tone. The source material:

- **GitHub — `bhietpas/drift-bound`** (private): the Quarkus monolith starter,
  domain glossary, architecture doc, and the worked "identity" vertical slice.
  - `glossary.md` — the canonical domain vocabulary (the anti-glossary too).
  - `architecture.md` — bounded contexts, layering, the zone-based exploration model.
  - `AGENTS.md` — the engineering constitution and product mission statement.
  - `login/identity.md` — the magic-link auth design (passwordless, multi-device).
  - Explore the repo to design more faithfully against the real domain:
    https://github.com/bhietpas/drift-bound

Everything visual here — palette, type, the logo, the components, the mobile
kit — is an **original interpretation**, not a recreation of a shipped product.
Treat it as the *proposed* brand; iterate freely.

### The domain in one breath

`Campaign` → `Session` → `Turn`. A **Game Master** narrates; **Players**
control **Characters**. A **Turn** is the atomic act of play — narrative prose,
optional dice, optional declared actions, and a **visibility scope**
(`public` / `gm-only` / `whisper`). Exploration is **zone-based** in v1
(Close / Near / Far / Distant relative to a reference) — *no pixel maps yet*.
Combat is async rounds that close when everyone submits or the GM force-advances.

Use the glossary terms exactly. A *session* is not a *game* is not an
*encounter*; never say "match", "lobby", "room", or "quest".

---

## Content fundamentals — how Drift Bound writes

The voice has **two registers**, and keeping them separate is the whole game.

**1. The interface speaks plainly (grotesk).** Short, calm, second person,
sentence case. It never shouts and never gamifies. It respects that the player
is an adult mid-life who will answer in their own time.
- Buttons are verbs on the player's intent: *"Submit turn"*, *"Write your
  turn"*, *"Reveal zone"*, *"Send magic link"* — not "OK" / "Go" / "Submit!".
- Status is factual, never nagging: *"3 players waiting · GM resolving"*,
  *"Your move"*, *"Last activity 4 hours ago"*, *"It expires in 15 minutes."*
- Empty/system states carry a wink of the fiction without breaking function:
  *"Adventures that wait for you."*, *"By continuing you agree to keep the
  fiction kind."*

**2. The fiction speaks like a novel (serif).** Turn prose is third-person
present, sensory, unhurried. This is the content the product exists to hold, so
it gets the most beautiful face and the most generous leading.
- *"The rope bridge sways under Mara's weight. Below, the gorge breathes a cold
  mist that swallows the lantern-light whole."*
- GM narration is authoritative but not purple. It sets stakes and asks for
  rolls in plain imperative: *"Roll Dexterity to keep your footing."*

**Casing & punctuation.** Sentence case everywhere except eyebrows/overlines,
which are `UPPERCASE` with wide tracking (`GAME MASTER`, `DAY 3`, `ZONE
REVEALED`). Em dashes for narrative beats. Real typographic quotes in prose.

**Numbers are machine voice.** Dice, stats, timestamps, IDs, HP/AC — always the
mono face, tabular figures: `2d6+3 → 11`, `HP 24/30`, `14:08 · day 3`. Never
set a stat in the prose serif.

**Pronouns.** The UI addresses the player as **you**. The fiction never does
(it's *Mara*, *Brannon*, *the Keeper*) — second person in prose belongs only to
the GM addressing a character.

**No emoji.** None. Tone glyphs come from the icon set or the brand's own marks
(the compass, the zone dot, the scope dot). Warmth comes from the words and the
candlelight, not from 🎲.

---

## Visual foundations

**The feeling.** A table at night. You're looking at a lantern-lit page in a
dark room. Surfaces are deep midnight indigo; text is warm bone, not clinical
white; the one source of warmth is the **ember** of a candle (primary), and the
one source of the uncanny is the **drift** aurora (accent, for exploration and
reveal).

**Color.**
- *Surfaces* — a cool midnight-indigo ink ramp (`--ink-950 → --ink-400`).
  `--bg-app` is the home; cards are `--surface-raised`; popovers `--surface-overlay`.
  Depth is built from **stacked surfaces + a hairline bone border**, not from big
  drop shadows.
- *Text* — warm **bone** (`#FAF6EC → #6f7896`), never pure `#FFF`. `--text-strong`
  for titles, `--text-body` for reading, `--text-muted`/`--text-faint` for meta.
- *Ember* (`--ember-500`, primary) — candlelight. CTAs, the GM's presence,
  active/"your move" states. Carries a soft glow, never a flat fill alone.
- *Drift* (`--drift-500`, accent) — aurora teal. Links, the `public` scope,
  zone reveals, focus rings. The "something is happening" color.
- *Brass* — ornament, dice crits, dividers. *Whisper* (violet) — private turns.
- *Domain ramps are first-class tokens*: visibility scope (`--scope-public/gm/whisper`)
  and zone distance (`--zone-close/near/far/distant`).
- A **parchment reading surface** (`.surface-parchment`) flips the whole scope to
  warm paper for long-form session logs / export.

**Type.** Four families, two voices.
- **Cormorant Garamond** — display. High-contrast serif for titles, hero,
  the wordmark. Italics carry fiction asides.
- **Spectral** — narrative. The reading face for Turn prose; line-height `1.7`,
  ~60ch column.
- **Hanken Grotesk** — interface. The workhorse for labels, buttons, nav, data
  (400–800).
- **JetBrains Mono** — machine. Dice, stats, tokens, timestamps; tabular numerals.
- Scale is a modular ramp `11 → 72px`. Eyebrows are `11px / 600 / .16em /
  UPPERCASE`.

**Backgrounds.** Mostly flat ink. The one motif is `.db-backdrop`: a barely-there
radial wash of drift (top) and ember (corner) over `--bg-app` — the "lantern in
the dark" vignette. No photographic imagery, no busy textures, no big gradients.

**Corners & borders.** Gently rounded — controls/cards at `--radius-md (11)` to
`--radius-lg (16)`; chips, avatars and scope pills go full `--radius-pill`.
Borders are a single **bone hairline at ~10% opacity** (`--border`), stepping to
`--border-strong` for inputs and raised edges. Cards add an inner top **seam**
(`--seam-top`) — a 6%-bone highlight line — so they catch the light like a real
card edge.

**Shadows & glow.** Two systems:
- *Ambient shadows* (`--shadow-sm → --shadow-pop`) are cool and soft, for
  layering on dark.
- *Candlelight glows* (`--glow-ember`, `--glow-drift`, `--glow-soft`) ring an
  element in colored light for **active / focus / GM / reveal** states. The
  primary button and the GM avatar glow ember; focus rings and reveals glow drift.

**Motion.** Calm and settling, never bouncy. Easing is custom
(`--ease-out`, `--ease-drift` for atmospheric reveals). Durations: `120ms`
interactions, `200ms` base, up to `600ms` (`--dur-drift`) for a zone revealing.
- *Hover* — primary brightens to `--ember-600`; secondary lifts a surface step;
  cards translate up `2px` with a deeper shadow.
- *Press* — controls **shrink to `scale(0.97)`** (a physical "push"), no color flash.
- *Reveal* — a zone fading in from unrevealed should drift in slowly; respect
  `prefers-reduced-motion`.

**Transparency & blur.** Sparingly. Hairlines and soft scope-tint fills use
`color-mix`/alpha; the composer and bottom CTA sit over a `linear-gradient`
fade to `--bg-app` so the feed dissolves under them rather than hard-cutting. No
heavy frosted-glass everywhere.

**Layout.** Mobile-first, single column, `390px` design width, `44px` minimum
hit target, `4px` spacing grid. Reading column caps at ~`680px`. Fixed elements:
status bar, a bottom tab bar on the home surface, and a floating compose CTA in
the session thread.

---

## Iconography

**Line icons, Lucide.** Drift Bound uses [**Lucide**](https://lucide.dev)
— a clean, consistent ~1.75px-stroke open-source line set whose explorer/compass
vocabulary (`compass`, `map`, `scroll`, `feather`, `dice-5`, `swords`) fits the
product perfectly. It is loaded from CDN in the kit and cards:

```html
<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
<i data-lucide="compass"></i>
<script>lucide.createIcons()</script>
```

> **Substitution flag:** Lucide is a *chosen* icon set, not one inherited from a
> Drift Bound codebase (there isn't one yet). If the team adopts a different set
> (or a custom glyph font) for the Flutter client, swap it here and update this
> section. Stroke weight and the line (not filled) style are the things to preserve.

**Conventions.**
- **Line, not filled.** Icons are monochrome `currentColor`; they take the ink
  color of their context and only take ember/drift when they're the active tab,
  a scope marker, or a dice/brass accent.
- **Size** 18–22px inline with text; 22–24px for nav and back chevrons; tap
  target stays ≥44px regardless of glyph size.
- **No emoji, ever** (see Content Fundamentals). The few "symbolic" glyphs that
  aren't Lucide are brand marks: the compass star (logo), the zone status dot,
  the scope dot, and the dice tag — all drawn from tokens, not Unicode.

**Brand marks** live in `assets/`:
- `assets/logo-mark.svg` — the navigator's seal: a 4-point compass star with a
  **drift node** orbiting off true-center (the async "drift" away from the table).
  Uses `currentColor` + ember/drift, so it adapts to dark and light.
- `assets/wordmark.svg` — mark + "Drift" (Cormorant) over "BOUND" (tracked grotesk).

*(No photographic or illustrated imagery ships with v1 — the aesthetic is
typographic + ink. If the brand later commissions cover art per campaign, the
parchment surface and ember/drift accents are the frame to drop it into.)*

---

## What's in here (index / manifest)

```
styles.css              ← the entry point consumers link (an @import manifest)
tokens/
  fonts.css             webfont @imports + --font-* families
  colors.css            ink / bone / ember / drift / brass / whisper / status
                        + semantic aliases + domain ramps + .surface-parchment
  typography.css        scale, weights, line-heights, tracking, role classes
  spacing.css           4px grid, hit target, containers
  elevation.css         radii, borders, shadows, glows, motion
  base.css              resets + element defaults + .db-backdrop
assets/
  logo-mark.svg         compass-star + drift-node seal
  wordmark.svg          full lockup
guidelines/             foundation specimen cards (Design System tab)
components/
  core/                 Button · Badge · Avatar · Card
  forms/                Input · Switch
  play/                 TurnCard · ZoneChip · DiceRoll   (the domain pieces)
ui_kits/
  mobile/               the play-by-post app — sign-in → campaigns → session → compose
SKILL.md                downloadable Agent-Skill manifest
```

### Components (reusable primitives)
| Component | What it's for |
|---|---|
| **Button** | Actions. `primary` (ember+glow) / `secondary` / `ghost` / `accent` (drift) / `danger`. |
| **Badge** | Status & visibility-scope markers (`public`/`gm`/`whisper`, status tones). |
| **Avatar** | Player/character token; ember ring = GM, drift glow = their turn. |
| **Card** | Base raised surface; `glow="ember"` for active/GM cards. |
| **Input** | Text field & turn-composer textarea (switches to the serif). |
| **Switch** | Binary settings (push, quiet hours, GM-only draft). |
| **TurnCard** | The atomic play-by-post turn: author, scope, prose, dice, time. |
| **ZoneChip** | A node in the Session zone graph; Close→Distant ramp, reveal state. |
| **DiceRoll** | Mono dice result with crit/fumble detection. |

Each component directory carries a `.d.ts` (props), a `.prompt.md` (when/how),
and a `@dsCard` HTML thumbnail.

### UI kit
- **`ui_kits/mobile/`** — an interactive recreation of the Drift Bound mobile
  app: passwordless **sign-in → magic-link sent → campaigns → session thread
  (zone rail + turns) → turn composer (scope + dice)**. Open `index.html`.

---

## Using it

Consumers link the one entry point and read components off the compiled bundle:

```html
<link rel="stylesheet" href="styles.css">
```

Everything is token-driven — design with the CSS custom properties (`--primary`,
`--surface-raised`, `--text-body`, `--scope-gm`, `--zone-far`…) rather than raw
hex, and the brand stays coherent. Keep the two type voices honest: **serif for
the fiction, grotesk for the chrome, mono for the machine.**
