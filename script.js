// --------- Assigned to person ------------

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

// ---------- Add Todo to List ----------

const pushButton = document.getElementById("add-todo");
pushButton.addEventListener("click", addTodo);

function addTodo(event) {
  event.preventDefault(); // prevent restarting the page

  const cloneElement = document.getElementById("list-element").cloneNode(true);
  cloneElement.removeAttribute("id");
  cloneElement.classList.add("todo-item");
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

  const dueEl = cloneElement.querySelector(".due-list-element");
  dueEl.textContent = `Due: ${due}`;

  cloneElement.querySelector(".assign-list-element").textContent =
    assignedToSelect;

  // add data to Created At
  const now = new Date();
  const createdAtElement = cloneElement.querySelector(".created-list-element");
  const datePart = now.toISOString().split("T")[0];
  const timePart = now.toTimeString().split(" ")[0];
  createdAtElement.textContent += `${datePart} ${timePart}`;

  // append cloned element to list container

  const listContainer = document.getElementById("todo-list-container");
  listContainer.appendChild(cloneElement);

  // reset form fields

  document.getElementById("form-container").reset();
}

// ---------- Remove existing Todo from List ----------

const deleteButtons = document.querySelectorAll(".btn-outline-danger");
const listContainer = document.getElementById("todo-list-container");

listContainer.addEventListener("click", function (event) {
  let target = event.target;
  if (target.tagName === "I") {
    target = target.closest("button");
  }
  if (target && target.classList.contains("btn-outline-danger")) {
    const todoItem = target.closest(".todo-item");
    if (todoItem) {
      const ok = confirm("Are you sure you want to delete this todo item?");
      if (ok) {
        todoItem.remove();
      }
    }
  }
});
