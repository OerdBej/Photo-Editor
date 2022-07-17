const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img img");

console.log(fileInput);

// Getting the users selected file. Using files method from global object, if there is no file
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  // creates a string containing URL representing the object given in parameter.
  previewImg.src = URL.createObjectURL(file);
  // When something is clicked put on the flter button ON
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
  console.log(file);
};

fileInput.addEventListener("change", loadImage);

// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());
