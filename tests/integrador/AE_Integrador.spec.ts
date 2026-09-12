import { expect, test } from "@playwright/test";

import { getAuthStatePath } from "../../helpers/integrador/auth.helper";

import { integradorUser } from "../../data/integrador/user";
import { datosTarjeta } from "../../data/integrador/payment";

import { AE_Login_Page } from "../../pages/integrador/AE_Login.page";
import { AE_Home_Page } from "../../pages/integrador/AE_Home.page";
import { AE_Products_Page } from "../../pages/integrador/AE_Products.page";
import { AE_ViewCart_Page } from "../../pages/integrador/AE_ViewCart.page";
import { AE_CheckOut_Page } from "../../pages/integrador/AE_CheckOut.page";
import { AE_Payment_Page } from "../../pages/integrador/AE_Payment.page";

const authStatePath = getAuthStatePath("estado_guardado_auth.json");

/**
 * Suite integral que cubre login, compra, checkout, pago y cierre de sesión.
 */
test.describe("[SUITE 02] Flujo Integral: Login -> Compra -> Checkout -> Payment -> LogOut", () => {
  /**
   * Registra el inicio de la suite.
   */
  test.beforeAll(async () => {
    console.log(
      "[SUITE] Inicializando Suite  ===================================================================================",
    );
  });

  /**
   * Registra el cierre de la suite.
   */
  test.afterAll(async () => {
    console.log(
      "[SUITE] Finalizando Suite  ===================================================================================",
    );
  });

  /**
   * Registra el inicio de cada caso de prueba.
   */
  test.beforeEach(async ({ page }) => {
    //await new AE_Login_Page(page).cerrarPublicidad();
    console.log(
      "[TEST] Inicializando test ------------------------------------------------------------------------------------",
    );
  });

  /**
   * Registra el cierre de cada caso de prueba.
   */
  test.afterEach(async () => {
    console.log(
      "[TEST] Finalizando test --------------------------------------........................------------------------",
    );
  });

  test.describe("[SUITE 02] Flujo Integral: Login -> Compra -> Checkout -> Payment -> LogOut", () => {
    /**
     * Valida el login exitoso y persiste el estado autenticado para reutilizarlo en el flujo de compra.
     */
    test("[TEST 02] Login exitoso", async ({ page }) => {
      const login = new AE_Login_Page(page);

      await test.step("PASO 1: Ir a login y autenticar", async () => {
        await login.gotoLogin();
        await login.login(integradorUser.email, integradorUser.password);
        await login.validateLogin();
      });

      await test.step("PASO 2: Guardar storageState en carpeta auth", async () => {
        await page.context().storageState({ path: authStatePath });
        console.log(`[AUTH] storageState generado en: ${authStatePath}`);
      });
    });

    /**
     * Ejecuta el flujo integral de compra, checkout, pago y cierre de sesión reutilizando el storageState guardado.
     */
    test("[TEST 03] Compra -> Checkout -> Payment -> LogOut", async ({
      page,
      browser,
    }) => {
      //Paso 0: Cargar estado autentificado guardado.
      const context = await browser.newContext({ storageState: authStatePath });
      const newPage = await context.newPage();

      const homePage = new AE_Home_Page(newPage);
      const productPage = new AE_Products_Page(newPage);
      const viewCartPage = new AE_ViewCart_Page(newPage);
      const checkOutPage = new AE_CheckOut_Page(newPage);
      const paymentPage = new AE_Payment_Page(newPage);

      //cerrar publicidad:
      await new AE_Login_Page(newPage).cerrarPublicidad();

      //Paso 1: Navegar a la pagina https://automationexercise.com/.
      await test.step("PASO 1: Navegar a la pagina principal", async () => {
        await homePage.gotoHome();
        await homePage.validarSesionActiva();
      });

      //Paso 2: Navegar a productos
      await test.step("PASO 2: Navegar a productos ", async () => {
        await homePage.clickProducts();
      });

      //Paso 3: Buscar producto 'Jean' y agregar 2 productos al carrito
      await test.step("PASO 3: Buscar producto 'JEAN' ", async () => {
        await productPage.ingresarProducto();
        await productPage.buscarProducto();
      });

      //Paso 4: Agregar 2 productos al carrito
      await test.step("PASO 4: Agregar 2 productos JEAN al carrito", async () => {
        await productPage.clickAgregarCarritoCompras_P1();
        await productPage.btnContinuarCompra();
        await productPage.clickAgregarCarritoCompras_P2();
        await productPage.btnContinuarCompra();
      });

      //Paso 5: Buscar el boton “View Cart” y validar que sea visible, luego dar click en “View Cart”.
      await test.step("PASO 5: Buscar productos WOMEN -> TOP", async () => {
        await productPage.abrirCategoriaMujeresTop();
      });

      //Paso 6: Click en “View Cart”.
      await test.step("PASO 6: Agregar 2 productos WOMEN-TOP al carrito", async () => {
        await productPage.clickAgregarCarritoCompras_P3();
        await productPage.btnContinuarCompra();
        await productPage.clickAgregarCarritoCompras_P4();
        await productPage.btnContinuarCompra();
      });

      //Paso 7: Navegar al carrito de compras
      await test.step("PASO 7: Navegar al carrito de compras y validar productos seleccionados", async () => {
        await productPage.goToCart();
        await viewCartPage.validarProductosSeleccionados();
      });

      //Paso 8: Proceder con el Check Out”.
      await test.step("PASO 8: Proceder con el Check Out", async () => {
        await viewCartPage.clickProceedToCheckout();
      });

      //Paso 9: Click en “View Cart”.
      await test.step("PASO 9: Valida dirección de envío y facturación", async () => {
        await checkOutPage.validarDetalleEnvio();
      });

      //Paso 10: Confirma Orden de Compra
      await test.step("PASO 10: Confirma Orden de Compra", async () => {
        await checkOutPage.clickPlaceOrder();
      });

      //Paso 11: Completa información de tarjeta de pago
      await test.step("PASO 11: Completa información de tarjeta de pago", async () => {
        await paymentPage.completarDatosPago(
          datosTarjeta.nameCard,
          datosTarjeta.cardNumber,
          datosTarjeta.cvc,
          datosTarjeta.expM,
          datosTarjeta.expY,
        );
      });

      //Paso 12: Confirma Pago
      await test.step("PASO 12: Presionar Boton 'Place Order' ", async () => {
        await paymentPage.clickPlaceOrder();
      });

      //Paso 12: Cerrar sesión
      await test.step("PASO 13: Cerrar Sesión'", async () => {
        await paymentPage.logout();
      });
    });
  });
});
