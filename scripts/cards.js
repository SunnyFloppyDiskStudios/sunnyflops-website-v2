let isViewing = false;

function findRelative(appletName) {
    let fileName = `../infoCards/${appletName}.md`;

    fetch(fileName)
        .then(response => {
            if (!response.ok) throw new Error("File not found");
            return response.text();
        })
        .then(data => infoCard(data))
        .catch(error => console.error("Error loading file:", error));
}

function infoCard(content) {
    let popup = document.getElementById("popup");
    let overlay = document.getElementById("popup-overlay");

    popup.innerHTML = `
        <button class="close-btn" onclick="viewCard('')">CLOSE</button>
        <div class="popup-content">${content}</div>
    `;

    popup.style.display = "block";
    overlay.style.display = "block";
    setTimeout(() => {
        popup.classList.add("show");
        overlay.classList.add("show");
    }, 10);

    document.body.classList.add("no-scroll");
}

function viewCard(appletFile) {
    let popup = document.getElementById("popup");
    let overlay = document.getElementById("popup-overlay");

    if (appletFile) {
        infoCard(appletFile);
    } else {
        popup.classList.remove("show");
        overlay.classList.remove("show");
        setTimeout(() => {
            popup.style.display = "none";
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll");
        }, 300);
    }
}

function displayCard(appletName) {
    findRelative(appletName);
    let overlay = document.getElementById("popup-overlay");
    overlay.style.display = "block";
    document.body.classList.add("no-scroll");
}

