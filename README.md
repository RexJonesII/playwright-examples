# Playwright Examples

Runnable Playwright + TypeScript examples from my content.

Code is filed by subject, not by platform. Anything tied to a Playwright
release lives under `releases/`, and every platform that covers it (LinkedIn,
YouTube, blog) links to the same folder. One source of truth, no duplicates.

- `releases/<version>/`. Code for a specific Playwright release.
- `blog/`. Blog-post code not tied to a release.
- `youtube/`. Standalone video code not tied to a release.

Every spec file has a header comment with its source, date, and a link back
to the post or video.

## Run it

```bash
npm install
npx playwright install
npm test                 # run everything
npm run test:releases    # run only release examples
npm run test:blog        # run only blog examples
npm run test:youtube     # run only YouTube examples
npm run report           # open the last HTML report
```

## Requirements

- Node.js 20+
- Playwright 1.64+. Some examples use APIs added in 1.64, like `locator.within()`.

## Index

| Release | Topic | File |
| --- | --- | --- |
| 1.64 | locator.within() (before, after, and a reorder-stable version) | [releases/1.64/locator-within.spec.ts](releases/1.64/locator-within.spec.ts) |

Author: Rex Jones II
