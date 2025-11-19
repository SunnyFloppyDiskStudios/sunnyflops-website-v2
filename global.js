// lenis
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// navbar
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".sidebar-base ul");
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
    document.getElementById("yearText").textContent = `• ${year}`;
});

// page
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// cursor following element
const move = document.getElementById("cursor-follow");

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    move.animate({
        left: `${clientX}px`,
        top: `${clientY}px`

    }, {duration: 50, fill: "forwards"})
}

// sidebar stuff
const sbb = document.querySelector('.sidebar-base');
const sbe = document.querySelector('.sidebar-expanded');
const arrow = document.getElementById('arrow');
const sbLogo = document.getElementById('sb-logo');

function openSidebar() {
    arrow.textContent = '<';
    sbLogo.style.transform = "rotate(0deg)";
    sbe.style.transform = "translateX(50px)";
}

function closeSidebar() {
    arrow.textContent = '>';
    sbLogo.style.transform = "rotate(-90deg)";
    sbe.style.transform = "translateX(-450px)";
}

sbb.addEventListener('mouseenter', openSidebar);
sbb.addEventListener('mouseleave', closeSidebar);

sbe.addEventListener('mouseenter', openSidebar);
sbe.addEventListener('mouseleave', closeSidebar);
