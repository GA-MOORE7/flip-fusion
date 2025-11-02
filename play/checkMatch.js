function checkMatch(clickedCells) {
    const [first, second] = clickedCells;

    if (!first.el || !second.el) return;

    if (first.pairId === second.pairId) {
        // Match — keep revealed
        setTimeout(() => {
            first.el.classList.add("matched");
            second.el.classList.add("matched");
        }, 500);
    } else {
        // Not a match — flip back
        setTimeout(() => {
            first.el.innerHTML = first.el.dataset.number;
            second.el.innerHTML = second.el.dataset.number;

            first.el.classList.remove("face-up");
            second.el.classList.remove("face-up");
        }, 500);
    }
}

export { checkMatch };



