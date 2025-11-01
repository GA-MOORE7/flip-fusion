function attachClickHandler(array, onTwoClicks) {
   
    let clickedCells = [];

    document.querySelectorAll("#gridContainer .cell").forEach(el => {
        el.addEventListener("click", event => {
            const id = parseInt(event.target.id, 10);
            const obj = array[id];
            
            if (obj && obj.value) {    
            

                if (clickedCells.length === 1 && clickedCells[0].id === id) {
                    return;
                }

                const previousContent = event.target.textContent;
                event.target.textContent = obj.value;
                
                clickedCells.push({
                    id, 
                    pairId: obj.pairId,
                    value: obj.value,
                    previousContent
                });
             
                if (clickedCells.length === 2) {
                    onTwoClicks([...clickedCells ]);
                    clickedCells = [];
                
                }
            }
        });
    });
}

export { attachClickHandler };