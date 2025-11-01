import { pairs } from './data.js';
import { getPairs } from './getPairs.js';
import { shuffle } from './shuffle.js';
import { generateGrid } from './grid.js';
import { attachClickHandler } from './attachClickHandler.js';
import { checkMatch } from './checkMatch.js';

const cards = getPairs(pairs);

const shuffledCards = shuffle(cards);

generateGrid(shuffledCards);

attachClickHandler(shuffledCards, checkMatch);

console.log(shuffledCards);