import { Locator, Page, expect } from "@playwright/test";

/** Page object de la pagina de inicio de Automation Exercise. */
export class AE_Products_Page {
  private readonly SEARCH_PRODUCTS: Locator;
  private readonly BTN_SEARCH_PRODUCTS: Locator;
  private readonly DIV_CART_MODAL: Locator;
  private readonly PRODUCT_JEAN_33: Locator;
  private readonly PRODUCT_JEAN_35: Locator;
  private readonly BTN_CONTINUE_SHOPPING: Locator;
  private readonly CATEGORY_WOMEN: Locator;
  private readonly CATEGORY_WOMEN_TOP: Locator;
  private readonly PRODUCT_TOP_5: Locator;
  private readonly PRODUCT_TOP_6: Locator;
  private readonly LINK_VIEW_CART: Locator;
  private readonly PRODUCTO_BUSCADO = "Jean";

  /**
   * Crea el page object y prepara los localizadores de la pagina de inicio.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.SEARCH_PRODUCTS = page.locator("#search_product");
    this.BTN_SEARCH_PRODUCTS = page.locator("#submit_search");
    this.PRODUCT_JEAN_33 = page
      .locator('a[data-product-id="33"].btn.btn-default.add-to-cart:visible')
      .first();
    this.PRODUCT_JEAN_35 = page
      .locator('a[data-product-id="35"].btn.btn-default.add-to-cart:visible')
      .first();
    this.DIV_CART_MODAL = page.locator("#cartModal");
    this.BTN_CONTINUE_SHOPPING = page.locator(
      'button.btn.btn-success.close-modal.btn-block[data-dismiss="modal"]',
    );
    this.CATEGORY_WOMEN = page.locator(
      'a[data-toggle="collapse"][data-parent="#accordian"][href="#Women"]',
    );
    this.CATEGORY_WOMEN_TOP = page.locator('a[href="/category_products/2"]');
    this.PRODUCT_TOP_5 = page
      .locator('a[data-product-id="5"].btn.btn-default.add-to-cart:visible')
      .first();
    this.PRODUCT_TOP_6 = page
      .locator('a[data-product-id="6"].btn.btn-default.add-to-cart:visible')
      .first();
    this.LINK_VIEW_CART = page.locator('a[href="/view_cart"]').first();
  }

  /**
   * Ingresa el criterio de búsqueda para localizar productos por nombre.
   */
  async ingresarProducto(): Promise<void> {
    await this.SEARCH_PRODUCTS.fill(this.PRODUCTO_BUSCADO);
  }

  /**
   * Ejecuta la búsqueda y valida que la URL refleje el criterio aplicado.
   */
  async buscarProducto(): Promise<void> {
    await this.BTN_SEARCH_PRODUCTS.click();
    await expect(this.page).toHaveURL(
      new RegExp(`search=${this.PRODUCTO_BUSCADO}`),
    );
  }

  /**
   * Agrega el primer producto Jean disponible al carrito y espera a que aparezca el modal.
   */
  async clickAgregarCarritoCompras_P1(): Promise<void> {
    await this.PRODUCT_JEAN_33.click();
    await this.expectViewCartVisible();
  }

  /**
   * Agrega el segundo producto Jean disponible al carrito y espera a que aparezca el modal.
   */
  async clickAgregarCarritoCompras_P2(): Promise<void> {
    await this.PRODUCT_JEAN_35.click();
    await this.expectViewCartVisible();
  }

  /**
   * Agrega el primer producto de la categoría Women -> Top al carrito.
   */
  async clickAgregarCarritoCompras_P3(): Promise<void> {
    await this.PRODUCT_TOP_5.click();
    await this.expectViewCartVisible();
  }

  /**
   * Agrega el segundo producto de la categoría Women -> Top al carrito.
   */
  async clickAgregarCarritoCompras_P4(): Promise<void> {
    await this.PRODUCT_TOP_6.click();
    await this.expectViewCartVisible();
  }

  /**
   * Verifica que el modal del carrito sea visible luego de agregar un producto.
   */
  async expectViewCartVisible(): Promise<void> {
    await expect(this.DIV_CART_MODAL).toBeVisible({ timeout: 5000 });
  }

  /**
   * Continúa comprando desde el modal del carrito para agregar más productos.
   */
  async btnContinuarCompra(): Promise<void> {
    await this.BTN_CONTINUE_SHOPPING.click();
  }

  /**
   * Abre la categoría Women -> Tops y valida que se haya cargado la sección correcta.
   */
  async abrirCategoriaMujeresTop(): Promise<void> {
    await this.CATEGORY_WOMEN.click();
    await this.CATEGORY_WOMEN_TOP.click();
    await expect(this.page).toHaveURL(/category_products\/2/);
  }

  /**
   * Abre la vista del carrito de compras mediante el enlace View Cart.
   */
  async goToCart(): Promise<void> {
    await this.LINK_VIEW_CART.click();
    await expect(this.page).toHaveURL(/view_cart/);
  }
}
