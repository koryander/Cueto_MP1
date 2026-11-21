// close a dialog when its backdrop is clicked
function closeOnOutsideClick(dialog) {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        const outside =
            e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top || e.clientY > rect.bottom;
        if (outside) dialog.close();
    });
}

// NEWSLETTER POPUP
(() => {
    const popup = document.getElementById("newsletter-popup");
    const form = document.getElementById("newsletter-popup-form");
    const emailInput = document.getElementById("newsletter-popup-email");
    const emailField = document.getElementById("newsletter-popup-field");
    const emailError = document.getElementById("newsletter-popup-email-error");
    const consentInput = document.getElementById("newsletter-popup-consent");
    const consentError = document.getElementById("newsletter-popup-consent-error");
    const closeBtn = document.getElementById("newsletter-popup-close");
    const openBtns = document.querySelectorAll(".newsletter-button");

    if (!popup || !form) return;

    // [^\s@] = not whitespace and not @
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function clearErrors() {
        emailField.classList.remove("has-error");
        emailError.hidden = true;
        consentError.hidden = true;
    }

    function open() {
        clearErrors();
        popup.showModal();
    }

    function close() {
        popup.close();
    }

    openBtns.forEach((btn) => btn.addEventListener("click", open));
    closeBtn.addEventListener("click", close);
    closeOnOutsideClick(popup);

    // wrong email warning goes away as user corrects it
    emailInput.addEventListener("input", () => {
        if (emailField.classList.contains("has-error")) clearErrors();
    });

    consentInput.addEventListener("change", () => {
        if (consentInput.checked) consentError.hidden = true;
    });

    form.addEventListener("submit", (e) => {
        // no actual submit
        e.preventDefault();
        clearErrors();

        const emailValid = EMAIL_RE.test(emailInput.value.trim());
        const consentGiven = consentInput.checked;

        if (!emailValid) {
            emailField.classList.add("has-error");
            emailError.hidden = false;
            emailInput.focus();
        }

        if (!consentGiven) {
            consentError.hidden = false;
            if (emailValid) consentInput.focus();
        }

        if (!emailValid || !consentGiven) return;

        form.innerHTML =
            '<p class="newsletter-popup-success" role="status">' +
            "Thank you for subscribing. You will receive our next news by email." +
            "</p>";
    });
})();

// LEGAL POPUPS (Terms, Privacy)
function setupLegalPopup(popupId, triggerSelector) {
    const popup = document.getElementById(popupId);
    if (!popup) return;

    const scrollArea = popup.querySelector(".terms-popup-scroll");
    const printBtn = popup.querySelector(".terms-popup-print");
    const closeBtn = popup.querySelector(".terms-popup-close");
    const xBtn = popup.querySelector(".terms-popup-x");

    function open() {
        popup.showModal();
        scrollArea.scrollTop = 0;
    }

    function close() {
        popup.close();
    }

    document.addEventListener("click", (e) => {
        if (!e.target.closest(triggerSelector)) return;
        e.preventDefault();
        open();
    });

    closeBtn.addEventListener("click", close);
    xBtn.addEventListener("click", close);
    printBtn.addEventListener("click", () => window.print());
    closeOnOutsideClick(popup);
}

setupLegalPopup("terms-popup", "[data-open-terms]");
setupLegalPopup("privacy-popup", "[data-open-privacy]");