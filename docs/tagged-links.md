# Tagged links for rokiatech.co

Use these instead of the bare `rokiatech.co` so Vercel Analytics can tell you where each visit came from.
In the dashboard: **Analytics → UTM Parameters** (or filter on `utmSource` / `utmCampaign`).

Convention: `utm_source` = where the link lives, `utm_medium` = what kind of placement, `utm_campaign` = the specific application or post. Lowercase, hyphens, no spaces.

## Always-on profiles

| Where | Link |
|---|---|
| LinkedIn profile (Contact info / Featured) | `https://rokiatech.co/?utm_source=linkedin&utm_medium=profile` |
| GitHub profile README | `https://rokiatech.co/?utm_source=github&utm_medium=profile` |
| Email signature | `https://rokiatech.co/?utm_source=email&utm_medium=signature` |
| Resume (PDF) | `https://rokiatech.co/?utm_source=resume&utm_medium=pdf` |

## Job applications

One campaign per company, so you can see whether that recruiter or hiring team actually opened the site.

| Where | Link |
|---|---|
| Application form "Website" field | `https://rokiatech.co/?utm_source=application&utm_medium=form&utm_campaign=<company>` |
| Resume attached to a specific application | `https://rokiatech.co/?utm_source=resume&utm_medium=pdf&utm_campaign=<company>` |
| Cover letter | `https://rokiatech.co/?utm_source=cover-letter&utm_medium=pdf&utm_campaign=<company>` |
| Direct message to a recruiter | `https://rokiatech.co/?utm_source=linkedin&utm_medium=dm&utm_campaign=<company>` |
| Follow-up / thank-you email | `https://rokiatech.co/?utm_source=email&utm_medium=followup&utm_campaign=<company>` |

Example: `https://rokiatech.co/?utm_source=application&utm_medium=form&utm_campaign=anthropic`

You can point any of these at a specific page too, e.g. `https://rokiatech.co/press?utm_source=linkedin&utm_medium=dm&utm_campaign=jpmc`.

## Posts

| Where | Link |
|---|---|
| LinkedIn post | `https://rokiatech.co/?utm_source=linkedin&utm_medium=post&utm_campaign=<post-topic>` |
| Conference / talk slide | `https://rokiatech.co/?utm_source=talk&utm_medium=slide&utm_campaign=<event>` |

## Custom events now on the site

| Event | Fires when | Properties |
|---|---|---|
| `Chat Opened` | The "Ask Rokia" interview panel opens | none |
| `Chat Question` | A question is sent | `source` (suggestion / typed), `suggestion`, `turn` |
| `Gate Unlocked` | Correct preview password | `path` |
| `Gate Wrong Password` | Wrong preview password | `path` |
| `Contact Submitted` / `Contact Sent` / `Contact Failed` | Contact form submit and its result | `status` on failure |
| `Press Link Click` | Outbound link on /press | `item`, `href` |

Typed chat questions are never sent to analytics, only whether a suggestion was used.

Caveats:
- `PasswordGate` isn't mounted on any page right now, so the `Gate *` events stay at zero until it's wrapped around `/work` or `/research` again.
- Paste the full link; some forms strip query strings. If a campaign never shows up, test the form with a dummy submission.
- Your own visits count. Check the site in a private window, or filter out your country/device when numbers are small.
- `Contact Failed` will dominate in production until the contact API is moved off `localhost:3001` (see CLAUDE.md).
