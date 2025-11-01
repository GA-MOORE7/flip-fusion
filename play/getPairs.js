function getPairs(array) {
const cards = [];

    for (const pair of array) {
        cards.push(
            { pairId: pair.id, type: "picture", value: pair.picture },
            { pairId: pair.id, type: "word", value: pair.word }
        );
    }

    return cards;

}

export { getPairs };

