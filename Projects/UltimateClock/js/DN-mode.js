//mode switch
let modeSwitch;
let initialState;

document.addEventListener("DOMContentLoaded", () => {
  modeSwitch = document.getElementById("mode-switch");
  initialState = localStorage.getItem("toggleState");
  modeSwitch.checked = initialState === "true"; // Parse the stored value as boolean
  applyTheme();

  modeSwitch.addEventListener("change", () => {
    localStorage.setItem("toggleState", modeSwitch.checked);
    applyTheme();
  });
});
let Nav = document.getElementById("Nav");
function applyTheme() {
  if (modeSwitch.checked) {
    document.body.classList.remove("light");
    Nav.classList.add("navbar-dark");
    Nav.classList.remove("navbar-light");
  } else {
    document.body.classList.add("light");
    Nav.classList.remove("navbar-dark");
    Nav.classList.add("navbar-light");
  }
}