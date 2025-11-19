var greetings = [
    "Hello :)",
    "Hi :)",
    "Hey :)",
    "I am a good me"
]

window.addEventListener("DOMContentLoaded", () => {
    const greetingElement = document.getElementById("randomiseGreeting");
    if (greetingElement) {
        greetingElement.innerText = greetings[Math.floor(Math.random() * greetings.length)];
    }
});