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

    /* ---------- HEADER ---------- */
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Puzzle Name", "Preview", "Action", "Delete"].forEach((text) => {
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
      nameCell.style.fontWeight = "500";
      row.appendChild(nameCell);

      /* --- PREVIEW CELL --- */
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

      /* --- ACTION (PLAY) CELL --- */
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

      playBtn.addEventListener("mouseenter", () => {
        playBtn.style.backgroundColor = "#16a34a";
      });
      playBtn.addEventListener("mouseleave", () => {
        playBtn.style.backgroundColor = "#4ade80";
      });

      playBtn.addEventListener("click", async () => {
        const lightboxContent = showLightbox();
        lightboxContent.textContent = "Loading puzzle...";

        try {
          const res = await fetch(
            `http://localhost:3000/api/puzzles/${puzzle._id}`
          );
          if (!res.ok) throw new Error("Failed to fetch puzzle");

          const puzzleData = await res.json();
          puzzleSetup(puzzleData, lightboxContent);
        } catch (err) {
          console.error("Error fetching puzzle:", err);
          lightboxContent.textContent = "Error loading puzzle.";
        }
      });

      actionCell.appendChild(playBtn);
      row.appendChild(actionCell);

      /* --- DELETE CELL --- */
      const deleteCell = document.createElement("td");
      deleteCell.style.padding = "10px";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.padding = "6px 14px";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.backgroundColor = "#ef4444";
      deleteBtn.style.color = "#fff";
      deleteBtn.style.fontWeight = "500";
      deleteBtn.style.borderRadius = "6px";
      deleteBtn.style.border = "none";
      deleteBtn.style.transition = "background 0.2s";

      deleteBtn.addEventListener("mouseenter", () => {
        deleteBtn.style.backgroundColor = "#b91c1c";
      });
      deleteBtn.addEventListener("mouseleave", () => {
        deleteBtn.style.backgroundColor = "#ef4444";
      });

      deleteBtn.addEventListener("click", async () => {
        const confirmed = confirm(
          `Delete "${puzzle.name}"?\nThis cannot be undone.`
        );
        if (!confirmed) return;

        try {
          const res = await fetch(
            `http://localhost:3000/api/puzzles/${puzzle._id}`,
            { method: "DELETE" }
          );

          if (!res.ok) throw new Error("Failed to delete puzzle");

          row.remove();
        } catch (err) {
          console.error("Delete error:", err);
          alert("Error deleting puzzle.");
        }
      });

      deleteCell.appendChild(deleteBtn);
      row.appendChild(deleteCell);

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





