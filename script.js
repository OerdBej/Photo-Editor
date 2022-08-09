const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterSlider = document.querySelector(".slider input");
previewImg = document.querySelector(".preview-img img");
chooseImgBtn = document.querySelector(".choose-img");
filterValue = document.querySelector(".filter-info .value");

// manually setting up brightness and saturation to make the conditions. So each button will have set up the value from the input.

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscalse = 0;

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
  console.log(file);
};

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;
    if (option.id === "brightnes") {
      filterSlider.value = `brightness`;
      filterValue.innerText = `${brightness}`;
    }
  });
});

// getting the value and updating dynamicly the filter %
const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

  if (selectedFilter.id === "brightness") {
    // if selected filter is brightness, pass the slider value as brightnes value

    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscalse = filterSlider.value;
  }
};

fileInput.addEventListener("change", loadImage);

// event listener triggered by the function values
filterSlider.addEventListener("input", updateFilter);

// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());
