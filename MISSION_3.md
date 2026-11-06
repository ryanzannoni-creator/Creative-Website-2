# Mission 3 — FreshCheck in motion

The home-page hero's `freshcheck-lid.svg` illustration is enhanced with the confirmed Fresh Check GLB. The scrolling illustrations in the lower sections and the pricing illustration remain intact. Existing branding, product copy, indicator demo, navigation, email links, $52.99 pricing, and FAQ are preserved.

## Asset provenance

Imported from `Venture_3D_Confirmed_Handoff (4).zip`, confirmed November 6, 2026 at 19:15:50 UTC. Manifest schema 1.0.0; Y up, meters; approximately 24.7 × 11.02 × 16.7 cm. The 589,652-byte GLB is copied without modifying geometry or materials. SHA-256:

`a0e5eb42888920a2bc2b8587d49f636fd669393279971bcfe227c8569339e58e`

Runtime checks verify this checksum before loading. The GLB, manifest and confirmed PNG preview live in `public/models/freshcheck/`. No Mission 2 browser storage is used.

## Experience

One automatic 10.8-second sequence spins the container, lifts its actual lid assembly, pours its existing pasta geometry into the container, and closes the lid. It plays once, with replay/pause, four selectable chapters, open/close, zoom buttons, reset and drag rotation. Focus the canvas and use arrow keys for keyboard rotation. Touch gestures rotate the product; vertical page scrolling remains available.

This is presentation choreography, not a claim that the physical product fills itself or has a powered lid. No new physical component or food model was generated. The confirmed final design is restored at the end.

Operating-system reduced-motion preferences and the hero's Reduce motion control disable autoplay and damping. Chapter selection displays still poses. Static preview shows the confirmed PNG with an explicit non-interactive label. Failed WebGL, model fetches or checksum validation use the same fallback. Optional `?view=static` opens directly in static mode.

Three.js is dynamically loaded only by the home-page hero. Pixel ratio is capped; offscreen and background animation pauses; idle scenes render only when changed. Orbit controls do not consume wheel scrolling. Existing React/Vite/GSAP/Lenis stack and GitHub Pages base path are retained.

## Verification and maintenance

Run `npm ci`, `npm run lint`, `npm test`, and `npm run build`. The existing Pages workflow now also runs the timing/fallback tests before publishing.

Automated tests check a complete spin, lid clearance before pouring, monotonic food motion, all pieces settled before closure, restored final pose, and the unavailable-WebGL error path. Browser checks cover desktop and a 390-pixel iframe viewport, chapters, reduced motion, fallback, preserved demo, menu, pricing and FAQ. A real physical phone was not used; the animation is deterministic choreography rather than a rigid-body simulation.

Backup branch: `backup/pre-mission-3-2026-11-06`. To revise the model, reopen Mission 2, edit the project, Confirm Model, and download a new handoff ZIP. Replace the model/manifest/preview after validation. If component names or structure change, update the lid and pasta bindings in `src/lib/product-scene.ts`. Then rebuild and redeploy this repository.
