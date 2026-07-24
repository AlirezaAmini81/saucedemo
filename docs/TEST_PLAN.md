# Test Plan

## Scope

The suite covers the primary customer path through authentication, product browsing, cart management, and checkout. It also includes negative authentication and form-validation scenarios.

## Environment

- Application: SauceDemo
- Default URL: `https://www.saucedemo.com`
- Browsers: Chromium, Firefox, WebKit
- Test data: Public demo accounts and synthetic checkout information

## Automated scenarios

| ID | Area | Scenario | Expected result |
|---|---|---|---|
| AUTH-01 | Authentication | Sign in with the standard account | Product catalog is displayed |
| AUTH-02 | Authentication | Sign in with an incorrect password | Credential error is displayed |
| AUTH-03 | Authentication | Sign in with a locked account | Locked-account error is displayed |
| AUTH-04 | Authentication | Sign out from the product catalog | Login screen is displayed |
| NAV-01 | Catalog | Open a product details page and return | Product details load and the user returns to the catalog |
| NAV-02 | Cart | Open the cart and continue shopping | Cart loads and the user returns to the catalog |
| CART-01 | Cart | Add a product | Cart badge and cart contents are updated |
| CART-02 | Cart | Remove a product | Product and cart badge are removed |
| CHECKOUT-01 | Checkout | Continue without a last name | Required-field validation is displayed |
| CHECKOUT-02 | Checkout | Complete checkout with valid information | Order confirmation is displayed |

## Execution behavior

- Each test starts with an isolated browser context.
- Authenticated suites perform login in `beforeEach`.
- CI retries failed tests twice and uses a single worker.
- Screenshots and videos are retained on failure.
- A trace is captured on the first retry.
