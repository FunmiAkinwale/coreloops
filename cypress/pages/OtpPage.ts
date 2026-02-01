class OtpPage {
  // UI marker for OTP screen
  heading() {
  return cy.contains(/2 factor authentication|secure code|two-factor/i, { matchCase: false });
}

  // OTP inputs: supports either 6 boxes or 1 input
  otpInputs() {
    return cy.get(
      'input[name="verificationCode"], input[type="tel"], input[inputmode="numeric"], input[name*="otp"], input[name*="code"]',
      { timeout: 15000 }
    );
  }

  otpField() {
  return cy.get(
    'input[name="verificationCode"], input[placeholder*="secure" i], input[placeholder*="code" i], input[name="code"], input[name="otp"], input[type="text"], input[data-slot="input"]',
    { timeout: 15000 }
  ).first();
}


  otpInputField() {
  // from your UI: label "Secure Code" + one input box
  return cy.get('input[name="verificationCode"], input[name="otp"], input[name="code"], input[placeholder*="code" i], input[placeholder*="secure" i]')
           .first();
}

  verifyButton() {
    return cy.contains("button", /Login|confirm|continue/i);
  }

  /**
   * Public method: waits for OTP screen, then enters OTP and submits.
   * Strategy:
   * - If Cypress.env("otp") exists, use it
   * - Else fetch from Gmail via cy.task("getOtpFromGmail")
   */
  enterOtpAndSubmit() {
    this.heading().should("be.visible");

    const envOtp = Cypress.env("otp") as string | undefined;

    if (envOtp && String(envOtp).trim().length > 0) {
      return this.typeOtp(String(envOtp)).then(() => this.verifyButton().click());
    }

    return cy.task("getOtpFromGmail").then((otp) => {
      const code = String(otp || "").trim();
      expect(code, "OTP fetched from email").to.match(/^\d{6}$/);

      return this.typeOtp(code).then(() => this.verifyButton().click());
    });
  }

  /**
   * Helper: types OTP into either 6 separate inputs or a single input
   */
  private typeOtp(code: string) {
    return this.otpInputs().then(($inputs) => {
      if ($inputs.length >= 6) {
        [...code].slice(0, 6).forEach((digit, i) => {
          cy.wrap($inputs.eq(i)).clear().type(digit);
        });
      } else {
        cy.wrap($inputs.first()).clear().type(code);
      }
    });
  }
}

export default new OtpPage();
