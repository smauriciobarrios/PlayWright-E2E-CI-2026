import { Locator, Page, expect } from "@playwright/test";

/**
 * Page object para la pantalla de pago de Automation Exercise.
 */
export class AE_Payment_Page {
  private readonly NAME_ON_CARD: Locator;
  private readonly CARD_NUMBER: Locator;
  private readonly CVC: Locator;
  private readonly EXPIRATION_MONTH: Locator;
  private readonly EXPIRATION_YEAR: Locator;
  private readonly BTN_PAY_CONFIRM: Locator;
  private readonly BTN_LOGOUT: Locator;

  private readonly MENSAJE_ORDER_PLACE: Locator;

  constructor(private page: Page) {
    this.NAME_ON_CARD = page.locator('input[name="name_on_card"]');
    this.CARD_NUMBER = page.locator('input[name="card_number"]');
    this.CVC = page.locator('input[name="cvc"]');
    this.EXPIRATION_MONTH = page.locator('input[name="expiry_month"]');
    this.EXPIRATION_YEAR = page.locator('input[name="expiry_year"]');
    this.BTN_PAY_CONFIRM = page.locator("#submit");

    this.BTN_LOGOUT = page.locator('a[href="/logout"]');

    this.MENSAJE_ORDER_PLACE = page.getByText('Congratulations! Your order');
  }

  /**
   * Completa los datos de la tarjeta de crédito para poder confirmar el pago.
   *
   * @param nameCard - Nombre del titular de la tarjeta.
   * @param cardNumber - Número de la tarjeta.
   * @param cvc - Código de seguridad.
   * @param expM - Mes de vencimiento.
   * @param expY - Año de vencimiento.
   */
  async completarDatosPago(
    nameCard: string,
    cardNumber: string,
    cvc: string,
    expM: string,
    expY: string,
  ) {
    await this.NAME_ON_CARD.fill(nameCard);
    await this.CARD_NUMBER.fill(cardNumber);
    await this.CVC.fill(cvc);
    await this.EXPIRATION_MONTH.fill(expM);
    await this.EXPIRATION_YEAR.fill(expY);
  }

  /**
   * Confirma el pedido y valida que el mensaje de compra exitosa y la URL final sean correctos.
   */
  async clickPlaceOrder(): Promise<void> {
    await this.BTN_PAY_CONFIRM.click();
    await expect(this.MENSAJE_ORDER_PLACE).toBeVisible();
    await expect(this.page).toHaveURL(/payment_done/);
  }

  /**
   * Cierra la sesión del usuario y valida que se haya redirigido al login.
   */
  async logout(): Promise<void> {
    await this.BTN_LOGOUT.click();
    await expect(this.page).toHaveURL(/login/);
  }
}
