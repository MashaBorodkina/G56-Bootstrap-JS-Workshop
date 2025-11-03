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
let currentEditingTodo = null;

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
  // Edit existing Todo in List
  if (target && target.classList.contains("btn-outline-secondary")) {
    const todoItem = target.closest(".todo-item");
    if (!todoItem) return;

    currentEditingTodo = todoItem;

    const titleEl = todoItem.querySelector(".title-list-element");
    const descriptionEl = todoItem.querySelector(".description-list-element p");
    const dueEl = todoItem.querySelector(".due-list-element");
    const assignEl = todoItem.querySelector(".assign-list-element");

    document.getElementById("edit-title").value = titleEl.textContent.trim();
    document.getElementById("edit-description").value =
      descriptionEl.textContent.trim();
    document.getElementById("edit-due-date").value = dueEl.textContent.replace(
      "Due: ",
      ""
    );
    const assignSelect = document.getElementById("edit-assign");
    for (let i = 0; i < assignSelect.options.length; i++) {
      if (assignSelect.options[i].text === assignEl.textContent.trim()) {
        assignSelect.selectedIndex = i;
        break;
      }
    }

    const editModal = new bootstrap.Modal(
      document.getElementById("editTodoModal")
    );
    editModal.show();
  }

  // ------ Save Edited Todo ------

  const saveEditButton = document.getElementById("save-edit-todo");
  saveEditButton.addEventListener("click", function () {
    if (!currentEditingTodo) return;
    const newTitle = document.getElementById("edit-title").value.trim();
    const newDescription = document
      .getElementById("edit-description")
      .value.trim();
    const newDue = document.getElementById("edit-due-date").value;
    const newAssignSelect = document.getElementById("edit-assign");
    const newAssignedTo =
      newAssignSelect.options[newAssignSelect.selectedIndex].text;

    currentEditingTodo.querySelector(".title-list-element").textContent =
      newTitle;
    currentEditingTodo.querySelector(
      ".description-list-element p"
    ).textContent = newDescription;
    currentEditingTodo.querySelector(
      ".due-list-element"
    ).textContent = `Due: ${newDue}`;
    currentEditingTodo.querySelector(".assign-list-element").textContent =
      newAssignedTo;

    const editModalEl = document.getElementById("editTodoModal");
    const editModal = bootstrap.Modal.getInstance(editModalEl);
    editModal.hide();
    currentEditingTodo = null;
  });
});
