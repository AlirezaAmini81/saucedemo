import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('opens a product details page and returns to the product list', async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.openProduct('Sauce Labs Backpack');

    await expect(page).toHaveURL(/\/inventory-item\.html/);
    await expect(
      page.locator('[data-test="inventory-item-name"]'),
    ).toHaveText('Sauce Labs Backpack');

    await inventoryPage.backToProductsButton.click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('opens the cart and continues shopping', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');

    await cartPage.continueShoppingButton.click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});
