function createActionButton() {
  const frameContainer = document.getElementById("frameContainer");
  if (!frameContainer) return;

  // Prevent duplicates
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
    buttonRow.style.gap = "15px"; // space between buttons

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
    console.log("Action button clicked!");
  });

  // Append action button to the same row as upload frame
  buttonRow.appendChild(button);
}

export { createActionButton };



