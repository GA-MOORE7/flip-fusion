import { createFrame } from "./frameMaker.js";
import { initializeImageUpload } from "./uploadImage.js";
import { makeCroppable } from "./makeCroppable.js";
import { addSaveButton } from "./addSaveButton.js";
import { addWordInput } from "./addWordInput.js";
import { setupSaveHandler } from "./setupSaveHandler.js";

createFrame(1);

initializeImageUpload(() => {
  makeCroppable();
  addSaveButton();
  addWordInput();
  setupSaveHandler(); 
});










