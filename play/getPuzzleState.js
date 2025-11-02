function getPuzzleState() {

    const cells = [];
    document.querySelectorAll("#puzzleGridContainer .cell").forEach(el => {
        cells.push({
                id: parseInt(el.id, 10), 
                text: el.textContent
            });
        });
        return cells;
}

export { getPuzzleState };