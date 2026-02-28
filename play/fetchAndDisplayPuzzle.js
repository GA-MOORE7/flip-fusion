import { showLightbox } from "./showLightbox.js";
import { puzzleSetup } from "./main.js";

export async function fetchAndDisplayPuzzles() {
  const tableContainer = document.getElementById("page3");
  if (!tableContainer) return;

  try {
    const response = await fetch("https://flip-and-match-api-c1b1b2b47d88.herokuapp.com/api/puzzles");
    if (!response.ok) throw new Error("Failed to fetch puzzles");

    const puzzles = await response.json();

    tableContainer.innerHTML = "";

    if (puzzles.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No puzzles available.";
      p.style.textAlign = "center";
      p.style.fontSize = "18px";
      tableContainer.appendChild(p);
      return;
    }

    /* ✅ NEW: scrollable wrapper */
    const tableWrapper = document.createElement("div");
    tableWrapper.style.maxHeight = "400px";      // 🔒 cap height
    tableWrapper.style.overflowY = "auto";       // 🔁 scroll rows
    tableWrapper.style.overflowX = "hidden";
    tableWrapper.style.borderRadius = "12px";
    tableWrapper.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "separate";
    table.style.borderSpacing = "0";
    table.style.backgroundColor = "#fff";

    /* ---------- HEADER ---------- */
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Puzzle Name", "Preview", "Action", "Delete"].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      th.style.padding = "12px";
      th.style.backgroundColor = "#f7f9fa";
      th.style.borderBottom = "2px solid #ccc";
      th.style.fontWeight = "600";
      th.style.position = "sticky";   // ✅ stays visible
      th.style.top = "0";
      th.style.zIndex = "2";
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    /* ---------- BODY ---------- */
    const tbody = document.createElement("tbody");

    puzzles.forEach((puzzle) => {
      const row = document.createElement("tr");
      row.style.transition = "background 0.2s";

      row.addEventListener("mouseenter", () => {
        row.style.backgroundColor = "#f0fdf9";
      });
      row.addEventListener("mouseleave", () => {
        row.style.backgroundColor = "transparent";
      });

      /* --- NAME CELL --- */
      const nameCell = document.createElement("td");
      nameCell.textContent = puzzle.name;
      nameCell.style.padding = "10px";
      row.appendChild(nameCell);

      /* --- PREVIEW CELL --- */
      const previewCell = document.createElement("td");
      previewCell.style.padding = "10px";
      previewCell.style.display = "flex";
      previewCell.style.gap = "10px";
      previewCell.style.flexWrap = "wrap";

      puzzle.items.forEach((item) => {
        const img = document.createElement("img");
        img.src = item.imageUrl || item.image;
        img.alt = item.word;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        previewCell.appendChild(img);
      });

      row.appendChild(previewCell);

      /* --- ACTION CELL --- */
      const actionCell = document.createElement("td");
      actionCell.style.padding = "10px";

      const playBtn = document.createElement("button");
      playBtn.textContent = "Play";
      playBtn.style.padding = "6px 14px";
      playBtn.style.backgroundColor = "#4ade80";
      playBtn.style.color = "#fff";
      playBtn.style.border = "none";
      playBtn.style.borderRadius = "6px";
      playBtn.style.cursor = "pointer";

      playBtn.addEventListener("click", async () => {
        const lightboxContent = showLightbox();
        lightboxContent.textContent = "Loading puzzle...";
        const res = await fetch(`https://flip-and-match-api-c1b1b2b47d88.herokuapp.com/api/puzzles/${puzzle._id}`);
        const puzzleData = await res.json();
        puzzleSetup(puzzleData, lightboxContent);
      });

      actionCell.appendChild(playBtn);
      row.appendChild(actionCell);

      /* --- DELETE CELL --- */
      const deleteCell = document.createElement("td");
      deleteCell.style.padding = "10px";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.backgroundColor = "#ef4444";
      deleteBtn.style.color = "#fff";
      deleteBtn.style.border = "none";
      deleteBtn.style.borderRadius = "6px";
      deleteBtn.style.padding = "6px 14px";

      deleteBtn.addEventListener("click", async () => {
        if (!confirm(`Delete "${puzzle.name}"?`)) return;
        await fetch(`https://flip-and-match-api-c1b1b2b47d88.herokuapp.com/api/puzzles/${puzzle._id}`, {
          method: "DELETE",
        });
        row.remove();
      });

      deleteCell.appendChild(deleteBtn);
      row.appendChild(deleteCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    tableContainer.appendChild(tableWrapper);

  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayPuzzles);





