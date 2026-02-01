import "dotenv/config";
import { defineConfig } from "cypress";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";

async function fetchLatestOtpFromGmail(params: {
  user: string;
  pass: string;
  host: string;
  port: number;
  from?: string;
  subject?: string;
  timeoutMs?: number;
}) {
  const timeoutMs = params.timeoutMs ?? 60_000;
  const start = Date.now();

  const client = new ImapFlow({
    host: params.host,
    port: params.port,
    secure: true,
    auth: { user: params.user, pass: params.pass },
  });

  try {
    await client.connect();

    while (Date.now() - start < timeoutMs) {
      const lock = await client.getMailboxLock("INBOX");
      try {
        // Search recent unseen emails first (fast + avoids stale OTP)
        const searchCriteria: any = { unseen: true };
        if (params.from) searchCriteria.from = params.from;
        if (params.subject) searchCriteria.subject = params.subject;

        const uids = await client.search(searchCriteria);

        // If none unseen, fallback to recent messages (some systems mark as seen)
        const targetUids = Array.isArray(uids) && uids.length ? uids : await client.search(["ALL"]);

        if (Array.isArray(targetUids) && targetUids.length) {
          const latestUid = targetUids[targetUids.length - 1];

          const msg = await client.fetchOne(latestUid, { source: true });
          if (msg && msg.source) {
            const parsed = await simpleParser(msg.source);
            const body = `${parsed.text || ""}\n${parsed.html || ""}`;

            // Extract a 6-digit OTP (adjust if yours differs)
            const match = body.match(/\b(\d{6})\b/);
            if (match) return match[1];
          }
        }
      } finally {
        lock.release();
      }

      // Wait a bit before polling again
      await new Promise((r) => setTimeout(r, 2000));
    }

    throw new Error("OTP not found within timeout");
  } finally {
    await client.logout().catch(() => {});
  }
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "https://coreloops-v2-350156031212.europe-west2.run.app",
    env: {
      userEmail: process.env.CYPRESS_userEmail || "",
      otp: process.env.CYPRESS_otp || "",
    },
    async setupNodeEvents(on, config) {
      on("task", {
        async getOtpFromGmail() {
          return fetchLatestOtpFromGmail({
            user: process.env.EMAIL_USER || "",
            pass: process.env.EMAIL_APP_PASSWORD || "",
            host: process.env.EMAIL_HOST || "imap.gmail.com",
            port: Number(process.env.EMAIL_PORT || 993),
            from: process.env.OTP_FROM,
            subject: process.env.OTP_SUBJECT,
            timeoutMs: 60_000,
          });
        },
      });

      return config;
    },
  },
});
