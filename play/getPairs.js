function getPairs(array) {
  const cards = [];

  // For each pair, create a picture card and a word card
  for (const pair of array) {
    cards.push(
      {
        pairId: pair.id,   // links picture and word together
        type: "picture",   // this card shows the image
        value: pair.picture
      },
      {
        pairId: pair.id,   // same pairId for matching
        type: "word",      // this card shows the word
        value: pair.word
      }
    );
  }

  return cards;
}

export { getPairs };


