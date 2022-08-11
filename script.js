const fileInput = document.querySelector(".file-input");
filterOptions = document.querySelectorAll(".filter button");
filterName = document.querySelector(".filter-info .name");
filterSlider = document.querySelector(".slider input");
previewImg = document.querySelector(".preview-img img");
chooseImgBtn = document.querySelector(".choose-img");
filterValue = document.querySelector(".filter-info .value");
rotateOptions = document.querySelectorAll(".rotate button");
resetFilterBtn = document.querySelector(".reset-filter");
saveImgBtn = document.querySelector(".save-img");

// manually setting up brightness and saturation to make the conditions. So each button will have set up the value from the input.

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

// this variable is used for the flip/rotate buttons.

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  // this is a css style (trasform) that get's the value dynamicly
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    // this btn will reset the filter value if the users clicked to add another photo
    resetFilterBtn.click();
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
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

// function for the reset btn filter, reseting all the value to default

const resetFilter = () => {
  (brightness = 100), (saturation = 100), (inversion = 0), (grayscale = 0);
  (rotate = 0), (flipHorizontal = 1), (flipVertical = 1);
  // here we click brightnes btn in order to brightnes get the default value
  filterOptions[0].click();
  applyFilters();
};

// save img function

const saveImage = () => {
  // creating the canvas element. canvas.getContext return a drawing context for the canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // here we set up canvas to acual image width and height
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  // applying users selected filters to canvas filter
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  // This method will make the canvas to the center
  ctx.translate(canvas.width / 2, canvas.height / 2);
  // if the rotating value is not 0, then rotate the canvas
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  // creating an element in order to passit to dowload method to pass it as data url in canvas
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL;
  link.click();
};

fileInput.addEventListener("change", loadImage);

// event listener triggered by the function values
filterSlider.addEventListener("input", updateFilter);

// Triggers the hidden input
chooseImgBtn.addEventListener("click", () => fileInput.click());

// trigger the reset button filter
resetFilterBtn.addEventListener("click", resetFilter);

// save button
saveImgBtn.addEventListener("click", saveImage);
