class DocumentsPage {
  addButton() {
    // The "+" button in your top bar (often icon-only)
    // Try to prefer aria-label or title if available
    return cy.get('button[data-slot="button"]').contains("+").parent().then($el => cy.wrap($el));
  }

  // More reliable: click the actual plus button by icon container
  // If your "+" is inside a button without text, use this:
  plusButton() {
    return cy.contains('button[data-slot="button"]', /^Add$/)
  }

  addNewOption() {
    return cy.contains('[role="menuitem"]', /add new/i, { matchCase: false });
  }

  fileInput() {
    return cy.get('input[type="file"]', { timeout: 15000 });
  }

  confirmAddButton() {
    return cy.contains("button", /^add$/i);
  }

  successToast() {
    return cy.contains("Your document has been uploaded", { matchCase: false });
  }

  uploadDocument(filePath: string) {
    cy.wait(10000);
    // Click Add (plus) button
    this.plusButton().should("be.visible").click();

    // Click "Add new" from dropdown
    this.addNewOption().should("be.visible").click();

    // Choose file
    this.fileInput().should("exist").selectFile(filePath, { force: true });

    // Click Add
    this.confirmAddButton().should("be.enabled").click();

    // Assert success
    this.successToast().should("be.visible");
  }
}

export default new DocumentsPage();
