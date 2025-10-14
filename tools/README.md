# tools/send-contact-email.js

A small Node.js helper to resend contact form JSON payloads via SMTP using nodemailer.

Why this exists
- Your Supabase function currently uses Resend for sending emails in Deno. If you want to resend a saved submission or test deliveries from your local machine without changing the app, this tool helps.

How to use
1. Install dependencies (from repo root):

```powershell
cd tools; npm install
```

2. Create `.env.local` in the repo root (or the `tools` folder) from `.env.local.example` and fill SMTP credentials.

3. Run with a JSON file containing the contact payload (same shape your Supabase function expects):

```powershell
node send-contact-email.js ../path/to/contact.json
```

Or pipe JSON via stdin:

```powershell
cat contact.json | node send-contact-email.js
```

Required env vars
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SEND_TO

Notes
- This does not change your existing app or functions. It's a standalone helper.
- For testing, you can use Ethereal (https://ethereal.email/) SMTP credentials and the script will print the preview URL when available.
