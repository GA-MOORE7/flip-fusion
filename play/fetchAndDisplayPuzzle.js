import { showLightbox } from "./showLightbox.js";
import { puzzleSetup } from "./main.js";

export async function fetchAndDisplayPuzzles() {
  const tableContainer = document.getElementById("page3");
  if (!tableContainer) return;

  try {
    const response = await fetch("http://localhost:3000/api/puzzles");
    if (!response.ok) throw new Error("Failed to fetch puzzles");

    const puzzles = await response.json();
    if (puzzles.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No puzzles available.";
      p.style.textAlign = "center";
      p.style.fontSize = "18px";
      tableContainer.appendChild(p);
      return;
    }

    tableContainer.innerHTML = "";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "separate";
    table.style.borderSpacing = "0";
    table.style.borderRadius = "10px";
    table.style.overflow = "hidden";
    table.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Puzzle Name", "Preview", "Action"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.borderBottom = "2px solid #ccc";
      th.style.padding = "12px";
      th.style.backgroundColor = "#f7f9fa";
      th.style.fontSize = "16px";
      th.style.fontWeight = "600";
      th.style.color = "#333";
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    puzzles.forEach((puzzle) => {
      const row = document.createElement("tr");
      row.style.transition = "background 0.2s";
      row.addEventListener("mouseenter", () => (row.style.backgroundColor = "#f0fdf9"));
      row.addEventListener("mouseleave", () => (row.style.backgroundColor = "transparent"));

      const nameCell = document.createElement("td");
      nameCell.textContent = puzzle.name;
      nameCell.style.padding = "10px";
      nameCell.style.fontWeight = "500";
      row.appendChild(nameCell);

      const previewCell = document.createElement("td");
      previewCell.style.padding = "10px";
      previewCell.style.display = "flex";
      previewCell.style.gap = "10px";
      previewCell.style.flexWrap = "wrap";

      puzzle.items.slice(0, 3).forEach((item) => {
        const itemWrapper = document.createElement("div");
        itemWrapper.style.display = "flex";
        itemWrapper.style.flexDirection = "column";
        itemWrapper.style.alignItems = "center";
        itemWrapper.style.width = "70px";
        itemWrapper.style.textAlign = "center";

        const img = document.createElement("img");
        img.src = item.imageUrl || item.image;
        img.alt = item.word;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        img.style.border = "1px solid #ddd";
        img.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";

        const label = document.createElement("span");
        label.textContent = item.word;
        label.style.marginTop = "6px";
        label.style.fontSize = "12px";
        label.style.color = "#555";

        itemWrapper.appendChild(img);
        itemWrapper.appendChild(label);
        previewCell.appendChild(itemWrapper);
      });

      row.appendChild(previewCell);

      const actionCell = document.createElement("td");
      actionCell.style.padding = "10px";

      const playBtn = document.createElement("button");
      playBtn.textContent = "Play";
      playBtn.style.padding = "6px 14px";
      playBtn.style.cursor = "pointer";
      playBtn.style.backgroundColor = "#4ade80";
      playBtn.style.color = "#fff";
      playBtn.style.fontWeight = "500";
      playBtn.style.borderRadius = "6px";
      playBtn.style.border = "none";
      playBtn.style.transition = "background 0.2s";
      playBtn.addEventListener("mouseenter", () => (playBtn.style.backgroundColor = "#16a34a"));
      playBtn.addEventListener("mouseleave", () => (playBtn.style.backgroundColor = "#4ade80"));

playBtn.addEventListener("click", async () => {
  // Open lightbox and get content div
  const lightboxContent = showLightbox();
  lightboxContent.textContent = "Loading puzzle...";

  try {
    const res = await fetch(`http://localhost:3000/api/puzzles/${puzzle._id}`);
    if (!res.ok) throw new Error("Failed to fetch puzzle");
    const puzzleData = await res.json();

    // Pass the container to puzzleSetup
    puzzleSetup(puzzleData, lightboxContent);

  } catch (err) {
    console.error("Error fetching puzzle:", err);
    lightboxContent.textContent = "Error loading puzzle.";
  }
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
    p.style.textAlign = "center";
    p.style.color = "#f00";
    tableContainer.appendChild(p);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayPuzzles();
});





