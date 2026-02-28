// --- Audio setup ---
const matchSound = new Audio("play/sounds/match.mp3");
const noMatchSound = new Audio("play/sounds/no-match.mp3");

// Optional volume tuning
matchSound.volume = 1;
noMatchSound.volume = 0.5;

// --- Unlock audio system on first user interaction ---
document.addEventListener(
  "click",
  () => {
    [matchSound, noMatchSound].forEach(sound => {
      sound.play()
        .then(() => sound.pause())
        .catch(() => {});
    });
  },
  { once: true }
);

// --- Main match checker ---
function checkMatch(clickedCells) {
  const [first, second] = clickedCells;

  // Safety check
  if (!first?.el || !second?.el) return;

  if (first.pairId === second.pairId) {
    // ✅ MATCH
    matchSound.currentTime = 0;
    matchSound.play().catch(err =>
      console.warn("Match audio blocked:", err)
    );

    // Delay allows flip animation to finish
    setTimeout(() => {
      first.el.classList.add("matched");
      second.el.classList.add("matched");
    }, 1000);

  } else {
    // ❌ NO MATCH
    noMatchSound.currentTime = 0;
    noMatchSound.play().catch(err =>
      console.warn("No-match audio blocked:", err)
    );

    // Flip cards back
    setTimeout(() => {
      first.el.innerHTML = first.el.dataset.number;
      second.el.innerHTML = second.el.dataset.number;

      first.el.classList.remove("face-up");
      second.el.classList.remove("face-up");
    }, 750);
  }
}

export { checkMatch };

