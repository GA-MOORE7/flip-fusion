function generateGrid(arr) {

    const n = arr.length;

    const container = document.getElementById("gridContainer");
    container.innerHTML = "";

    // Step 1: Find factor pairs
    const factors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            const pair = [i, n / i];
            pair.sort((a, b) => a - b);
            factors.push(pair);
        }
    }

    // Step 2: Choose the most square-ish pair
    const [rows, cols] = factors.reduce((best, pair) => {
        const diff = Math.abs(pair[0] - pair[1]);
        const bestDiff = Math.abs(best[0] - best[1]);
        return diff < bestDiff ? pair : best;
    });
    
// Step 3: Set CSS class and dynamic vars
    container.classList.add("grid");
    container.style.gridTemplateColumns = `repeat(${cols}, minmax(80px, 1fr))`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

// Step 4: Build the grid (preserve objects or values)
    const grid = [];
    let index = 0;

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const cellNumber = index + 1;
            row.push(cellNumber);

            // Create DOM element
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = index;
            cell.textContent = cellNumber;
            container.appendChild(cell);

            index++;

        }
        grid.push(row);
    }

    return { rows, cols, grid };

}

export { generateGrid }