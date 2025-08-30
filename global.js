// navbar

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".navbar ul");
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


function getCurrentYear() {
    return new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
    const year = getCurrentYear();
    document.getElementById("footerText").textContent = `${year}. Sunny Floppy Disk Studios`;
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;

    const scrollVal = 105;
    let scale = 0;

    if (scrollY > scrollVal) {
        scale = (scrollY - scrollVal) / (scrollVal - scrollVal);
        scale = Math.min(scale, 1);
    }

    const maxOffset = 10;
    const offset = scale * maxOffset;

    navbar.style.marginTop = `${offset}px`;
    navbar.style.width = `calc(100% - ${offset * 2}px)`;

    const radius = scale * 10;
    navbar.style.borderRadius = `${radius}px`;
});