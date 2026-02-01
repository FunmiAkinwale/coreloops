class DashboardPage {
  projectDropdown() {
    return cy.contains('button[aria-haspopup="menu"]', /project\s*\d+/i);
  }

  projectMenuItem(projectName: string) {
    return cy.contains('[role="menuitem"]', projectName, { matchCase: false });
  }

  selectProject(projectName: string) {
    this.projectDropdown().should("be.visible").click();
    this.projectMenuItem(projectName).should("be.visible").click();

    cy.contains('button[aria-haspopup="menu"]', projectName, { matchCase: false })
      .should("be.visible");
  }

  dashboardMenu() {
    return cy.contains('button[aria-haspopup="menu"]', 'Dashboard', { timeout: 10000 });
  }

  openDocuments() {
    // Break chain: alias then click
    this.dashboardMenu()
      .should("be.visible")
      .as("dashboardBtn");

    cy.get("@dashboardBtn").click({ force: true });

    // Wait for Radix menu (portal)
    cy.get('[role="menu"]', { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.contains('[role="menuitem"]', /^Documents$/i)
          .scrollIntoView()
          .click({ force: true });
      });

    // Light assertion
    cy.contains(/documents/i).should("be.visible");
  }
}

export default new DashboardPage();