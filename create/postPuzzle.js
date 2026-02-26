import { fetchAndDisplayPuzzles } from "../play/fetchAndDisplayPuzzle.js";

export async function sendPuzzleToAPI(name, items) {
  if (!name || !items || items.length === 0) {
    alert("Please provide a puzzle name and at least one item.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/puzzles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, items }) // items = savedItems
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMessage = "Failed to create puzzle";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } else {
        const text = await response.text();
        console.error("Server returned non-JSON response:", text);
      }

      throw new Error(errorMessage);
    }

    // Parse response JSON (if returned)
    const data =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : null;

    console.log("Puzzle saved successfully:", data);
    alert("Puzzle saved successfully!");

    // ✅ Refresh the puzzle list immediately
    await fetchAndDisplayPuzzles();

    return data;
  } catch (err) {
    console.error("Error saving puzzle:", err);
    alert("Error saving puzzle: " + err.message);
    throw err;
  }
}

