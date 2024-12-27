// Query Selectors
const bmiForm = document.querySelector(".bmi-form");
const bmiResult = document.querySelector(".bmi-result");
// const reloadBtn = document.querySelector(".reload");

// Event Handlers
bmiForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(bmiForm);
  const height = formData.get("height");
  const weight = formData.get("weight");

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert(`
            Please enter a valid weight and height !!\n
            Weight Entered: ${weight}
            Height Entered: ${height}
        `);
    return;
  }
  updateBmiResults(height, weight);
});

// Utility functions
function updateBmiResults(height, weight) {
  const bmi = ((weight * 1e4) / (height * height)).toFixed(1);
  bmiResult.querySelector('.bmi-val').innerHTML = `${bmi}`;

  const bmiMsgElem = bmiResult.querySelector('.bmi-msg');

  if (bmi < 18.5) {
    bmiMsgElem.innerHTML = 'Under Weight';
    bmiMsgElem.style.color = 'yellow';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiMsgElem.innerHTML = 'Normal Weight';
    bmiMsgElem.style.color = 'green';
  } else {
    bmiMsgElem.innerHTML = 'Over Weight';
    bmiMsgElem.style.color = 'red';
  }
}