let croppieInstance = null;

function initializeImageUpload(onUploadComplete) {
    const frame1 = document.getElementById("frame-1");
    const croppingContainer = document.getElementById("croppingContainer");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    frame1.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Destroy previous Croppie instance if it exists
                if (croppieInstance) {
                    croppieInstance.destroy();
                    croppieInstance = null;
                }

                // Clear previous content (including placeholder)
                croppingContainer.innerHTML = "";

                // Create the uploaded image
                const img = document.createElement("img");
                img.src = e.target.result;
                img.alt = "Selected Image";
                img.id = "croppableImage";
                img.style.maxWidth = "80%";
                img.style.maxHeight = "300px";
                img.style.margin = "0 auto";
                img.style.borderRadius = "10px";
                img.style.display = "block";
                img.style.animation = "fadeIn 0.4s ease-in-out";

                // Wait for the image to finish loading before Croppie setup
                img.onload = () => {
                    if (onUploadComplete) onUploadComplete();
                };

                croppingContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

export { initializeImageUpload };



