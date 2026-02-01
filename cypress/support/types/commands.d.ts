declare namespace Cypress {
  interface Chainable {
    /**
     * Logs in using email + OTP. Requires env vars:
     * - userEmail
     * - otp
     */
    loginWithOtp(): Chainable<void>;
  }
}

export {};
