# Coreloops Cypress POM Framework (TypeScript)

This repository contains Cypress E2E tests built with the Page Object Model (POM) pattern in **TypeScript**.

## ✅ Covered Workflows
- Document upload (image, PDF, CSV import)
- Manual document creation
- Document download
- Negative case: invalid file format

## Tech
- Cypress + TypeScript
- Mochawesome (HTML report)
- GitHub Actions CI

---

## Setup

### 1) Install
```bash
npm install
npm i --save-dev @types/mailparser
npm i -D imapflow mailparser
npm i -D dotenv
```

### 2) Create `.env`
Copy `.env.example` to `.env` and fill in values.

```bash
cp .env.example .env
```

**Important:** `.env` is ignored by git.

---

## Running Tests

### Open Cypress UI
```bash
npm run cy:open
```

### Run headless
```bash
npm run cy:run
```

### Run headless + Mochawesome report
```bash
npm run test:ci
```

Report output:
- `cypress/reports/report.html`

---

## OTP Note
Login requires OTP. For full automation (CI), you must provide OTP using:
- `CYPRESS_otp` env variable (temporary)
OR request a staging OTP bypass/magic link for testing.

---

## CI
GitHub Actions runs on every push/PR and uploads the mochawesome HTML report as an artifact.

---

## Customization Notes
UI selectors vary by app. Update the selectors in `cypress/pages/*.ts` to match the DOM
(ideally use stable `data-cy` attributes).
