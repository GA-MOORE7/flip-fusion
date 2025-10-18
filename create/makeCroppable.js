let croppieInstance = null;

function makeCroppable() {
  const image = document.getElementById("croppableImage");
  if (!image) return;

  const croppieContainer = document.createElement("div");
  croppieContainer.id = "upload-demo";
  image.replaceWith(croppieContainer);

  // Create and attach Croppie
  croppieInstance = new Croppie(croppieContainer, {
    enableExif: true,
    viewport: { width: 200, height: 200, type: "square" },
    boundary: { width: 300, height: 300 },
  });

  croppieInstance.bind({ url: image.src });

  // 🟩 Attach instance to the container for later access
  croppieContainer.croppieInstance = croppieInstance;
}

export { makeCroppable };


