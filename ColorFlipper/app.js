// Query Selectors
const colorChangeBtn = document.querySelector("#color-change-btn");
const mainElem = document.querySelector("MAIN");
const simpleNavBtn = document.querySelector("#simple-nav-btn");
const complexNavBtn = document.querySelector("#complex-nav-btn");

// Constansts
const simpleColors = ["red", "green", "blue", "yellow"];

// State Keepers
let simpleState = true;

// Event Listeners
colorChangeBtn.addEventListener("click", function (e) {
  if (simpleState === true) {
    const randomIndex = Math.floor(Math.random() * 4); // [0, 3]
    mainElem.querySelector("#color-value").innerHTML =
      simpleColors[randomIndex];
    mainElem.style.backgroundColor = simpleColors[randomIndex];
  } else {
    const genColor = function () {
      const r = Math.floor(Math.random() * 256); // [0, 255]
      const g = Math.floor(Math.random() * 256); // [0, 255]
      const b = Math.floor(Math.random() * 256); // [0, 255]
      return `RGB(${r}, ${g}, ${b})`;
    };
    const newColor = genColor();
    mainElem.querySelector("#color-value").innerHTML = newColor;
    mainElem.style.backgroundColor = newColor;
  }
});

simpleNavBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  simpleState = true;
});

complexNavBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  simpleState = false;
});
