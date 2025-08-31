// lenis
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// navbar
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".sidebar ul");
    const highlight = document.createElement("div");
    highlight.classList.add("nav-highlight");
    nav.appendChild(highlight);

    let timeout;

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("mouseenter", () => {
            const rect = link.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            highlight.style.width = `${rect.width}px`;
            highlight.style.left = `${rect.left - navRect.left}px`;
            highlight.style.opacity = 1;

            clearTimeout(timeout);
        });

        link.addEventListener("mouseleave", () => {
            timeout = setTimeout(() => {
                highlight.style.opacity = 0;
            }, 150);
        });
    });

    nav.addEventListener("mouseleave", () => {
        timeout = setTimeout(() => {
            highlight.style.opacity = 0;
        }, 150);
    });
});


// footer
function getCurrentYear() {
    return new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    const year = getCurrentYear();
    document.getElementById("footerText").textContent = `${year}. Sunny Floppy Disk Studios`;
});