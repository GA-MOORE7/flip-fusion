function shuffle(array) {
    let i = array.length;
    while (i > 0) {
  // pick a random index
        const j = Math.floor(Math.random() * i);
  // decrease i by 1
        i--;
  // swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export { shuffle };