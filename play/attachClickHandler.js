export function attachClickHandler(array, onTwoClicks, container) {
    let clickedCells = [];

    container.querySelectorAll(".cell").forEach((el, index) => {
        el.addEventListener("click", () => {
            const obj = array[index];
            if (!obj) return;

            // Prevent double click on same cell
            if (clickedCells.length === 1 && clickedCells[0].el === el) return;

            // Clear previous number and show content
            el.innerHTML = "";
            if (obj.type === "picture") {
                const img = document.createElement("img");
                img.src = obj.value;
                img.alt = "card image";
                img.style.width = "100%";
                img.style.height = "100%";
                el.appendChild(img);
            } else if (obj.type === "word") {
                const p = document.createElement("p");
                p.textContent = obj.value;
                p.style.textAlign = "center";
                el.appendChild(p);
            }

            clickedCells.push({
                el: el,         // pass the element directly
                pairId: obj.pairId,
                value: obj.value,
                type: obj.type
            });

            if (clickedCells.length === 2) {
                onTwoClicks([...clickedCells]);
                clickedCells = [];
            }
        });
    });
}

