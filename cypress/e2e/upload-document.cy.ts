import LoginPage from "@pages/LoginPage";
import OtpPage from "@pages/OtpPage";
import DashboardPage from "@pages/DashboardPage";
import DocumentsPage from "@pages/DocumentsPage";

describe("Documents: Upload", () => {
  it("uploads a document successfully", () => {
    const email = Cypress.env("userEmail") as string;
    expect(email, "Missing Cypress env: userEmail").to.be.a("string").and.not.be.empty;

    // 1) Login
    LoginPage.visit();
    LoginPage.login(email);
    OtpPage.enterOtpAndSubmit();

    // 2) Select project (Dashboard)
    DashboardPage.selectProject("Funmi Qa Project");

    // 3) Upload document
    DocumentsPage.uploadDocument("cypress/fixtures/files/sample.pdf");
  });
});
