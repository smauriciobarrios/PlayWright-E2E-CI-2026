import { test, expect } from "@playwright/test";

import { integradorUser } from "../../data/integrador/user";
import { AE_Signup_Login_Page } from "../../pages/integrador/AE_Signup_Login.page";

/**
 * Suite para validar el flujo de registro de un nuevo usuario en Automation Exercise.
 */
test.describe("[SUITE 01] Registrar Usuario", () => {
  /**
   * Registra el inicio de la suite.
   */
  test.beforeAll(async () => {
    console.log(
      "[SUITE] Inicializando Suite - Registrar Usuario =====================================",
    );
  });

  /**
   * Registra el cierre de la suite.
   */
  test.afterAll(async () => {
    console.log(
      "[SUITE] Finalizando Suite - Registrar Usuario =====================================",
    );
  });

  /**
   * Registra el inicio de cada caso de prueba.
   */
  test.beforeEach(async () => {
    console.log(
      "[TEST] Inicializando test--------------------------------------------------------------",
    );
  });

  /**
   * Registra el cierre de cada caso de prueba.
   */
  test.afterEach(async () => {
    console.log(
      "[TEST] Finalizando test --------------------------------------------------------------",
    );
  });

  /**
   * Valida el registro completo de un usuario nuevo y guarda el estado de autenticación cuando el registro se completa.
   */
  test("[TEST 01] Registrar Usuario", async ({ page }) => {
    const signup = new AE_Signup_Login_Page(page);

    //Paso 1: Navegar a la pagina https://automationexercise.com/.
    await test.step("PASO 1: Navegar a la pagina principal", async () => {
      await signup.goto();
      await signup.signupLogin();
      await expect(page).toHaveURL(/login/);
    });

    //Paso 2: Ingresa un nombre y un correo
    let usuarioYaExiste = false;

    await test.step("PASO 2: Ingresa un nombre y un correo", async () => {
      usuarioYaExiste = await signup.newUserSignup(
        integradorUser.name,
        integradorUser.email,
      );

      if (usuarioYaExiste) {
        console.log(
          "[WARNING] Fallback aplicado porque el usuario ya estaba registrado.",
        );
      }
    });

    if (usuarioYaExiste) {
      return;
    }

    //Paso 3: Completa todos los datos obligatorios para crear cuenta
    await test.step("PASO 3: Completar formulario crear cuenta", async () => {
      await signup.accountInformation(integradorUser.password);

      await page.locator("#days").selectOption("2");
      await page.locator("#months").selectOption("2");
      await page.locator("#years").selectOption("2002");

      await signup.addressInformation(
        integradorUser.firstName,
        integradorUser.lastName,
        integradorUser.address,
        integradorUser.state,
        integradorUser.city,
        integradorUser.zipcode,
        integradorUser.mobileNumber,
      );
    });

    //Paso 4: Validar cuenta creada correctamente
    await test.step("PASO 4: Validar cuenta creada correctamente", async () => {
      await expect(page.getByText("Account Created!")).toBeVisible();
      await expect(page).toHaveURL(/account_created/);
      await page.context().storageState({
        path: "auth/estado_guardado_auth.json",
      });
    });
  });
});
