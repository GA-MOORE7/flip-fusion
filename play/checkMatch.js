
// checkMatch.js
const matchSound = new Audio("play/sounds/match.mp3");

// Unlock audio system on first user click
document.addEventListener(
  "click",
  () => {
    matchSound.play().then(() => matchSound.pause()).catch(() => {});
  },
  { once: true }
);

function checkMatch(clickedCells) {
  const [first, second] = clickedCells;

  if (!first?.el || !second?.el) return;

  if (first.pairId === second.pairId) {
    // Play sound immediately
    matchSound.currentTime = 0;
    matchSound.play().catch(err => {
      console.warn("Audio play blocked:", err);
    });

    // Then show the matched visuals after 300ms (optional delay for animation)
    setTimeout(() => {
      first.el.classList.add("matched");
      second.el.classList.add("matched");
    }, 1000);
  } else {
    setTimeout(() => {
      first.el.innerHTML = first.el.dataset.number;
      second.el.innerHTML = second.el.dataset.number;
      first.el.classList.remove("face-up");
      second.el.classList.remove("face-up");
    }, 750);
  }
}

export { checkMatch };

