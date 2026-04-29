# AI-WOC Lite (Applied Intelligence AI-WOC)

Mobile-first MVP for shop-floor work order correction requests.

## Features
- Capture screen with image upload preview and manual entry path
- Full manual work-order + issue entry
- Built-in **Load Sample WOC** test data
- Generates:
  - Engineering Work Order Correction Report
  - Engineering email draft
- Confirmation checklist gate before sending
- Copy report and copy email actions
- Server-side `/api/send` route using Resend

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` from `.env.example` and fill values:
   - `RESEND_API_KEY`
   - `AI_WOC_FROM_EMAIL`
   - `AI_WOC_DEFAULT_TO_EMAIL` (defaults to Christophertroyhilton@gmail.com)
3. Run dev server:
   ```bash
   npm run dev
   ```

## Build
```bash
npm run build
```

## API
`POST /api/send`

JSON body:
```json
{
  "recipient": "Christophertroyhilton@gmail.com",
  "subject": "Work Order Correction Request – ...",
  "emailBody": "...",
  "reportBody": "..."
}
```

Validates required fields and sends with Resend. The correction report is appended below the email body with a clear divider.
