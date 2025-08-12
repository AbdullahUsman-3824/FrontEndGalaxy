const edtBtn = document.getElementById("edit");
const output = document.getElementById("output");

//  -------------------------------------------------Add New task--------------------------------->
const addBtn = document.getElementById("add");
const AddTask = () => {
    let input = document.getElementById("inputBox");
    let value = input.value;
    let tno = document.getElementById("keyBox");
    let key = tno.value;
    if (key === "" || value === "") {
        displayError("Please provide a valid task key and task value.");
        return; // Do not proceed with adding the task
    }
    localStorage.setItem(key, value);
    GetTask();
    input.value = "";
    tno.value = "";
};
addBtn.addEventListener("click", AddTask);

//-----------------error handling----------------->
function displayError(message) {
    const errorContainer = document.getElementById("error-container");
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;

    errorContainer.appendChild(errorMessage);
    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

//-------------------------------------------------Get All Tasks--------------------------------->

const getBtn = document.getElementById("get");
const rmvbtn = (key) => {
    localStorage.removeItem(key);
    GetTask();
};

const GetTask = () => {
    let ihtml = "";
    for (let i = 0; i < localStorage.length; i++) {
        const taskKey = localStorage.key(i);
        const taskValue = localStorage.getItem(taskKey);
        ihtml += `
    <div class="outTask">
      <span class="key invisible" >${taskKey}</span>
      <span class="value">${taskValue}</span>
      <button class="removeBtn" data-key="${taskKey}">Remove</button>
    </div>
    `;
    }
    output.innerHTML = ihtml;
    // ---------------------------------add functionality to REMOVE buttons---------------------------------
    const removeButtons = document.querySelectorAll(".removeBtn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const btnKey = button.getAttribute("data-key");
            rmvbtn(btnKey);
        });
    });
    // ---------------------------------add functionality to EDIT buttons---------------------------------
    edtBtn.addEventListener("click", () => {
        const values = document.querySelectorAll(".key");
        values.forEach((value) => {
            if (value.classList.contains("invisible")) {
                value.classList.remove("invisible");
            } else {
                value.classList.add("invisible");
            }
        });
    });
};
GetTask();

//------------------------Clear all----------------------------->
const clrBtn = document.getElementById("clear");
const confirmClearBtn = document.getElementById("confirm-clear");
const cancelClearBtn = document.getElementById("cancel-clear");

// Event listener for "Clear Tasks" button
clrBtn.addEventListener("click", () => {
    const popup = document.getElementById("confirmation-popup");
    popup.style.display = "block";
});

// Event listener for "Yes" button in the confirmation pop-up
confirmClearBtn.addEventListener("click", () => {
    const popup = document.getElementById("confirmation-popup");
    popup.style.display = "none";

    // Clear all tasks from localStorage
    localStorage.clear();
    GetTask();
});

// Event listener for "Cancel" button in the confirmation pop-up
cancelClearBtn.addEventListener("click", () => {
    const popup = document.getElementById("confirmation-popup");
    popup.style.display = "none";
});
