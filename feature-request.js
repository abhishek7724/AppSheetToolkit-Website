(() => {
    "use strict";
    // Use exactly the existing support API contract. Collaboration is included
    // in message so it is retained even if the backend ignores unknown fields.
    const SUPPORT_API_URL = "https://script.google.com/macros/s/AKfycbxqVL1KfVZTbfGHdUpxW7a05rPg8tgUGQpA75XaWvpBqnHYHaL1VWWXt0Vd_79C3IjP/exec";
    const form = document.getElementById("featureRequestForm");
    if (!form) return;
    const button = document.getElementById("featureSubmit"), status = document.getElementById("featureStatus");
    const name = form.elements.namedItem("name"), email = form.elements.namedItem("email"), idea = form.elements.namedItem("idea"), collaborate = form.elements.namedItem("collaborate");
    let submitting = false;
    for (const field of [name, email, idea]) field.addEventListener("input", () => field.setCustomValidity(""));
    form.addEventListener("submit", async event => {
        event.preventDefault();
        if (submitting) return;
        name.value = name.value.trim(); email.value = email.value.trim();
        name.setCustomValidity(name.value ? "" : "Please enter your name.");
        idea.setCustomValidity(idea.value.trim() ? "" : "Please describe your feature idea.");
        if (!form.checkValidity()) { form.reportValidity(); return; }
        const payload = {
            name: name.value, email: email.value, browser: "", extensionVersion: "",
            requestType: "Feature Request",
            message: `Feature idea:\n${idea.value.trim()}\n\nInterested in collaborating: ${collaborate.checked ? "Yes — you may contact me about collaborating." : "No"}`
        };
        submitting = true; button.disabled = true; button.textContent = "Sending…";
        status.className = "feature-request-status"; status.textContent = "";
        const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 20000);
        try {
            const response = await fetch(SUPPORT_API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload), signal: controller.signal });
            const result = await response.json();
            if (!response.ok || result?.success !== true) throw new Error("Not confirmed");
            status.className = "feature-request-status success";
            const reference = typeof result.ticketId === "string" || typeof result.ticketId === "number" ? ` Reference: ${result.ticketId}` : "";
            status.textContent = "Thank you! Your idea has been sent." + reference;
            form.reset();
        } catch {
            status.className = "feature-request-status error";
            status.textContent = "We couldn’t confirm your submission. Your idea is still here—please try again in a moment.";
        } finally {
            clearTimeout(timer); submitting = false; button.disabled = false; button.textContent = "Send idea";
        }
    });
})();
