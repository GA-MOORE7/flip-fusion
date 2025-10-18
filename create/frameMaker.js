function createFrame(numberOfFrames) {
  const frameContainer = document.getElementById("frameContainer");
  if (!frameContainer) return;

  // Check if a wrapper already exists
  let frameWrapper = document.getElementById("frameWrapper");
  if (!frameWrapper) {
    frameWrapper = document.createElement("div");
    frameWrapper.id = "frameWrapper";
    frameWrapper.style.display = "flex";
    frameWrapper.style.justifyContent = "center";
    frameWrapper.style.marginTop = "20px";
    frameContainer.appendChild(frameWrapper); // append wrapper at the end
  }

  // Clear existing frames inside wrapper
  frameWrapper.innerHTML = "";

  // Create frames
  for (let i = 0; i < numberOfFrames; i++) {
    const frame = document.createElement("div");
    frame.classList.add("frame");
    frame.id = `frame-${i + 1}`;
    frame.textContent = "+";
    frameWrapper.appendChild(frame);
  }
}

export { createFrame };


