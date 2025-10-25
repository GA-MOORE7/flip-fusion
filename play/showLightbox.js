export function showLightbox() {
  // Dark overlay behind everything
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.7)";
  overlay.style.zIndex = "9999";

  // Large white box (fills most of the screen)
  const lightbox = document.createElement("div");
  lightbox.style.position = "absolute";
  lightbox.style.top = "20px";
  lightbox.style.left = "10px";
  lightbox.style.right = "10px";
  lightbox.style.bottom = "20px";
  lightbox.style.background = "#fff";
  lightbox.style.border = "2px solid #333";
  lightbox.style.borderRadius = "8px";
  lightbox.style.display = "flex";
  lightbox.style.justifyContent = "center";
  lightbox.style.alignItems = "center";
  lightbox.style.fontSize = "36px";
  lightbox.style.fontWeight = "bold";
  lightbox.style.color = "#222";
  lightbox.style.boxShadow = "0 2px 15px rgba(0,0,0,0.4)";
  lightbox.textContent = "game";

  // Exit button (×)
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "15px";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.color = "#333";
  closeBtn.style.transition = "transform 0.2s ease";

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.transform = "scale(1.3)";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.transform = "scale(1)";
  });

  // Click to close
  closeBtn.addEventListener("click", () => overlay.remove());

  lightbox.appendChild(closeBtn);
  overlay.appendChild(lightbox);

  // Click outside the box to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}


