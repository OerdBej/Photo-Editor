const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");

console.log(fileInput);

// Getting the users selected file. Using files method from global object, if there is no file
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  console.log(file);
};

fileInput.addEventListener("change", loadImage);

// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());
