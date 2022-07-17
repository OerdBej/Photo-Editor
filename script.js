const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");

// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());
