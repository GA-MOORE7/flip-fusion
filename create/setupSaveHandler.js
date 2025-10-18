import { displaySavedItems } from "./displaySavedItems.js";

// Keep this array at module scope — it grows with every save
const savedItems = [];

function setupSaveHandler() {
  const saveButton = document.getElementById("saveImageButton");
  const wordInput = document.getElementById("wordInput");
  const croppieContainer = document.getElementById("upload-demo");

  if (!saveButton || !wordInput || !croppieContainer) {
    console.warn("Required elements not found for setupSaveHandler.");
    return;
  }

  saveButton.addEventListener("click", async () => {
    console.log("Save button clicked! Ready to capture image + word.");

    const croppieInstance = croppieContainer.croppieInstance;
    if (!croppieInstance) {
      console.warn("Croppie instance not found on container.");
      return;
    }

    const word = wordInput.value.trim();
    if (!word) {
      alert("Please enter a word before saving.");
      return;
    }

    // Get cropped image as Base64
    const croppedImage = await croppieInstance.result({
      type: "base64",
      size: "viewport",
    });

    // Create object
    const item = {
      word,
      image: croppedImage,
      timestamp: Date.now(),
    };

    // Add to saved items array (persistent within the session)
    savedItems.push(item);

    console.log("Saved item:", item);
    console.log("All saved items:", savedItems);

    // ✅ Update the display every time
    displaySavedItems(savedItems);

    // Optional: clear the input for the next entry
    wordInput.value = "";
  });
}

export { setupSaveHandler, savedItems };

