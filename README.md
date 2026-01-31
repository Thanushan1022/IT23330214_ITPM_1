# Tanglish-to-Tamil Playwright Tests

Lightweight Playwright test suite validating Tanglish → Tamil behavior and transliteration rules.

![Playwright Tests](https://img.shields.io/badge/tests-playwright-blue)

## Overview

This repository contains Playwright test specifications and generated reports for verifying Tanglish-to-Tamil conversions. Tests exercise UI flows and string transformations and save artifacts (screenshots, traces) on failure.

## Requirements

- Node.js 14+ (LTS recommended)
- npm (or yarn)

## Quick start

Install project dependencies and browsers:

```powershell
npm install
npx playwright install
```

Run the entire test suite:

```powershell
npx playwright test
```

Run a single spec file:

```powershell
npx playwright test tests/Tanglish-to-Tamil-ass.spec.js
```

Run tests in headed mode:

```powershell
npx playwright test --headed
```

Run tests in a specific browser:

```powershell
npx playwright test -b chromium
```

## Test reports and artifacts

- Open the interactive HTML report:

```powershell
npx playwright show-report
```

- Or open `playwright-report/index.html` in your browser.
- Failure artifacts (screenshots, traces, logs) are in `test-results/`.

## GitHub Actions (example)

Add this to `.github/workflows/playwright.yml` to run tests on push/PR:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --reporter=list
      - uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
```

## Troubleshooting

- If browsers fail to launch, run `npx playwright install --with-deps`.
- For flaky tests, enable traces: `npx playwright test --trace on` and inspect the trace viewer.

## Project structure

- `tests/` — Playwright test specs
- `playwright-report/` — HTML test reports
- `test-results/` — Per-run artifacts and error contexts

## Contributing

- Run tests locally before pushing.
- Include a clear description and failing test context for PRs that change behavior.

---
Tell me if you want badges (build/test), a short CHANGELOG, or a CI matrix for multiple browsers — I can add them.
