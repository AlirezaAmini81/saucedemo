# Playwright Basics for a Complete Beginner

## 1. What Playwright is

Playwright is a browser automation tool. Your code tells a browser what to do, such as:

1. Open a website.
2. Fill in a username and password.
3. Click a button.
4. Check that the correct page or message appears.

A person can perform those steps manually. Playwright performs them automatically and reports whether the result was correct.

## 2. The main pieces

### Browser

The application that renders the website. Playwright supports Chromium, Firefox, and WebKit.

### Browser context

A clean, isolated browser session, similar to a new incognito window. Playwright normally gives each test a separate context so tests do not share cookies, local storage, or login state.

### Page

A browser tab. In a test, `page` is the object used to visit URLs, find elements, click, fill forms, and inspect the page.

### Locator

A locator describes how Playwright should find an element.

```ts
const loginButton = page.locator('[data-test="login-button"]');
```

The locator does not immediately click anything. It stores a reliable way to find that element when an action or assertion is performed.

### Action

An action changes or interacts with the page.

```ts
await loginButton.click();
await usernameInput.fill('standard_user');
```

### Assertion

An assertion checks whether the actual result matches the expected result.

```ts
await expect(page).toHaveURL(/inventory\.html/);
await expect(title).toHaveText('Products');
```

A test passes when all its actions finish and all assertions succeed.

## 3. Reading one test step by step

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

Explanation:

- `test(...)` defines one test case.
- The text is the human-readable test name.
- `async` means the function performs operations that take time.
- `{ page }` asks Playwright for a fresh browser tab.
- `await` means: wait for this browser operation to finish before continuing.
- The page object performs the login actions.
- The two assertions verify that login really worked.

## 4. Why `await` is important

Browser operations are not instantaneous. A page must load, an input must become ready, and a click may start navigation. `await` keeps the steps in the correct order.

Incorrect:

```ts
loginButton.click();
expect(title).toHaveText('Products');
```

Correct:

```ts
await loginButton.click();
await expect(title).toHaveText('Products');
```

## 5. Auto-waiting

Playwright automatically waits before actions until an element is ready. For example, before clicking, it checks that the element exists, is visible, is stable, receives pointer events, and is enabled.

Playwright assertions also retry for a limited time. This is why you normally should not add fixed sleeps such as `waitForTimeout(5000)`.

## 6. Test isolation

Each test should be able to run by itself. A test should not depend on a previous test leaving the user logged in or putting an item in the cart.

In this project, every test starts from a fresh browser context. The `beforeEach` hook logs in again for tests that need an authenticated user.

## 7. Page Object Model

A page object is a class that stores the elements and actions for one page.

For example, `LoginPage.ts` contains:

- Username input locator
- Password input locator
- Login button locator
- `goto()` method
- `login()` method

The test says:

```ts
await loginPage.login(username, password);
```

instead of repeating three low-level browser commands in every test. This improves readability and makes selectors easier to maintain.

## 8. Configuration

`playwright.config.ts` controls the whole suite, including:

- Where tests are located
- Base website URL
- Browsers to use
- Timeouts
- Retries in CI
- Screenshots, videos, and traces on failure
- HTML and GitHub reporters

## 9. Headless, headed, UI, and debug modes

### Headless

The browser runs without a visible window. This is the default and is useful for CI.

```bash
npm test
```

### Headed

The browser window is visible.

```bash
npm run test:headed
```

### UI mode

An interactive application lets you run, filter, inspect, and replay tests.

```bash
npm run test:ui
```

### Debug mode

The test pauses and lets you move through the steps.

```bash
npm run test:debug
```

## 10. Reports and failure evidence

The configuration creates useful evidence:

- HTML report: test list, durations, errors, and attachments
- Screenshot: captured when a test fails
- Video: retained when a test fails
- Trace: recorded on the first retry in CI

Open the latest HTML report with:

```bash
npm run report
```

## 11. GitHub Actions

The workflow under `.github/workflows/playwright.yml` runs automatically after a push or pull request to `main` or `master`.

The CI machine:

1. Downloads the repository.
2. Installs Node.js dependencies.
3. Installs Playwright browsers.
4. Runs the test suite.
5. Uploads the HTML report as an artifact.

## 12. A useful mental model

Think of a Playwright test as four layers:

1. **Arrange:** Open the page and prepare the state.
2. **Act:** Perform the user action.
3. **Assert:** Check the expected result.
4. **Report:** Save evidence when something fails.

Example:

```ts
// Arrange
await loginPage.goto();

// Act
await loginPage.login('standard_user', 'secret_sauce');

// Assert
await expect(inventoryPage.pageTitle).toHaveText('Products');
```

## 13. What to learn next

After understanding this project, useful next subjects are:

- Better role-based locators such as `getByRole`
- Reusing authenticated browser state
- API testing with Playwright
- Network request mocking
- Visual screenshot comparison
- Accessibility checks
- Running tests in parallel and sharding CI jobs
