# FreshCheck

Ryan Zannoni's Marketing Venture website, adapted from the existing Creative Website 2 scrolling product template.

FreshCheck is a proposed smart lid with an automatic timer, color indicators, and app reminders. The site presents the venture as a concept and includes a working three-state indicator demo, menu navigation, and email feedback link.

## Development

Run `npm ci`, then `npm run dev`. Validate with `npm run lint` and `npm run build`.

The existing GitHub Actions workflow builds and publishes pushes to `main` to GitHub Pages:
https://ryanzannoni-creator.github.io/Creative-Website-2/

## Assets and content

`public/img/freshcheck-lid.svg` is an original vector concept illustration. Content is based on Ryan's supplied FreshCheck venture PDF. The website is not a functioning food-safety sensor or an ecommerce store. Feedback opens an email draft; it is not transmitted automatically.

## Mission 3: interactive 3D hero

The confirmed Fresh Check model now spins, opens, fills with pasta, and closes. See [MISSION_3.md](MISSION_3.md) for asset provenance, controls, reduced-motion and fallback behavior, tests, and future model updates. Run `npm test` to check choreography and the unavailable-WebGL path.
