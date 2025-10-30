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
