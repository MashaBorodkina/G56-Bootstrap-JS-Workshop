// Assigned to person

const assignedTo = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
function addAssignedToOptions() {
  const selectElement = document.getElementById("assign");
  assignedTo.forEach((person) => {
    const option = document.createElement("option");
    option.value = person.id;
    option.textContent = person.name;
    selectElement.appendChild(option);
  });
}
addAssignedToOptions();

// Add Todo to List

const pushButton = document.getElementById("add-todo");
pushButton.addEventListener("click", addTodo);

function addTodo(event) {
  event.preventDefault(); // prevent restarting the page

  const cloneElement = document.getElementById("list-element").cloneNode(true);
  cloneElement.removeAttribute("id");
  cloneElement.classList.remove("d-none");

  // get form values

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const due = document.getElementById("due-date").value;

  const select = document.getElementById("assign");
  const assignedToSelect =
    document.getElementById("assign").options[select.selectedIndex].text;

  // add values to cloned element

  cloneElement.querySelector(".title-list-element").textContent = title;
  cloneElement.querySelector(".description-list-element p").textContent =
    description;
  cloneElement.querySelector(".due-list-element").textContent = due;
  cloneElement.querySelector(".assign-list-element").textContent =
    assignedToSelect;

  const listContainer = document.getElementById("todo-list-container");
  listContainer.appendChild(cloneElement);

  // reset form fields

  document.getElementById("form-container").reset();
}
