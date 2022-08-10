const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterSlider = document.querySelector(".slider input");
previewImg = document.querySelector(".preview-img img");
chooseImgBtn = document.querySelector(".choose-img");
filterValue = document.querySelector(".filter-info .value");
rotateOptions = document.querySelectorAll(".rotate button");

// manually setting up brightness and saturation to make the conditions. So each button will have set up the value from the input.

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

// this variable is used for the flip/rotate buttons.

let rotate = 0;

const applyFilters = () => {
  // this is a css style (trasform) that get's the value dynamicly
  previewImg.style.transform = `rotate(${rotate}deg)`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

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

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
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
    grayscale = filterSlider.value;
  }
  applyFilters();
};

// A loop for each flip/rotate button, we get the exact id of button clicked

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // when we click rotate left, decrement rotate value with -90
    if (option.id === "left") {
      rotate -= 90;
    }
    applyFilters();
  });
});

fileInput.addEventListener("change", loadImage);

// event listener triggered by the function values
filterSlider.addEventListener("input", updateFilter);

// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());
