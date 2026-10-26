// greeter
let greetings = [
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

// animator
const spinner = document.getElementById("home-spinner");

// spinner animations
let rotation = 0;
let rotationSpeed = 120;
let targetRotationSpeed = rotationSpeed;
let lastTime = performance.now();

let scale = 1;
let targetScale = 1;
let scaleVelocity = 0;

let translateSpeed = 0;
let translateYOffset = 0;

let finishedLoading = false;
let finishAnimStage = 0;

function animateSpinner(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    const stiffness = 100;
    const damping = 10;

    rotationSpeed += (targetRotationSpeed - rotationSpeed) * 0.03;

    if (finishedLoading) {
        rotationSpeed += 5;

        if (finishAnimStage === 0) {
            targetScale = 0.8;
            if (scale <= 0.82) {
                finishAnimStage = 1;
            }
        } else if (finishAnimStage === 1) {
            targetScale = 1.5;
            if (scale >= 1.45) {
                finishAnimStage = 2;
            }
        } else if (finishAnimStage === 2) {
            targetScale = 0.8;
            if (scale <= 0.85) {
                finishAnimStage = 3;
            }
        } else if (finishAnimStage === 3) {
            targetScale = 1;

            translateSpeed += 75 * deltaTime;
            translateYOffset += translateSpeed * deltaTime;

            if (Math.abs(scale - 1) < 0.02) {
                finishAnimStage = 4;
            }
        } else if (finishAnimStage === 4) {
            translateSpeed += 500 * deltaTime;
            translateYOffset -= translateSpeed * deltaTime;

            if (translateYOffset < -5000) {
                spinner.remove();
                finishAnimStage = 5;
            }
        }
    }

    if (finishAnimStage < 5) {
        scaleVelocity += (targetScale - scale) * stiffness * deltaTime;
        scaleVelocity *= Math.exp(-damping * deltaTime);
        scale += scaleVelocity * deltaTime;

        rotation += rotationSpeed * deltaTime;

        spinner.style.transform = `translateY(${translateYOffset}px) rotate(${rotation}deg) scale(${scale})`;

        requestAnimationFrame(animateSpinner);
    }
}

requestAnimationFrame(animateSpinner);

// bring in the objects after all content is loaded (spinner animation will be finished)
window.addEventListener("load", () => {
    finishedLoading = true;
    // spinner;
})