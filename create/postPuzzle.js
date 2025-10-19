export async function sendPuzzleToAPI(name, items) {
  try {
    const response = await fetch("http://localhost:3000/api/puzzles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, items })
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

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      console.log("Puzzle saved successfully:", data);
      alert("Puzzle saved successfully!");
    } else {
      const text = await response.text();
      console.log("Server returned non-JSON response:", text);
    }

    return data;
  } catch (err) {
    console.error("Error saving puzzle:", err);
    alert("Error saving puzzle: " + err.message);
    throw err;
  }
}
