# Motion The Agency · redesign preview

Home, Services and Sizzle Reel, the three pages from the design audit, rebuilt as a custom-coded site.

Live: https://the-motion-redesign.vercel.app

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript | Static pages, fast first load, good SEO defaults |
| Styling | Tailwind CSS v4 with tokens in `src/app/globals.css` | One source for colours, type, spacing, z-index |
| Animation | GSAP (ScrollTrigger, SplitText), Motion (framer-motion) | Scroll-linked scenes, text reveals, layout transitions |
| Scrolling | Lenis | Desktop with a mouse only. Tablets and phones keep native scroll |
| 3D | React Three Fiber / three.js | The work spiral on Home |
| Hosting | Vercel | Preview link per push, production on `main` |

## Componentry components and where they live

| Component | Page, section |
| --- | --- |
| Scroll Based Velocity | Home, Services, Sizzle: velocity bands |
| Flipping Word Swap | Home hero headline, Services hero card |
| Hover Transition | Service cards on Home and Services |
| Circuit Board | Home "outsourced team" workflow, Sizzle production process |
| Collection Surfer | Services customer stories (pinned 3D surf) |
| Wheel Carousel | Sizzle "Different types of sizzle reel" |
| Spiral 3D Slider | Home latest work |
| Dithered Logo | Home hero, the M mark as interactive particles |
| Pixel Canvas | Home hero background, closing CTA, 404 |
| Pixel Image Trail | Home "Why choose us" client story |
| ASCII Effect | Sizzle hero artwork |

Sources are in `src/components/ui`, copied from the Componentry registry. Changes from upstream:

- `collection-surfer`: pinned with `position: sticky` inside its own section instead of fixing the whole page to a 50,000px spacer.
- `wheel-carousel`: `next-themes` removed (dark-only site); `scrollSpeed={0}` no longer hijacks the mouse wheel, so page scroll can drive it.
- `flipping-word-swap`: optional `interval` auto-swap and a `decorative` mode (out of the tab order, paired with sr-only text); words align left.
- `scroll-based-velocity`: no nested `<section>`, one screen-reader copy of the text.
- `pixel-canvas`: stops its render loop while off screen; follows the pointer over layered content.

## Motion inventory

Loader with progress, page-transition curtain (cover, route change, scroll to top, reveal), word-by-word masked headings, letter-roll + magnetic buttons, cursor ring with labels ("Play"), spotlight card borders, scroll progress bar in the nav, hide-on-scroll header, clip-path image reveals, count-up stats, sticky stacking process cards, pinned horizontal benefits track (desktop), scroll-driven wheel (desktop), filter transitions on the services grid, rotating text badge, scrubbed footer headline. Everything respects `prefers-reduced-motion`.

## Audit findings applied

- 03 Testimonials lead with person, role and company; videos are click-to-load facades. No written quotes exist on the live site, so none were invented.
- 04 "Why choose us" fills the empty half with a real client story and uses the two standard buttons.
- 05 Hero leads with quality and outcome rather than "for less".
- 06 A call to action follows each proof moment (why us, process, testimonials, pricing, closing band).
- 07 Two labels everywhere: Get free sample (primary) and Book a call (secondary).
- 09 Services H1 says what the page offers; pricing title no longer says "UI Animation Services".
- 10 "What is a sizzle reel?", mismatched FAQ answers dropped, duplicated tip copy rewritten.
- 01 / 02 No cookie notice or calculator popup covers the hero (the preview sets no tracking cookies).

## Content rules

All facts, numbers, clients and prices come from motiontheagency.com (September 2026) and live in `src/lib/content.ts`. With no contact page in this preview, both buttons open an email to hello@motiontheagency.com. Footer columns mirror the live site; their link lists are empty on purpose until those pages exist. The site is `noindex` so it never competes with the live domain.

## Run

```bash
npm install
npm run dev
```

Audit (four breakpoints, overflow, console errors, mobile menu, route transition):

```bash
npm run build && npx next start -p 3210
node scripts/audit.mjs http://localhost:3210 audit-out
```
