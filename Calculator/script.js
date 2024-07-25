let display = "";
let buttons = document.querySelectorAll("button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    try {
      if (e.target.innerHTML == "=") {
        display = eval(input.value);
      } else if (e.target.innerHTML == "C") {
        display = "";
      } else if (e.target.innerHTML == "AC") {
        display = display.slice(0, -1);
      } else {
        display += e.target.innerHTML;
      }
      input.value = display;
    } catch(err) {
      input.value=err.name;
    }
  });
});
