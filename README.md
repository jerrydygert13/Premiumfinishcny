# Premium Finish Auto Detailing — website

Mobile auto detailing site, published with GitHub Pages from the `main` branch
(see `.github/workflows/static.yml`). Every push to `main` goes live in about a minute.

## Pages

```
index.html        Home — short overview: hero, Instagram strip, packages (brief),
                  maintenance plans, how it works, 3 reviews, extra services, why us
services.html     Full packages with Sedan/SUV switch, add-ons, monthly plans, FAQ
gallery.html      Before/after sliders, interiors, Instagram strip, all reviews
book.html         Booking request form (sends to the CRM + email)
```

## Other files

```
css/styles.css    All styling. Colors and fonts are in :root at the top
js/main.js        Used by every page: nav, mobile menu, scroll effects,
                  Sedan/SUV price switch, before/after sliders
js/booking.js     book.html only: service picker, add-ons, sending requests
images/           Logo, hero car, before/after and interior photos
images/instagram/ The 6 square photos in the Instagram strip
```

The nav bar and footer are copied into all 4 pages. If you change one, change it
in every page.

## Common edits

| To change…                     | Edit                                                                 |
|--------------------------------|----------------------------------------------------------------------|
| Package prices                 | `services.html` (`data-sedan` / `data-suv` on each `.amt-num`) **and** the short cards in `index.html` (`#home-packages`) **and** the booking menu in `book.html` (`#svcMenu`) |
| Package or plan features       | `services.html` → the `<ul class="svc-list">` inside each card       |
| Monthly plan prices            | `services.html` → `#plans`, plus `index.html` → `#home-feature`, plus `book.html` → `#svcMenu` |
| Add-ons                        | `services.html` → `#addons` **and** `book.html` → `.addons-grid` (plus `index.html` → `#beyond` if listed there) |
| Reviews                        | `gallery.html` → `#reviews` (all) and `index.html` → `#home-reviews` (3 picks). Copy a `<figure class="review">` block; update the 5.0 / review count |
| Instagram photo strip          | Replace `images/instagram/ig-1.jpg` … `ig-6.jpg` (square photos)     |
| Instagram / Facebook links     | Search all pages for `instagram.com` or `facebook.com`               |
| Before/after photos            | Replace files in `images/` (`BEFORE-1.jpg` / `AFTER-1.jpg` …)         |
| Logo                           | Replace `images/logo.png` (transparent background works best)        |
| Brand colors                   | `css/styles.css` → `:root`                                           |

## Booking requests

Submissions are saved to Supabase (`website_leads` table, read by the CRM) and
also emailed through Formspree as a backup. Connection details are in the
`<head>` of `book.html` (with an optional `supabase-config.js` override).

Links like `book.html?pkg=exec&veh=suv` open the form with that service already
picked (`pkg` = `express`, `exec`, `prem`, `basic` or `premplan`).

## After changing CSS or JS

Bump the `?v=` number on the `styles.css`, `main.js` and `booking.js` links in
all 4 pages (any new number works). Browsers keep old copies of these files, and
the new number makes them download the updated ones.
