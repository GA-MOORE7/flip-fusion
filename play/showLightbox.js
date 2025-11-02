// showLightbox.js
export function showLightbox() {
  // Overlay that touches the whole screen
  const overlay = document.createElement("div");
  overlay.classList.add("lightbox-overlay");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.7)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  // Lightbox content
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox-content");
  lightbox.style.position = "relative"; // needed for absolute close button
  lightbox.style.background = "#fff";
  lightbox.style.borderRadius = "0";
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.padding = "20px";
  lightbox.style.boxSizing = "border-box";
  lightbox.style.display = "flex";
  lightbox.style.flexDirection = "column";
  lightbox.style.alignItems = "center";
  lightbox.style.justifyContent = "center";
  lightbox.style.overflowY = "auto";

  // Close button — positioned in top-right corner
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => overlay.remove());

  // Puzzle grid container
  const content = document.createElement("div");
  content.id = "puzzleGridContainer";
  content.style.display = "grid";
  content.style.gap = "20px";
  content.style.justifyContent = "center"; // center horizontally
  content.style.alignContent = "center";   // center vertically
  content.style.width = "max-content";     // shrink to fit cards
  content.style.margin = "0 auto";         // center container

  // Append elements
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(content);
  overlay.appendChild(lightbox);
  document.body.appendChild(overlay);

  return content; // reference for inserting the puzzle grid
}



