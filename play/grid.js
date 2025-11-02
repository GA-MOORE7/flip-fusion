// grid.js
function generateGrid(arr, container) {
    if (!container) {
        console.error("generateGrid: container element is null or undefined.");
        return;
    }
    if (!Array.isArray(arr) || arr.length === 0) {
        console.warn("generateGrid: arr is empty or not an array.");
        container.textContent = "No grid data available.";
        return;
    }

    container.innerHTML = "";
    const n = arr.length;

    // Step 1: Find factor pairs for grid
    const factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            const pair = [i, n / i];
            pair.sort((a, b) => a - b);
            factors.push(pair);
        }
    }

    if (factors.length === 0) {
        factors.push([1, n]);
    }

    // Step 2: Choose the most square-ish pair
    const [rows, cols] = factors.reduce((best, pair) => {
        const diff = Math.abs(pair[0] - pair[1]);
        const bestDiff = Math.abs(best[0] - best[1]);
        return diff < bestDiff ? pair : best;
    });

    // Step 3: Set CSS grid
    container.classList.add("grid");
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${cols}, minmax(80px, 1fr))`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gap = "10px";

    // Step 4: Create cells
    arr.forEach((card, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell", "face-down");
        cell.dataset.pairId = card.pairId || "";
        cell.dataset.type = card.type || "";
        cell.dataset.number = (index + 1).toString();
        cell.textContent = index + 1;

        container.appendChild(cell);
    });

    return { rows, cols };
}

export { generateGrid };
