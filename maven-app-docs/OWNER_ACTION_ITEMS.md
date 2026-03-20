# Owner Action Items

Everything below requires the project owner's login or credentials. The team cannot proceed on these items without the owner.

---

## 1. Claim the Stripe Test Sandbox

The Stripe test environment was created but hasn't been claimed yet. Without claiming it, test payments won't work properly.

**What to do:** Visit the link below and log in with your Stripe account to claim the sandbox.

**Link:** https://dashboard.stripe.com/claim_sandbox/YWNjdF8xUmhDVHRCdU85eXltalljLDE3NzI3MzU3Nzcv100DpdmjkTI

**Deadline:** Before April 27, 2026

---

## 2. Store Kie.ai API Credentials (Song Generation)

These credentials need to be entered in **Settings > Secrets** in the Maven admin panel.

| Secret Name | Value | Purpose |
|---|---|---|
| `KIE_AI_API_KEY` | `5a97d41b1ada0f497c7424b4b9623713` | Kie.ai API key for song generation |
| `KIE_AI_VOICE_ID` | `hpp4J3VqNfWAUOO0d1Us` | Maria's voice ID on Kie.ai |
| `KIE_AI_API_ENDPOINT` | `https://api.kie.ai/api/v1/jobs/createTask` | Kie.ai task creation endpoint |

---

## 3. Get ElevenLabs API Key

The team has ElevenLabs login credentials but we need the **API key** (not the login password) stored as a secret.

**What to do:**
1. Log in to ElevenLabs at https://elevenlabs.io with: `tim@businessasaforceforgood.ca`
2. Go to **Profile Settings** (click your avatar, top-right) > **API Keys**
3. Copy the API key
4. Enter it in Maven admin panel **Settings > Secrets** as `ELEVENLABS_API_KEY`

---

## 4. Stripe Live Keys (When Ready for Real Payments)

Once Stripe KYC verification is complete and you're ready to accept real payments:

1. Go to Stripe Dashboard > Developers > API Keys
2. Copy the **Live Secret Key** and **Live Publishable Key**
3. Enter them in Maven admin panel **Settings > Payment**

A 99% discount promo code is available for live mode testing (minimum order $0.50 USD).

---

## 5. Mailchimp API Key (Optional — For Email List Sync)

The system logs show `[Mailchimp] Missing MAILCHIMP_API_KEY`. If you want email list syncing:

1. Log in to Mailchimp
2. Go to **Account > Extras > API Keys**
3. Create a new key
4. Enter it in Maven admin panel **Settings > Secrets** as `MAILCHIMP_API_KEY`

---

*Last updated: March 18, 2026*
