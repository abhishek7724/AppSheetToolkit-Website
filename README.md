# AppSheet Toolkit Website

Official public website for AppSheet Toolkit.

## Live site

https://abhishek7724.github.io/AppSheetToolkit-Website/

## Included

- Product landing page (tables, slices, and views)
- Product tour with five in-page visuals
- Chrome and Edge install links
- Feature, use-case, and workflow sections
- Real product screenshot from the AppSheet editor
- Roadmap and FAQ
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

The five tour images live in `assets/shots/` as WebP at 1280x800. They match the
Chrome Web Store screenshots, so replacing them keeps both surfaces consistent.
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
