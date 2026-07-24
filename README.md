# Playwright SauceDemo Portfolio Suite

A small but professional end-to-end test automation project for the public [SauceDemo](https://www.saucedemo.com/) training website.

The repository contains **10 automated tests** for:

- Successful, failed, and locked-user login
- Logout
- Product and cart navigation
- Adding and removing a cart item
- Checkout form validation
- Successful checkout submission

It uses **Playwright Test + TypeScript**, the **Page Object Model**, cross-browser projects, HTML reports, failure screenshots/videos/traces, and GitHub Actions.

> This is a demo project. It does not purchase real products or use real personal information.

## Why this is useful in a portfolio

Instead of only saying “I learned Playwright,” this repository demonstrates that you can:

- Translate user behavior into automated test cases
- Use reliable locators and web-first assertions
- Organize automation with page objects
- Keep tests independent
- Run tests across Chromium, Firefox, and WebKit
- Produce test evidence and reports
- Run the suite automatically in GitHub Actions

## Project structure

```text
playwright-saucedemo-portfolio/
├── .github/workflows/playwright.yml
├── docs/
│   ├── PLAYWRIGHT_BASICS.md
│   └── TEST_CASES.md
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
├── .gitignore
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Requirements

Install:

- Node.js LTS
- Git
- VS Code (recommended)

Check Node.js:

```bash
node --version
npm --version
```

## Install the project

Open a terminal inside the project folder:

```bash
npm install
npx playwright install
```

On Linux CI or a new Linux machine, use:

```bash
npx playwright install --with-deps
```

## Run the tests

Run all 10 tests in Chromium, Firefox, and WebKit:

```bash
npm test
```

Run only Chromium:

```bash
npm run test:chromium
```

Watch the browser:

```bash
npm run test:headed
```

Use Playwright's interactive UI:

```bash
npm run test:ui
```

Debug step by step:

```bash
npm run test:debug
```

Open the HTML report:

```bash
npm run report
```

## Example test

```ts
test('logs in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventoryPage.pageTitle).toHaveText('Products');
});
```

The test performs two user actions and then checks two results:

1. Open the login page.
2. Submit valid credentials.
3. Verify the browser reached the inventory URL.
4. Verify the page displays the `Products` heading.

## Automated scenarios

| File | Number | Coverage |
|---|---:|---|
| `auth.spec.ts` | 4 | Valid login, invalid password, locked user, logout |
| `navigation.spec.ts` | 2 | Product details and cart navigation |
| `shopping.spec.ts` | 4 | Add, remove, form validation, full checkout |
| **Total** | **10** | Login, navigation, forms, and end-to-end flow |

See [docs/TEST_CASES.md](docs/TEST_CASES.md) for the full test-case table.

## How the code is organized

### Tests

Files ending in `.spec.ts` contain scenarios and assertions. They describe what behavior is being checked.

### Page objects

Files in `pages/` contain locators and reusable user actions. For example, the login class knows how to find the username, password, and login controls.

### Test data

`test-data/users.ts` stores demo users and checkout information in one place.

### Configuration

`playwright.config.ts` defines the base URL, browser projects, retries, reporters, and failure evidence.

## Push it to GitHub

Create an empty GitHub repository, then run these commands inside this folder:

```bash
git init
git add .
git commit -m "Add Playwright SauceDemo test suite"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your actual GitHub values.

After the push, open the repository's **Actions** tab. The Playwright workflow should start automatically.

## Suggested repository description

> Beginner-friendly Playwright TypeScript E2E portfolio project with 10 SauceDemo tests, page objects, cross-browser execution, reports, traces, and GitHub Actions.

## How to explain this project in an interview

> I built a Playwright TypeScript end-to-end suite for SauceDemo. It covers positive and negative authentication, navigation, cart behavior, checkout validation, and a complete purchase flow. I separated reusable page behavior into page objects, kept test data centralized, configured three browser engines, and added GitHub Actions plus HTML reports and failure artifacts.

## Beginner guide

Read [docs/PLAYWRIGHT_BASICS.md](docs/PLAYWRIGHT_BASICS.md) for a step-by-step explanation of browsers, pages, locators, actions, assertions, auto-waiting, isolation, page objects, reports, and CI.

## Notes

- The suite depends on a public external demo website, so a temporary outage or website redesign can affect results.
- SauceDemo credentials are intentionally public test credentials displayed by the training site.
- Tests are isolated and should run independently or in any order.

## License

MIT
