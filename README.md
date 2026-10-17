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
- v2.0.0 Chrome release highlight, roadmap, and FAQ
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

## Publishing

The production website is served by GitHub Pages from `main` at
https://toolkit.krivyo.com/. There is no build step. Before publishing, check
desktop/mobile layout, keyboard focus, links, and the mocked form tests.
The feature form must be live before the extension feedback link is released.

## Feature ideas and collaboration

`feature-request.html` collects a name, email, feature idea, and optional collaboration interest. It reuses the existing support API contract; collaboration is included explicitly in the stored message, so no backend schema change is assumed. Nothing is sent until the visitor submits. Tests intercept requests locally rather than creating real support tickets.

The extension campaign runs from 17 October 2026 08:12:12 UTC until 16 November 2026 08:12:12 UTC. The page stays usable afterward; the extension returns to its review prompt. Publish the website page before releasing the extension link. The campaign adds a static page and reuses the existing support service; the production domain, sitemap, and hosting configuration are unchanged.

## Version 2.0.0 website update

The Chrome Web Store release was verified live on 17 October 2026. Faster metadata extraction is the new feature highlighted in the hero, release announcement, feature list, roadmap and FAQs. Existing analysis and export features are retained without New badges. The Edge install link is retained without claiming its version matches Chrome. There are no speed benchmarks or bulk-editing claims. The landing-page privacy summary describes automatic local metadata processing.
