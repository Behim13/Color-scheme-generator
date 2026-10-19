// getting color

const getSchemeBtn = document.getElementById("get-scheme-btn");
const colorInput = document.getElementById("color-input");
const colorVariant = document.getElementById("color-variant");
const colorSections = document.querySelectorAll(".color-section");
let colorsArr = [];

getSchemeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  renderColorScheme();
});

document.querySelector("main").addEventListener("click", (e) => {
  const section = e.target.closest(".color-section");
  if (!section) return;
  handleCopyEvent(section);
});

function handleCopyEvent(section) {
  const hexText = section.querySelector(".color-info p");

  navigator.clipboard.writeText(hexText.textContent).then(() => {
    // get original hex value
    const originalText = hexText.textContent;

    hexText.textContent = "Copied!";

    // set it back to original value
    setTimeout(() => {
      hexText.textContent = originalText;
    }, 1500);
  });
}

function renderColorScheme() {
  let hexValue = colorInput.value.replace("#", "");
  let variant = colorVariant.value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${variant}`)
    .then((response) => response.json())
    .then((data) => {
      // clean the array
      colorsArr = [];

      data.colors.forEach((color) => {
        colorsArr.push(color.hex.value);
      });

      renderColors(colorsArr);
    });
}

function renderColors(arr) {
  let color;
  let hexText;
  for (let i = 0; i < colorSections.length; i++) {
    color = colorSections[i].querySelector(".color");
    hexText = colorSections[i].querySelector(".color-info p");
    color.style.backgroundColor = `${arr[i]}`;
    hexText.textContent = arr[i];
  }
}
