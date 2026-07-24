# E-Commerce Test Automation

Cross-browser end-to-end regression tests for authentication, catalog navigation, cart operations, and checkout workflows.

The current test environment is [SauceDemo](https://www.saucedemo.com/), a public application intended for browser automation practice. The target URL is configurable through `BASE_URL`, so the suite can also be pointed at a compatible environment.

## Test coverage

| Area | Scenarios |
|---|---|
| Authentication | Successful login, invalid password, locked account, logout |
| Navigation | Product details, cart navigation, return to catalog |
| Cart | Add and remove a product |
| Checkout | Required-field validation and successful order completion |

Detailed scenarios and expected results are documented in [`docs/TEST_PLAN.md`](docs/TEST_PLAN.md).

## Technology

- Playwright Test
- TypeScript
- Page Object Model
- Chromium, Firefox, and WebKit projects
- HTML reports, screenshots, video, and traces on failure
- GitHub Actions continuous integration

## Project layout

```text
ecommerce-test-automation/
├── .github/workflows/playwright.yml
├── docs/TEST_PLAN.md
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── test-data/users.ts
├── tests/
│   ├── auth.spec.ts
│   ├── navigation.spec.ts
│   └── shopping.spec.ts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Local setup

Requirements:

- Node.js LTS
- npm

Install dependencies and browser binaries:

```bash
npm install
npx playwright install
```

Run the complete cross-browser suite:

```bash
npm test
```

Common commands:

```bash
npm run test:chromium
npm run test:headed
npm run test:ui
npm run test:debug
npm run typecheck
npm run report
```

## Configuration

The default target is:

```text
https://www.saucedemo.com
```

Override it by setting `BASE_URL` before running the suite.

Bash:

```bash
BASE_URL=https://example.test npm test
```

PowerShell:

```powershell
$env:BASE_URL = "https://example.test"
npm test
```

The default SauceDemo credentials are public test data. They may also be overridden with `E2E_USERNAME` and `E2E_PASSWORD`.

## Continuous integration

The workflow in `.github/workflows/playwright.yml` runs type checking and the Playwright suite on pushes and pull requests to `main` or `master`. The generated HTML report is uploaded as a workflow artifact.

## Notes

- The suite depends on an external public test environment. Availability or UI changes in that environment may affect results.
- Tests are isolated and can run independently.
- No real purchases, payments, or personal information are used.
