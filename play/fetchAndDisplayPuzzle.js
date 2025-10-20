// play/fetchAndDisplayPuzzle.js
export async function fetchAndDisplayPuzzles() {
  const tableContainer = document.getElementById("page3"); // target your "Play" page
  if (!tableContainer) return;

  // Keep heading intact
  

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

    // Create table
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    // Header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Puzzle Name", "Words", "Action"].forEach((text) => {
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

      // Name
      const nameCell = document.createElement("td");
      nameCell.textContent = puzzle.name;
      nameCell.style.border = "1px solid #ccc";
      nameCell.style.padding = "8px";
      row.appendChild(nameCell);

      // Words
      const wordsCell = document.createElement("td");
      wordsCell.textContent = puzzle.items.map((i) => i.word).join(", ");
      wordsCell.style.border = "1px solid #ccc";
      wordsCell.style.padding = "8px";
      row.appendChild(wordsCell);

      // Action button
      const actionCell = document.createElement("td");
      actionCell.style.border = "1px solid #ccc";
      actionCell.style.padding = "8px";

      const playBtn = document.createElement("button");
      playBtn.textContent = "Play";
      playBtn.style.padding = "5px 10px";
      playBtn.style.cursor = "pointer";

      // Example: alert puzzle info on click
      playBtn.addEventListener("click", () => {
        alert(`Puzzle: ${puzzle.name}\nWords: ${puzzle.items.map(i => i.word).join(", ")}`);
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

