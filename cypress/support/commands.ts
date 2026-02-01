Cypress.Commands.add("loginWithOtp", () => {
  const email = Cypress.env("userEmail") as string;
  cy.visit("/auth/login");

  cy.get('input[name="email"], input[type="email"][name="email"], input[placeholder*="Email"]')
    .first()
    .clear()
    .type(email);

  cy.contains("button", /login|continue|sign in/i).click();

  cy.contains(/otp|verification code|enter code/i, { matchCase: false }).should("be.visible");

  const otp = Cypress.env("otp") as string;
  if (!otp) {
    throw new Error("OTP not provided. Set CYPRESS_otp in .env or via CI secret.");
  }

  cy.get('input[type="tel"], input[inputmode="numeric"], input[name*="otp"], input[name*="code"]')
    .then(($inputs) => {
      if ($inputs.length >= 6) {
        const digits = String(otp).split("");
        for (let i = 0; i < 6; i++) {
          cy.wrap($inputs.eq(i)).type(digits[i]);
        }
      } else {
        cy.wrap($inputs.first()).type(String(otp));
      }
    });

  cy.contains("button", /verify|confirm|continue/i).click();
  cy.url().should("not.include", "/auth/login");
});
