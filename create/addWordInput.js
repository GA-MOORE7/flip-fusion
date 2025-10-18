function addWordInput() {
  const saveButton = document.getElementById("saveImageButton");

  if (!saveButton) {
    console.warn("Save button (#saveImageButton) not found.");
    return;
  }

  // Prevent duplicates
  if (document.getElementById("wordInput")) return;

  // Create the input field
  const input = document.createElement("input");
  input.id = "wordInput";
  input.type = "text";
  input.placeholder = "Enter associated word...";
  input.style.width = "220px";
  input.style.marginBottom = "10px"; // space between input and button
  input.style.padding = "10px 14px";
  input.style.fontSize = "15px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "8px";
  input.style.outline = "none";
  input.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.05)";
  input.style.textAlign = "center";
  input.style.transition = "border-color 0.3s, box-shadow 0.3s";

  // Focus/blur styling
  input.addEventListener("focus", () => {
    input.style.borderColor = "#3b82f6";
    input.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.25)";
  });
  input.addEventListener("blur", () => {
    input.style.borderColor = "#ccc";
    input.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.05)";
  });

  // Ensure parent container stacks vertically
  const parent = saveButton.parentNode;
  parent.style.display = "flex";
  parent.style.flexDirection = "column";
  parent.style.alignItems = "center";

  // Insert input above the button
  parent.insertBefore(input, saveButton);
}

export { addWordInput };



