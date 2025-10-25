import { showLightbox } from "./showLightbox.js";

// play/fetchAndDisplayPuzzle.js
export async function fetchAndDisplayPuzzles() {
  const tableContainer = document.getElementById("page3"); // target your "Play" page
  if (!tableContainer) return;

  try {
    const response = await fetch("http://localhost:3000/api/puzzles");
    if (!response.ok) throw new Error("Failed to fetch puzzles");

    const puzzles = await response.json();
    if (puzzles.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No puzzles available.";
      tableContainer.appendChild(p);
      return;
    }

    // Clear existing content before re-rendering (important for auto-refresh)
    tableContainer.innerHTML = "";

    // Create table
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Puzzle Name", "Preview", "Action"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.border = "1px solid #ccc";
      th.style.padding = "8px";
      th.style.backgroundColor = "#f0f0f0";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement("tbody");

    puzzles.forEach((puzzle) => {
      const row = document.createElement("tr");

      // ----------------------------
      // Name
      // ----------------------------
      const nameCell = document.createElement("td");
      nameCell.textContent = puzzle.name;
      nameCell.style.border = "1px solid #ccc";
      nameCell.style.padding = "8px";
      row.appendChild(nameCell);

      // ----------------------------
      // Preview (images + words)
      // ----------------------------
      const previewCell = document.createElement("td");
      previewCell.style.border = "1px solid #ccc";
      previewCell.style.padding = "8px";
      previewCell.style.display = "flex";
      previewCell.style.gap = "12px";
      previewCell.style.flexWrap = "wrap";

      puzzle.items.slice(0, 3).forEach((item) => {
        const itemWrapper = document.createElement("div");
        itemWrapper.style.display = "flex";
        itemWrapper.style.flexDirection = "column";
        itemWrapper.style.alignItems = "center";
        itemWrapper.style.width = "70px";
        itemWrapper.style.textAlign = "center";

        const img = document.createElement("img");
        img.src = item.imageUrl || item.image; // fallback for local/base64 data
        img.alt = item.word;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";
        img.style.border = "1px solid #ccc";
        img.onerror = () => (img.alt = item.word || "Image unavailable");

        const label = document.createElement("span");
        label.textContent = item.word;
        label.style.marginTop = "4px";
        label.style.fontSize = "12px";
        label.style.color = "#333";

        itemWrapper.appendChild(img);
        itemWrapper.appendChild(label);
        previewCell.appendChild(itemWrapper);
      });

      row.appendChild(previewCell);

      // ----------------------------
      // Action button
      // ----------------------------
      const actionCell = document.createElement("td");
      actionCell.style.border = "1px solid #ccc";
      actionCell.style.padding = "8px";

      const playBtn = document.createElement("button");
      playBtn.textContent = "Play";
      playBtn.style.padding = "5px 10px";
      playBtn.style.cursor = "pointer";
      playBtn.style.backgroundColor = "#b6f7dbff";
      playBtn.style.borderRadius = "6px";
      playBtn.style.border = "1px solid #88c";
      playBtn.addEventListener("mouseenter", () => {
        playBtn.style.backgroundColor = "#80f1b5ff";
      });
      playBtn.addEventListener("mouseleave", () => {
        playBtn.style.backgroundColor = "#b6f7dbff";
      });

      playBtn.addEventListener("click", () => {
      
        showLightbox();

        // Future: redirect to /play?puzzleId=... or trigger your game logic
      });

      actionCell.appendChild(playBtn);
      row.appendChild(actionCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
  } catch (err) {
    console.error("Error fetching puzzles:", err);
    const p = document.createElement("p");
    p.textContent = "Error fetching puzzles: " + err.message;
    tableContainer.appendChild(p);
  }
}

// Automatically run on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayPuzzles();
});



