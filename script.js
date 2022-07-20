const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterSlider = document.querySelector(".filter-input input");
previewImg = document.querySelector(".preview-img img");
chooseImgBtn = document.querySelector(".choose-img");

// Getting the users selected file. Using files method from global object, if there is no file
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  // creates a string containing URL representing the object given in parameter.
  previewImg.src = URL.createObjectURL(file);
  // When something is clicked and the page is loaded put on the flter button ON
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
  console.log(file);
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
  });
});

fileInput.addEventListener("change", loadImage);
// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());
