import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { checkoutCustomer, users } from '../test-data/users';

const backpackSlug = 'sauce-labs-backpack';
const backpackName = 'Sauce Labs Backpack';

test.describe('Cart and checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('adds a product to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProduct(backpackSlug);

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toContainText(backpackName);
  });

  test('removes a product from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProduct(backpackSlug);
    await inventoryPage.openCart();
    await cartPage.removeProduct(backpackSlug);

    await expect(cartPage.itemNames).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('validates required checkout form fields', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProduct(backpackSlug);
    await inventoryPage.openCart();
    await cartPage.beginCheckout();

    await checkoutPage.firstNameInput.fill('Alex');
    await checkoutPage.postalCodeInput.fill('12345');
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toContainText(
      'Last Name is required',
    );
  });

  test('submits the checkout form and completes an order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addProduct(backpackSlug);
    await inventoryPage.openCart();
    await cartPage.beginCheckout();

    await checkoutPage.fillCustomerInformation(checkoutCustomer);
    await checkoutPage.continue();

    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toHaveText(
      'Thank you for your order!',
    );
  });
});
