import { expect, test } from "@playwright/test";

import {
  generateDemoCookie,
  getAuthStatePath,
  printCookies,
} from "../../helpers/utils/auth.helper";
import { loginCases } from "../../data/login-case.data-driven";
import { InventoryPage } from "../../pages/saucedemo/inventary.page";
import { LoginPage } from "../../pages/saucedemo/login.page";

const authStatePath = getAuthStatePath("standard_auth.json");

test.describe("Taller 6 - Estado, cookies y data-driven", () => {
  test("Generar storageState, reutilizar sesión y validar cookies", async ({page,browser}) => {
    const login = new LoginPage(page);

    await test.step("Ir a login y autenticar usuario estándar", async () => {
      await login.goto();
      await login.login("standard_user", "secret_sauce");
      await login.validateLogin();
    });

    await test.step("Guardar storageState en carpeta auth", async () => {
      await page.context().storageState({ path: authStatePath });
      console.log(`[AUTH] storageState generado en: ${authStatePath}`);
    });

    await test.step("Reutilizar storageState en un nuevo contexto", async () => {
      const context = await browser.newContext({ storageState: authStatePath });
      const newPage = await context.newPage();
      const inventory = new InventoryPage(newPage);
      await inventory.goto();
      await inventory.expectLoaded();
      await context.close();
    });

    await test.step("Leer cookies del contexto actual", async () => {
      const cookies = await page.context().cookies();
      printCookies(cookies);
    });

    await test.step("Agregar cookie demo y validar existencia", async () => {
      const demoCookie = generateDemoCookie();
      await page.context().addCookies([demoCookie]);
      const cookiesAfter = await page.context().cookies();
      const found = cookiesAfter.find((c) => c.name === demoCookie.name);
      expect(found?.value).toBe("ok");
      printCookies(cookiesAfter);
    });
  });

  for (const c of loginCases) {
    test(`Data-driven login: ${c.name}`, async ({ page }) => {
      const login = new LoginPage(page);
      const inventory = new InventoryPage(page);

      await test.step("Ir a login", async () => {
        await login.goto();
      });

      await test.step(`Ejecutar login con usuario: ${c.username}`, async () => {
        await login.login(c.username, c.password);
      });
      if (c.shouldPass) {
        await test.step("Validar login exitoso", async () => {
          await login.validateLogin();
          await inventory.expectLoaded();
        });
      } else {
        await test.step("Validar error esperado", async () => {
          await login.expectLoginErrorContains(c.expectedError ?? /error/i);
        });
      }
    });
  }
});
