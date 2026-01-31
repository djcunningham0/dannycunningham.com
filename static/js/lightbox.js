// Lightbox for article images
(function () {
    "use strict";

    let overlay = null;
    let previouslyFocused = null;

    function createOverlay() {
        overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Image lightbox");

        const closeBtn = document.createElement("button");
        closeBtn.className = "lightbox-close";
        closeBtn.setAttribute("aria-label", "Close lightbox");
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", closeLightbox);

        const img = document.createElement("img");
        img.className = "lightbox-image";
        img.setAttribute("alt", "");

        const caption = document.createElement("div");
        caption.className = "lightbox-caption";

        overlay.appendChild(closeBtn);
        overlay.appendChild(img);
        overlay.appendChild(caption);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                closeLightbox();
            }
        });
    }

    function openLightbox(src, alt, captionText) {
        if (!overlay) {
            createOverlay();
        }

        previouslyFocused = document.activeElement;

        const img = overlay.querySelector(".lightbox-image");
        img.src = src;
        img.alt = alt || "";

        const caption = overlay.querySelector(".lightbox-caption");
        if (captionText) {
            caption.textContent = captionText;
            caption.style.display = "block";
        } else {
            caption.textContent = "";
            caption.style.display = "none";
        }

        document.body.style.overflow = "hidden";
        overlay.classList.add("active");

        // Focus close button for keyboard accessibility
        setTimeout(function () {
            overlay.querySelector(".lightbox-close").focus();
        }, 50);
    }

    function closeLightbox() {
        if (!overlay) return;

        overlay.classList.remove("active");
        document.body.style.overflow = "";

        if (previouslyFocused) {
            previouslyFocused.focus();
            previouslyFocused = null;
        }
    }

    function getCaptionText(img) {
        const figure = img.closest("figure");
        if (figure) {
            const figcaption = figure.querySelector("figcaption");
            if (figcaption) {
                return figcaption.textContent.trim();
            }
        }
        return null;
    }

    function handleKeydown(e) {
        if (!overlay || !overlay.classList.contains("active")) return;

        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "Tab") {
            // Trap focus within lightbox
            e.preventDefault();
            overlay.querySelector(".lightbox-close").focus();
        }
    }

    function init() {
        // Attach click handlers to article images, excluding profile photos
        const images = document.querySelectorAll(
            "article img:not(.about-photo):not(.sidebar-photo)"
        );

        images.forEach(function (img) {
            img.style.cursor = "zoom-in";
            img.setAttribute("tabindex", "0");
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", "Click to enlarge image");

            img.addEventListener("click", function () {
                const caption = getCaptionText(this);
                openLightbox(this.src, this.alt, caption);
            });

            img.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const caption = getCaptionText(this);
                    openLightbox(this.src, this.alt, caption);
                }
            });
        });

        document.addEventListener("keydown", handleKeydown);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
