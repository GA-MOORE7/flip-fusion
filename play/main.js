// main.js
import { convertToPairs } from './transformData.js';
import { getPairs } from './getPairs.js';
import { shuffle } from './shuffle.js';
import { generateGrid } from './grid.js';
import { attachClickHandler } from './attachClickHandler.js';
import { checkMatch } from './checkMatch.js';

export function puzzleSetup(data, container) {
    if (!container) {
        console.error("puzzleSetup: container element is null or undefined.");
        return;
    }

    // Step 1: Convert data into pairs
    const pairs = convertToPairs(data);

    // Step 2: Get card objects from pairs
    const cards = getPairs(pairs);

    // Step 3: Shuffle cards
    const shuffledCards = shuffle(cards);

    // Step 4: Generate grid inside the provided container
    generateGrid(shuffledCards, container);

    // Step 5: Attach click handler to cells (pass container!)
    attachClickHandler(shuffledCards, checkMatch, container);

    console.log("Shuffled cards:", shuffledCards);
}

