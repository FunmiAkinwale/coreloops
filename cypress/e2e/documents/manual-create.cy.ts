import DashboardPage from "@pages/DashboardPage";
import DocumentsPage from "@pages/DocumentsPage";

describe("Documents: Manual creation", () => {
  beforeEach(() => {
    cy.loginWithOtp();
    DashboardPage.goToDocuments();
  });

  it("creates a document manually and validates it appears", () => {
    const title = `QA Manual Doc ${Date.now()}`;
    const amount = 5000;

    DocumentsPage.createManualDocument({ title, amount });

    DocumentsPage.searchInput().type(title);
    DocumentsPage.documentRowByName(title).should("be.visible");
  });
});
