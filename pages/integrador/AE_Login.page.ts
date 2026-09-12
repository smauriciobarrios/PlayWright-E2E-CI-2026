import { Locator, Page, expect } from "@playwright/test";

/** Page object de la pagina de inicio de Automation Exercise. */
export class AE_Login_Page {
  private readonly EMAIL_ADDRESS: Locator;
  private readonly PASSWORD: Locator;
  private readonly BUTTON_LOGIN: Locator;
  private readonly LOGGED_INDICATOR: Locator;

  /**
   * Crea el page object y prepara los localizadores de la pagina de inicio.
   *
   * @param page - Instancia de pagina de Playwright.
   */
  constructor(private page: Page) {
    this.EMAIL_ADDRESS = page.locator('form[action="/login"] input[name="email"]');
    this.PASSWORD = page.locator('[name="password"]');
    this.BUTTON_LOGIN = page.locator('form[action="/login"] button[type="submit"]');
    this.LOGGED_INDICATOR = page.getByText(/Logged in as/i);
  }

  /**
   * Navega a la pantalla de autenticación del sitio.
   *
   * @returns Promise que se resuelve cuando la página de login termina de cargar.
   */
  async gotoLogin(): Promise<void> {
    await this.page.goto("https://automationexercise.com/login");
  }

  /**
   * Abre la página principal de Automation Exercise.
   */
  async goto(): Promise<void> {
    await this.page.goto("https://automationexercise.com");
  }

  /**
   * Ingresa las credenciales del usuario y realiza el inicio de sesión.
   *
   * @param email - Correo electrónico con el que se autentica el usuario.
   * @param password - Contraseña asociada al usuario.
   */
  async login(email: string, password: string): Promise<void> {
    await this.EMAIL_ADDRESS.fill(email);
    await this.PASSWORD.fill(password);
    await this.BUTTON_LOGIN.click();
  }

  /**
   * Verifica que el usuario quedó autenticado mostrando el indicador de sesión activa.
   */
  async validateLogin(): Promise<void> {
    await expect(this.LOGGED_INDICATOR).toBeVisible();
  }

  /**
   * Bloquea los recursos publicitarios para evitar interferencias durante la ejecución del test.
   */
  async cerrarPublicidad(): Promise<void> {
    await this.page.route(
      /doubleclick\.net|googlesyndication\.com|googleadservices\.com|adsbygoogle|adservice\.google\.com/i,
      (route) => route.abort(),
    );
  }
}
