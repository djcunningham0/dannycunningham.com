document.addEventListener("DOMContentLoaded", () => {
  const footnoteRefs = document.querySelectorAll("a.footnote-ref");
  const delay = 250; // ms before showing popup
  const gap = 8;     // px spacing from reference

  footnoteRefs.forEach(ref => {
    const id = ref.getAttribute("href")?.replace("#", "");
    const footnote = id ? document.getElementById(id) : null;
    if (!footnote) return;

    const popup = document.createElement("div");
    popup.className = "footnote-popup";
    popup.innerHTML = footnote.innerHTML;
    document.body.appendChild(popup);

    let timer = null;

    const show = () => {
      const rect = ref.getBoundingClientRect();
      popup.style.display = "block";
      popup.style.visibility = "hidden"; // measure off-screen

      const box = popup.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let top = rect.bottom + scrollY + gap;
      let left = rect.left + scrollX;

      if (left + box.width > scrollX + window.innerWidth - gap) {
        left = scrollX + window.innerWidth - box.width - gap;
      }
      if (top + box.height > scrollY + window.innerHeight - gap) {
        top = rect.top + scrollY - box.height - gap;
      }

      popup.style.top = `${top}px`;
      popup.style.left = `${left}px`;
      popup.style.visibility = "visible";

      requestAnimationFrame(() => {
        popup.classList.add("show");
      });
    };

    const hide = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      popup.classList.remove("show");
      setTimeout(() => {
        if (!popup.classList.contains("show")) {
          popup.style.display = "none";
        }
      }, 150); // match CSS transition
    };

    ref.addEventListener("mouseenter", () => {
      timer = setTimeout(show, delay);
    });

    ref.addEventListener("mouseleave", hide);
  });
});
