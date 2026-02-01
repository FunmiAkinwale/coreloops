class LoginPage {
  visit(): void {
    cy.visit("/auth/login");
  }

  emailInput(): Cypress.Chainable<JQuery<HTMLInputElement>> {
    return cy.get<HTMLInputElement>('input[name="email"]').first();
  }

  loginButton(): Cypress.Chainable<JQuery<HTMLButtonElement>> {
    return cy.contains("button", /^Login$/i);
  }

  login(email: string): void {
    expect(email, "Missing Cypress env: userEmail").to.be.a("string").and.not.be.empty;
    this.emailInput().clear().type(email);
    this.loginButton().click();
  }
}

export default new LoginPage();
