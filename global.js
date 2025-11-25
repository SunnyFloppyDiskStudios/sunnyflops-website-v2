// lenis
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// navigation
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navTo(where) {
    window.location.href = where;
}

// sidebar stuff
document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    document.getElementById("yearText").textContent = year.toString();
});

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

// cursor following element
const move = document.getElementById("cursor-follow");

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    move.animate({
        left: `${clientX}px`,
        top: `${clientY}px`

    }, {duration: 50, fill: "forwards"})
}