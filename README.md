# AppSheet Toolkit Website

Official public website for AppSheet Toolkit.

## Live site

https://toolkit.krivyo.com/

## Included

- Product landing page for Extract and Analyze workflows
- Product tour with five in-page visuals
- Chrome and Edge install links
- Feature, use-case, and workflow sections covering Snapshot Comparison, App Intelligence, App Health, and Technical Documentation
- Real product screenshot from the AppSheet editor
- v1.9.1 roadmap and FAQ
- Privacy Policy
- Support and feedback form
- Custom 404 page

## Structure

```
index.html      Landing page
privacy.html    Privacy Policy
support.html    Support form and FAQ
404.html        Not-found page
styles.css      All site styles
script.js       Nav, scroll reveals, product tour tabs
assets/         Icons, screenshots, Open Graph image
assets/shots/   Product tour images (also used on the Chrome Web Store)
```

## Updating the product tour

The existing extraction tour images live in `assets/shots/` as WebP at 1280x800.
They illustrate the extraction workflow; full-width Analyze tools are described separately on the landing page.
Each slide is a `<figure class="tour-slide">` in `index.html`; add or remove a
slide by adding or removing a matching `.tour-tab` button and `tour-panel-N` id.

## Local preview

Open `index.html` directly, or run a small local server:

```
python3 -m http.server 8000
```

## Notes

- No build step, no dependencies, no tracking scripts.
- The support form posts to a Google Apps Script endpoint defined in `support.html`.

## Selected user testimonials

The landing page includes three manually selected Chrome Web Store excerpts after
Features and before the product tour and final install CTA. These are static
quotes, not a live feed. There is no rating summary, fetching, or added script.

The excerpts and review dates were checked against the live reviews tab on
16 October 2026. Matias's quote retains the original straight apostrophe in
`App's` and has no final period. Display names use title case. Individual review
URLs were not verified, so each card and "See all reviews" open the live tab:
https://chromewebstore.google.com/detail/appsheet-toolkit/mdbiahphbngmmjmggekiccggefpjablj/reviews

When editing, preserve the reviewer's wording and attribution. Confirm any new
excerpt on the store before updating it; never invent individual review IDs.

## Staging status

This change is prepared on `feature/selected-user-testimonials` for review only.
Inspection found only `main` and `backup-old-main` on the remote, the generated
GitHub Pages build workflow, and one `github-pages` environment with deployments
from `main`. No separate staging target or preview deployment was verified.

Do not deploy this branch to the existing GitHub Pages environment or change the
production domain, canonical links, sitemap, or hosting settings. Use the local
preview above until a separate staging target and its branch mapping are verified.
There is no build step: preview the static files and check desktop/mobile layout,
keyboard focus, quote attribution, and all four reviews links before release.
