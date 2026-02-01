import LoginPage from "@pages/LoginPage";
import OtpPage from "@pages/OtpPage";

describe("Auth: Login + OTP", () => {
  it("logs in using email and OTP", () => {
    const email = Cypress.env("userEmail") as string;
    //const otp = Cypress.env("otp") as string;

    expect(email, "Missing Cypress env: userEmail").to.be.a("string").and.not.be.empty;
    //expect(otp, "Missing Cypress env: otp").to.be.a("string").and.not.be.empty;

    LoginPage.visit();
    LoginPage.login(email);
    OtpPage.enterOtpAndSubmit();

    cy.url().should("not.include", "/auth/login");
  });
});
