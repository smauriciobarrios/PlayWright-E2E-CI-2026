import { Locator, Page, expect } from "@playwright/test";

/** Page object de la pagina de inicio de Automation Exercise. */
export class AE_Home_Page {
  private readonly FEATURE_ITEMS: Locator;
  private readonly LINK_CONTACT_US: Locator;
  private readonly LINK_BRANDS_POLO: Locator;
  private readonly LINK_PRODUCTS: Locator;
  private readonly LOGGED: Locator;
  /**
   * Crea el page object y prepara los localizadores de la pagina de inicio.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.FEATURE_ITEMS = page.locator('div[class="features_items"]');
    this.LINK_CONTACT_US = page.locator('a[href="/contact_us"]');
    this.LINK_BRANDS_POLO = page.locator('a[href="/brand_products/Polo"]');
    this.LINK_PRODUCTS = page.locator('a[href="/products"]');
    this.LOGGED = page.getByText(/Logged in as/i);
  }

  /**
   * Valida que la sesión activa del usuario esté visible en la cabecera de la aplicación.
   */
  async validarSesionActiva(): Promise<void> {
    await expect(this.LOGGED).toBeVisible();
  }

  /**
   * Navega a la página de inicio y confirma que la sección de productos destacados se haya cargado.
   */
  async gotoHome(): Promise<void> {
    await this.page.goto("https://automationexercise.com/");
    await expect(this.FEATURE_ITEMS).toBeVisible();
  }

  /**
   * Abre la página de contacto de la aplicación.
   */
  async clickContactUs(): Promise<void> {
    await this.LINK_CONTACT_US.click();
  }

  /**
   * Abre la vista de productos asociados a la marca Polo.
   */
  async clickBrandPolo(): Promise<void> {
    await this.LINK_BRANDS_POLO.click();
  }

  /**
   * Comprueba que la URL actual corresponda a la categoría de productos de Polo.
   */
  async expectPoloURL(): Promise<void> {
    await expect(this.page).toHaveURL(/Polo/);
  }

  /**
   * Bloquea las solicitudes de redes publicitarias para mantener la prueba determinista.
   */
  async cerrarPublicidad(): Promise<void> {
    await this.page.route(
      /doubleclick\.net|googlesyndication\.com|googleadservices\.com|adsbygoogle|adservice\.google\.com/i,
      (route) => route.abort(),
    );
  }

  /**
   * Abre la página de productos y valida que la navegación se haya realizado correctamente.
   */
  async clickProducts(): Promise<void> {
    await this.LINK_PRODUCTS.click();
    await expect(this.page).toHaveURL(/products/);
  }
}

