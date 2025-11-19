var greetings = [
    "Hello :)",
    "Hi :)",
    "Hey :)",
]

window.addEventListener("DOMContentLoaded", () => {
    const greetingElement = document.getElementById("randomiseGreeting");
    if (greetingElement) {
        greetingElement.innerText = greetings[Math.floor(Math.random() * greetings.length)];
    }
});