# Premium Finish Auto Detailing — website

Mobile auto detailing site, published with GitHub Pages from the `main` branch
(see `.github/workflows/static.yml`). Every push to `main` goes live in about a minute.

## Folder layout

```
index.html        Page content: text, prices, package lists, FAQ, booking form
css/styles.css    All styling. Colors and fonts are in :root at the top
js/main.js        Nav, mobile menu, scroll effects, Sedan/SUV price switch, before/after sliders
js/booking.js     Booking form: service picker, add-ons, sends requests to the CRM + email
images/           Logo, hero car, before/after and interior photos
```

## Common edits

| To change…                     | Edit                                                                 |
|--------------------------------|----------------------------------------------------------------------|
| Package prices                 | `index.html` → `#services`: `data-sedan` / `data-suv` on each `.amt-num` |
| Package or plan features       | `index.html` → the `<ul class="svc-list">` inside each card          |
| Monthly plan prices            | `index.html` → `#plans`                                              |
| Add-ons                        | `index.html` → `.addons` (price list) **and** `.addons-grid` (booking form) |
| Booking menu prices            | `index.html` → `#svcMenu` (keep in sync with the cards)              |
| Reviews                        | `index.html` → `#reviews`: copy a `<figure class="review">` block; update the 5.0 / review count |
| Instagram photo strip          | Replace `images/instagram/ig-1.jpg` … `ig-6.jpg` (square photos)     |
| Instagram / Facebook links     | Search `index.html` for `instagram.com` or `facebook.com`           |
| Before/after photos            | Replace files in `images/` (`BEFORE-1.jpg` / `AFTER-1.jpg` …)         |
| Logo                           | Replace `images/logo.png` (transparent background works best)        |
| Brand colors                   | `css/styles.css` → `:root`                                           |

## Booking requests

Submissions are saved to Supabase (`website_leads` table, read by the CRM) and
also emailed through Formspree as a backup. Connection details are in the
`<head>` of `index.html` (with an optional `supabase-config.js` override).
