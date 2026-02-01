import DashboardPage from "@pages/DashboardPage";
import DocumentsPage from "@pages/DocumentsPage";

describe("Documents: Download", () => {
  beforeEach(() => {
    cy.loginWithOtp();
    DashboardPage.goToDocuments();
  });

  it("downloads a document (basic UI assertion)", () => {
    const existingDocName = "Invoice";

    DocumentsPage.searchInput().type(existingDocName);
    DocumentsPage.documentRowByName(existingDocName).should("be.visible");
    DocumentsPage.downloadDocument(existingDocName);

    cy.contains(/download started|downloading|export/i).should("exist");
  });
});
