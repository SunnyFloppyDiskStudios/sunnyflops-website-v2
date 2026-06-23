// show items based on categories

const items = document.getElementById("stuff-right-content").children;

function filterCategories(category) {
    if (category === "ti-n") {
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = "flex"
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            if (items[i].classList.contains(category)) {
                items[i].style.display = "flex";
            } else {
                items[i].style.display = "none";
            }
        }
    }
}

// platform hover show more info detailed thingy thing (son)