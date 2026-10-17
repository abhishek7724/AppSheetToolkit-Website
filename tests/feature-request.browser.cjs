"use strict";
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const { chromium } = require(process.env.APPSHEET_PLAYWRIGHT_PATH || "playwright");
const site = path.resolve(__dirname, ".."), artifacts = path.join(site, "test-artifacts");
(async () => {
    let browser;
    try {
        browser = await chromium.launch({ headless: true, ...(process.env.APPSHEET_BROWSER_PATH ? { executablePath: process.env.APPSHEET_BROWSER_PATH } : {}) });
        const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
        const submissions = []; let mode = "success";
        await context.route(/^https?:\/\//, async route => {
            const u = new URL(route.request().url());
            if (u.hostname === "script.google.com") {
                assert.equal(route.request().method(), "POST");
                assert.match(route.request().headers()["content-type"], /^text\/plain/);
                submissions.push(JSON.parse(route.request().postData()));
                await new Promise(resolve => setTimeout(resolve, 50));
                return route.fulfill({ contentType: "application/json", status: mode === "http-error" ? 500 : 200, body: JSON.stringify(mode === "success" ? { success: true, ticketId: "TEST-123" } : { success: false }) });
            }
            if (u.origin !== "https://toolkit.krivyo.com") return route.abort();
            const file = path.resolve(site, "." + u.pathname);
            if (!file.startsWith(site + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({ status: 404, body: "Not found" });
            const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" }[path.extname(file)] || "application/octet-stream";
            return route.fulfill({ contentType: mime, body: fs.readFileSync(file) });
        });
        const page = await context.newPage(); await page.goto("https://toolkit.krivyo.com/feature-request.html?source=extension");
        assert.equal(submissions.length, 0, "Opening the page must not submit personal information");
        assert.equal(await page.locator('[name="collaborate"]').isChecked(), false);
        await page.locator("#featureSubmit").click(); assert.equal(submissions.length, 0);
        await page.locator('[name="name"]').fill("   "); await page.locator('[name="email"]').fill("not-an-email"); await page.locator('[name="idea"]').fill("   ");
        await page.locator("#featureSubmit").click(); assert.equal(submissions.length, 0);
        fs.mkdirSync(artifacts, { recursive: true });
        await page.locator('[name="name"]').fill("Ada Tester"); await page.locator('[name="email"]').fill("tester@example.test"); await page.locator('[name="idea"]').fill("Help me review changes before a release.\nKeep the report easy to share.");
        await page.screenshot({ path: path.join(artifacts, "feature-form-desktop.png"), fullPage: true });
        await page.evaluate(() => {
            const form = document.getElementById("featureRequestForm");
            form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
            form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });
        await page.waitForFunction(() => document.getElementById("featureStatus").classList.contains("success"));
        assert.equal(submissions.length, 1, "Duplicate submit must not create duplicate tickets");
        assert.deepEqual(Object.keys(submissions[0]).sort(), ["name", "email", "browser", "extensionVersion", "requestType", "message"].sort());
        assert.equal(submissions[0].requestType, "Feature Request"); assert.match(submissions[0].message, /Interested in collaborating: No$/);
        assert.equal(await page.locator('[name="idea"]').inputValue(), "");
        await page.locator('[name="name"]').fill("Ada Tester"); await page.locator('[name="email"]').fill("tester@example.test"); await page.locator('[name="idea"]').fill("I would like to help test new features."); await page.locator('[name="collaborate"]').check();
        mode = "http-error"; await page.locator("#featureSubmit").click();
        await page.waitForFunction(() => document.getElementById("featureStatus").classList.contains("error"));
        assert.equal(await page.locator('[name="idea"]').inputValue(), "I would like to help test new features."); assert.equal(await page.locator('[name="collaborate"]').isChecked(), true);
        mode = "unconfirmed"; await page.locator("#featureSubmit").click();
        await page.waitForFunction(() => !document.getElementById("featureSubmit").disabled); assert.equal(await page.locator('[name="idea"]').inputValue(), "I would like to help test new features.");
        mode = "success"; await page.locator("#featureSubmit").click();
        await page.waitForFunction(() => document.getElementById("featureStatus").classList.contains("success")); assert.match(submissions.at(-1).message, /Interested in collaborating: Yes/);
        assert.equal(await page.locator('[name="collaborate"]').isChecked(), false);
        await page.setViewportSize({ width: 375, height: 900 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.evaluate(() => window.scrollTo({top:0,behavior:"instant"}));
        await page.screenshot({ path: path.join(artifacts, "feature-form-mobile.png"), fullPage: true });
        await page.locator('a[href="privacy.html#voluntary-feedback"]').click();
        assert.equal(await page.locator("#voluntary-feedback").count(), 1);
        console.log("PASS: feature form desktop/mobile, required fields, unchecked optional collaboration, existing support contract with explicit Yes/No, duplicate prevention, confirmed success only, error/retry preservation and privacy link. All submissions mocked; no real tickets created.");
    } catch (error) { console.error(error.stack); process.exitCode = 1; }
    finally { if (browser) await browser.close(); }
})();
