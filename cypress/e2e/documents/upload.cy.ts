import DashboardPage from "@pages/DashboardPage";
import DocumentsPage from "@pages/DocumentsPage";

describe("Documents: Upload (Image, PDF, CSV) + Negative format", () => {
  beforeEach(() => {
    cy.loginWithOtp();
    DashboardPage.goToDocuments();
  });

  it("uploads an image", () => {
    DocumentsPage.uploadFile("cypress/fixtures/files/sample.png");
    DocumentsPage.assertUploadSuccess();
  });

  it("uploads a PDF", () => {
    DocumentsPage.uploadFile("cypress/fixtures/files/sample.pdf");
    DocumentsPage.assertUploadSuccess();
  });

  it("imports a CSV", () => {
    DocumentsPage.uploadFile("cypress/fixtures/files/sample.csv");
    DocumentsPage.assertUploadSuccess();
  });

  it("rejects an invalid file format (negative case)", () => {
    DocumentsPage.uploadNegativeInvalidFormat("cypress/fixtures/files/invalid.exe");
  });
});
