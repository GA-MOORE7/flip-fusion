function addSaveButton() {
  const croppieContainer = document.getElementById("upload-demo");

  if (!croppieContainer) {
    console.warn("Croppie container (#upload-demo) not found.");
    return;
  }

  // Prevent adding duplicate buttons
  if (document.getElementById("saveImageButton")) return;

  // Create a wrapper to hold Croppie + button side by side
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.gap = "40px";
  wrapper.style.marginTop = "20px";

  // Move the Croppie container into this wrapper
  croppieContainer.parentNode.insertBefore(wrapper, croppieContainer);
  wrapper.appendChild(croppieContainer);

  // Create the elegant button
  const saveButton = document.createElement("button");
  saveButton.id = "saveImageButton";
  saveButton.textContent = "Save Cropped Image + Word";

  // --- Elegant styling ---
  saveButton.style.padding = "12px 22px";
  saveButton.style.border = "none";
  saveButton.style.borderRadius = "12px";
  saveButton.style.opacity = "0.5";
  saveButton.style.background = "linear-gradient(135deg, #97baf3ff, #2563eb)";
  saveButton.style.color = "white";
  saveButton.style.fontSize = "16px";
  saveButton.style.fontWeight = "500";
  saveButton.style.letterSpacing = "0.3px";
  saveButton.style.cursor = "pointer";
  saveButton.style.whiteSpace = "nowrap";
  saveButton.style.boxShadow = "0 4px 10px rgba(37, 99, 235, 0.3)";
  saveButton.style.transition = "all 0.25s ease";
  saveButton.style.transform = "scale(1)";
  saveButton.style.backdropFilter = "blur(4px)";

  // 🔒 Ensure button is always clickable above Croppie
  saveButton.style.position = "relative";
  saveButton.style.zIndex = "10";

  // --- Hover effect ---
  saveButton.addEventListener("mouseenter", () => {
    saveButton.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";
    saveButton.style.boxShadow = "0 6px 14px rgba(37, 99, 235, 0.4)";
    saveButton.style.transform = "scale(1.03)";
    saveButton.style.opacity = "1";
  });

  saveButton.addEventListener("mouseleave", () => {
    saveButton.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
    saveButton.style.boxShadow = "0 4px 10px rgba(37, 99, 235, 0.3)";
    saveButton.style.transform = "scale(1)";
  });

  // --- Press animation (Mac-safe) ---
  saveButton.addEventListener("pointerdown", () => {
    saveButton.style.transform = "scale(0.97)";
    saveButton.style.boxShadow = "0 2px 6px rgba(37, 99, 235, 0.25)";
  });

  saveButton.addEventListener("pointerup", () => {
    saveButton.style.transform = "scale(1.03)";
    saveButton.style.boxShadow = "0 6px 14px rgba(37, 99, 235, 0.4)";
  });

  // --- Click behavior ---
  saveButton.addEventListener("click", () => {
    console.log("Save button clicked! Ready to capture image + word.");
    // TODO: add logic to get cropped image + associated word
  });

  // Append the button next to Croppie
  wrapper.appendChild(saveButton);
}

export { addSaveButton };

