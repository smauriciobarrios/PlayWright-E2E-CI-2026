import { Page, Locator, expect } from "@playwright/test";

/**
 * Page object para el flujo de registro y login de Automation Exercise.
 */
export class AE_Signup_Login_Page {
  private readonly opcsignuplogin: Locator;
  private readonly name: Locator;
  private readonly email: Locator;
  private readonly btnsignup: Locator;
  private readonly pass: Locator;
  private readonly rbmr: Locator;
  private readonly firstname: Locator;
  private readonly lastname: Locator;
  private readonly address: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobilenumber: Locator;
  private readonly btncrearcuenta: Locator;

  constructor(private page: Page) {
    this.opcsignuplogin = page.getByRole("link", { name: " Signup / Login" });
    this.name = page.getByRole("textbox", { name: "Name" });
    this.email = page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
    this.btnsignup = page.getByRole("button", { name: "Signup" });
    this.pass = page.locator("#password");
    this.rbmr = page.locator("#id_gender1");
    this.firstname = page.locator("#first_name");
    this.lastname = page.locator("#last_name");
    this.address = page.locator("#address1");
    this.state = page.locator("#state");
    this.city = page.locator("#city");
    this.zipcode = page.locator("#zipcode");
    this.mobilenumber = page.locator("#mobile_number");
    this.btncrearcuenta = page.getByRole("button", { name: "Create Account" });
  }

  /**
   * Abre la página principal de Automation Exercise.
   */
  async goto() {
    await this.page.goto("https://automationexercise.com/");
  }

  /**
   * Accede a la sección de signup/login desde la home page.
   */
  async signupLogin() {
    await this.opcsignuplogin.click();
  }

  /**
   * Registra un nuevo usuario y devuelve si el email ya existe en la aplicación.
   *
   * @param name - Nombre del usuario a registrar.
   * @param email - Correo electrónico a validar.
   * @returns `true` si el usuario ya estaba registrado, `false` en caso contrario.
   */
  async newUserSignup(name: string, email: string): Promise<boolean> {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.btnsignup.click();

    const duplicateMessage = this.page.getByText(
      "Email Address already exist!",
    );

    try {
      await duplicateMessage.waitFor({ state: "visible", timeout: 3000 });
      console.log("[FALLBACK] El usuario ya existe, se omite el registro.");
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Completa la información de cuenta básica con contraseña y género.
   *
   * @param pass - Contraseña elegida para el usuario.
   */
  async accountInformation(pass: string) {
    await this.pass.fill(pass);
    await this.rbmr.click();
  }

  /**
   * Completa la información de dirección del usuario y crea la cuenta.
   *
   * @param firstname - Nombre del usuario.
   * @param lastname - Apellido del usuario.
   * @param address - Dirección principal.
   * @param state - Estado o provincia.
   * @param city - Ciudad.
   * @param zipcode - Código postal.
   * @param mobilenumber - Número de teléfono móvil.
   */
  async addressInformation(
    firstname: string,
    lastname: string,
    address: string,
    state: string,
    city: string,
    zipcode: string,
    mobilenumber: string,
  ) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.address.fill(address);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobilenumber.fill(mobilenumber);

    await this.btncrearcuenta.click();
  }
}
