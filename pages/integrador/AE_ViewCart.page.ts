import { Locator, Page, expect } from "@playwright/test";

/** Page object de la vista del carrito de compras. */
export class AE_ViewCart_Page {
  private readonly PRODUCT_JEAN_33: Locator;
  private readonly PRODUCT_JEAN_35: Locator;
  private readonly PRODUCT_TOP_5: Locator;
  private readonly PRODUCT_TOP_6: Locator;
  private readonly BTN_PROCEED_TO_CHECKOUT: Locator;

  /**
   * Crea el page object y prepara los localizadores del carrito.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.PRODUCT_JEAN_33 = page.locator('a[href="/product_details/33"]');
    this.PRODUCT_JEAN_35 = page.locator('a[href="/product_details/35"]');
    this.PRODUCT_TOP_5 = page.locator('a[href="/product_details/5"]');
    this.PRODUCT_TOP_6 = page.locator('a[href="/product_details/6"]');
    this.BTN_PROCEED_TO_CHECKOUT = page.getByText("Proceed To Checkout");
  }

  /**
   * Verifica que la URL actual corresponda a la vista del carrito de compras.
   */
  async expectViewCartURL(): Promise<void> {
    await expect(this.page).toHaveURL(/view_cart/);
  }

  /**
   * Confirma que los cuatro productos agregados al carrito estén visibles.
   */
  async validarProductosSeleccionados(): Promise<void> {
    await expect(this.PRODUCT_JEAN_33).toBeVisible();
    await expect(this.PRODUCT_JEAN_35).toBeVisible();
    await expect(this.PRODUCT_TOP_5).toBeVisible();
    await expect(this.PRODUCT_TOP_6).toBeVisible();
  }

  /**
   * Avanza desde el carrito hacia el proceso de checkout.
   */
  async clickProceedToCheckout(): Promise<void> {
    await this.BTN_PROCEED_TO_CHECKOUT.click();
    await expect(this.page).toHaveURL(/checkout/);
  }
}
