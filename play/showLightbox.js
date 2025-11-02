// showLightbox.js
export function showLightbox() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.7)";
  overlay.style.zIndex = "9999";

  const lightbox = document.createElement("div");
  lightbox.style.position = "absolute";
  lightbox.style.top = "20px";
  lightbox.style.left = "10px";
  lightbox.style.right = "10px";
  lightbox.style.bottom = "20px";
  lightbox.style.background = "#fff";
  lightbox.style.borderRadius = "8px";
  lightbox.style.padding = "20px";
  lightbox.style.display = "flex";
  lightbox.style.flexDirection = "column";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.alignSelf = "flex-end";
  closeBtn.style.fontSize = "28px";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";

  closeBtn.addEventListener("click", () => overlay.remove());

  // ✅ This is the area where puzzle content will go
  const content = document.createElement("div");
  content.style.flex = "1";
  content.style.overflowY = "auto";
  content.style.padding = "10px";

  lightbox.appendChild(closeBtn);
  lightbox.appendChild(content);
  overlay.appendChild(lightbox);
  document.body.appendChild(overlay);

  return content; // ✅ Return reference so we can insert puzzle data later
}


