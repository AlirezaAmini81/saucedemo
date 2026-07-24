# Automated Test Cases

This file describes the intent of each automated test in plain language.

| ID | Area | Scenario | Expected result |
|---|---|---|---|
| AUTH-01 | Login | Log in with the standard user | Product page is displayed |
| AUTH-02 | Login | Log in with an incorrect password | A credential error is displayed |
| AUTH-03 | Login | Log in with a locked-out account | A locked-out error is displayed |
| AUTH-04 | Login | Log out from the product page | Login form is displayed again |
| NAV-01 | Navigation | Open Backpack details and go back | User returns to the product list |
| NAV-02 | Navigation | Open the cart and continue shopping | User returns to the product list |
| CART-01 | Cart | Add Backpack to the cart | Badge shows 1 and item appears in cart |
| CART-02 | Cart | Remove Backpack from the cart | Item and cart badge disappear |
| FORM-01 | Checkout form | Submit without a last name | Required-field error is displayed |
| E2E-01 | Checkout | Complete a valid purchase flow | Order confirmation is displayed |
