function checkMatch(clickedCells) {

    const [first, second] = clickedCells;

    if (first.pairId === second.pairId) {
        console.log("It's a match!", clickedCells);

      setTimeout(() => {
        document.getElementById(first.id).classList.add("matched");
        document.getElementById(second.id).classList.add("matched");
        }, 500);
        
    } else {
        console.log("Not a match.", clickedCells);
    
        setTimeout(() => {
        document.getElementById(first.id).textContent = first.previousContent;
        document.getElementById(second.id).textContent = second.previousContent;
        }, 500);

    }
}

export { checkMatch };