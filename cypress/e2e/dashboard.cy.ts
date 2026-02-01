import LoginPage from "@pages/LoginPage";
import OtpPage from "@pages/OtpPage";
import DashboardPage from "@pages/DashboardPage";

describe("Dashboard: Select project", () => {
  it("selects Funmi Qa Project", () => {
    const email = Cypress.env("userEmail") as string;
    expect(email, "Missing Cypress env: userEmail").to.be.a("string").and.not.be.empty;

    // Step 1: login
    LoginPage.visit();
    LoginPage.login(email);
    OtpPage.enterOtpAndSubmit();

    // Step 2: select project
    DashboardPage.selectProject("Funmi Qa Project");
    DashboardPage.openDocuments();
  });
});
