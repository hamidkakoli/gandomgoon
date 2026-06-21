// Gandomgoon Studio
console.log("Gandomgoon Studio Loaded");

// ===== Scroll Animation =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
});

document.querySelectorAll(".fade-up").forEach((el) => {
    observer.observe(el);
});

// ===== Back To Top Button =====
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.left = "20px";
topBtn.style.padding = "12px 16px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "999";
topBtn.style.background = "#d4af37";
topBtn.style.color = "#000";

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
        });
    });
}

// ===== Active Nav Link =====
(() => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });
})();

// ===== Portfolio / Services Category Filter =====
const tabButtons = document.querySelectorAll(".tab-btn");
const filterItems = document.querySelectorAll("[data-category]");

if (tabButtons.length) {
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            tabButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            filterItems.forEach((item) => {
                if (filter === "all" || item.dataset.category === filter) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });
}

// ===== Lightbox for Portfolio =====
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<button class="lightbox-close">✕</button><img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

document.querySelectorAll(".portfolio-item .img-wrap img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
    });
});

function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

// ===== FAQ Accordion =====
document.querySelectorAll(".faq-question").forEach((q) => {
    q.addEventListener("click", () => {
        const item = q.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");
        const isOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach((other) => {
            other.classList.remove("open");
            other.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isOpen) {
            item.classList.add("open");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// ===== Pricing Package Pre-select on Contact Page =====
(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan) {
        const radio = document.querySelector(`input[name="package"][value="${plan}"]`);
        if (radio) radio.checked = true;
    }
})();

// ===== Contact Form Submission (front-end only) =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!name || !phone) {
            return;
        }

        document.getElementById("formFields").style.display = "none";
        document.querySelector(".form-success").style.display = "block";
        document.querySelector(".form-success").scrollIntoView({ behavior: "smooth", block: "center" });
    });
}
