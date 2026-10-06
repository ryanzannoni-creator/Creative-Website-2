# Builder Pack

A class-assignment landing page for the Google Create Design Code Build sticker.
Built with React, TypeScript, Vite, Tailwind CSS, GSAP ScrollTrigger, and Lenis.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

The supplied sticker image is stored locally without modification. CSS frames its nontransparent region. Motion includes oversized type parallax, scroll reveals, an animated menu, and a floating sticker that docks to the page on narrow screens. Reduced-motion settings are respected.

Buttons link to the Google Merchandise Store; this assignment does not process orders.

GitHub Actions validates and deploys main to https://ryanzannoni-creator.github.io/Creative-Website-2/ using the `/Creative-Website-2/` base path.
