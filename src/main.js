import "./style.css";

const todos = [
  { id: 1, text: "Buy milk", completed: false},
  { id: 2, text: "Buy bread", completed: false},
  { id: 3, text: "Buy jam", completed: true},
];

let nextTodoId = 4;
let filter = "all";

document.addEventListener("DOMContentLoaded", renderTodos);


function handleNewTodoKeyDown(event) {
  const newtodoInput = event.target;
  const todoText = newtodoInput.value.trim();
  if (event.key === "Enter" && todoText !== "") {
    todos.push({ id: nextTodoId++, text: todoText, completed: false});
    newtodoInput.value = "";
    renderTodos();
  }
}

const newtodoInput = document.getElementById("new-todo");
newtodoInput.addEventListener("keydown", handleNewTodoKeyDown);

function renderTodos() {
  const todoListElement = document.getElementById("todo-list");
  todoListElement.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    const todoItem = document.createElement("div");
    todoItem.classList.add("p-4", "todo-item");
    todoListElement.appendChild(todoItem);

    const todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    if (todo.completed) {
      todoText.classList.add("line-through");
    }
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    const todoEdit = document.createElement("input");
    todoEdit.classList.add("hidden", "todo-edit");
    todoEdit.value = todo.text;
    todoItem.appendChild(todoEdit);
  }
}