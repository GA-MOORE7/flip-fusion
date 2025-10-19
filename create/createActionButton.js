function createActionButton() {
  const frameContainer = document.getElementById("frameContainer");
  if (!frameContainer) return;

  // ✅ Create input field for name (appears above everything)
  let nameInput = document.getElementById("nameInput");
  if (!nameInput) {
    nameInput = document.createElement("input");
    nameInput.id = "nameInput";
    nameInput.type = "text";
    nameInput.placeholder = "Name of the game!";
    nameInput.style.width = "200px";
    nameInput.style.height = "35px";
    nameInput.style.fontSize = "18px";
    nameInput.style.padding = "5px 10px";
    nameInput.style.borderRadius = "8px";
    nameInput.style.border = "1px solid #888";
    nameInput.style.textAlign = "center";
    nameInput.style.outline = "none";
    nameInput.style.display = "block";
    nameInput.style.margin = "0 auto 20px auto"; // centers above table
    nameInput.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

    // Insert input at the top of frameContainer
    frameContainer.prepend(nameInput);
  }

  // Prevent duplicate buttons
  let existingButton = document.getElementById("actionButton");
  if (existingButton) return;

  // Ensure the container holding buttons uses flex
  let buttonRow = document.getElementById("buttonRow");
  if (!buttonRow) {
    buttonRow = document.createElement("div");
    buttonRow.id = "buttonRow";
    buttonRow.style.display = "flex";
    buttonRow.style.flexDirection = "row";
    buttonRow.style.justifyContent = "center";
    buttonRow.style.alignItems = "center";
    buttonRow.style.gap = "15px"; // space between items

    // Move existing frame (upload button) into buttonRow
    const frame = frameContainer.querySelector(".frame");
    if (frame) buttonRow.appendChild(frame);

    frameContainer.appendChild(buttonRow);
  }

  // Create the action button
  const button = document.createElement("button");
  button.id = "actionButton";
  button.textContent = "Ready!";

  // Match resized frame dimensions
  button.style.width = "120px";
  button.style.height = "120px";
  button.style.fontSize = "20px";

  // Additional styling to match frame style
  button.style.border = "1px #333";
  button.style.backgroundColor = "#b6f7dbff";
  button.style.display = "flex";
  button.style.justifyContent = "center";
  button.style.alignItems = "center";
  button.style.borderRadius = "15px";
  button.style.transition = "background-color 0.2s, transform 0.2s";
  button.style.cursor = "pointer";

  // Hover effect
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#80f1b5ff";
    button.style.transform = "scale(1.03)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#b6f7dbff";
    button.style.transform = "scale(1)";
  });

  // Placeholder action
  button.addEventListener("click", () => {
    const nameValue = nameInput.value.trim();
    if (nameValue === "") {
      alert("Please enter your name before continuing!");
      nameInput.focus();
      return;
    }
    console.log("Game name:", nameValue);
    console.log("Action button clicked!");
  });

  // Append action button to the row
  buttonRow.appendChild(button);
}

export { createActionButton };





