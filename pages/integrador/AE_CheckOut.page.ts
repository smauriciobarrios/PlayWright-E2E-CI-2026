import { Locator, Page, expect } from "@playwright/test";

/**
 * Page object para la vista de checkout de Automation Exercise.
 */
export class AE_CheckOut_Page {
  private readonly ADDRESS_DELIVERY: Locator;
  private readonly BILLING_ADDRES: Locator;
  private readonly BTN_PLACE_ORDER: Locator;

  constructor(private page: Page) {
    this.ADDRESS_DELIVERY = page.locator("#address_delivery");
    this.BILLING_ADDRES = page.locator("#address_invoice");
    this.BTN_PLACE_ORDER = page.locator('a[href="/payment"]');
  }

  /**
   * Verifica que los datos de envío y facturación del pedido estén visibles.
   */
  async validarDetalleEnvio(): Promise<void> {
    await this.ADDRESS_DELIVERY.isVisible();
    await this.BILLING_ADDRES.isVisible();
  }

  /**
   * Procede al flujo de pago desde la pantalla de checkout.
   */
  async clickPlaceOrder(): Promise<void> {
    await this.BTN_PLACE_ORDER.click();
    await expect(this.page).toHaveURL(/payment/);
  }
}
