import "./style.css";

// Get the necessary DOM elements
const todoListElement = document.getElementById("todo-list");
const inputNewTodo = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");

// Define the state of our app
let todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
let filter = "all"; // can be 'all', 'active', or 'completed'

const todoApp = createTodoApp();

// Function to render the todos based on the current filter
const renderTodos = () => {
  todoListElement.replaceChildren(...filterTodos(todos, filter).map(createTodoItem));
}

const filterTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return [...todos];
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "active":
      return todos.filter((todo) => !todo.completed);
    default:
      return [...todos];
  }
};

const addTodo = (todos, newTodoText) => [
  ...todos, {id: nextTodoId++, text: newTodoText, completed: false},
];

const createTodoText = (todo) => {
  const todoText = document.createElement("div");
  todoText.id = `todo-text-${todo.id}`;
  todoText.classList.add("todo-text", ...(todo.completed ? ["line-through"] : []),);
  todoText.innerText = todo.text;
  return todoText;
}

const createTodoEditInput = (todo) => {
  const todoEdit = document.createElement("input");
  todoEdit.classList.add("hidden", "todo-edit");
  todoEdit.value = todo.text;
  return todoEdit;
}

const createTodoItem = (todo) => {
  const todoItem = document.createElement("div");
  todoItem.classList.add("p-4", "todo-item");
  todoItem.append(createTodoText(todo), createTodoEditInput(todo));
  return todoItem;
}

// Function to handle adding a new todo
const handleKeyDownToCreateNewTodo = (event) => {
  if (event.key === "Enter") {
    const todoText = event.target.value.trim();
    if (todoText) {
      todoApp.addTodo(todoText);
      event.target.value = "";
      renderTodos();
    }
  }
}

// Function to handle marking a todo as completed
function handleClickOnNavbar(event) {
  // if the clicked element is an anchor tag
  if (event.target.tagName === "A") {
    const hrefValue = event.target.href;
    filter = hrefValue.split("/").pop() || "all";

    // render the app UI
    renderTodoNavBar(hrefValue);
    renderTodos();
  }
}

const createTodoApp = () => {
  let todos = [];
  let nextTodoId = 1;
  let filter = "all";

  return {
    addTodo: (newTodoText) => {
      todos = addTodo(todos, newTodoText, nextTodoId++);
    }, 
    toggleTodo: (todoId) => {
      todos = toggleTodo(todos, todoId);
    }, 
    setFilter: (newFilter) => {
      todos = toggleTodo(todos, todoId);
    }, 
    getTodos: () => filterTodos(todos, filter),
  };
}

const updateClassList = (element, isActive) => {
  const classes = ["underline", "underline-offset-4", "decoration-rose-800", "decoration-2"];
  if (isActive) {
    element.classList.add(...classes);
  } else {
    element.classList.remove(...classes);
  }
}

// Function to update the navbar anchor elements
function renderTodoNavBar(href) {
  Array.from(todoNav.children).forEach((element) => {
    updateClassList(element, element.href === href);
  });
}

// Function to toggle the completed status of a todo
function handleClickOnTodoList(event) {
  todos = toggleTodo(todos, parseTodoId(findTargetTodoElement(event)));

  // Re-render the app UI
  renderTodos();
}

const toggleTodo = (todos, todoId) => 
  todos.map((todo) => 
    todo.id === todoId ? {...todo, completed: !todo.completed} : todo
  );

const findTargetTodoElement = (event) => event.target.id?.includes("todo-text") ? event.target : null;

const parseTodoId = (todo) => (todo ? Number(todo.id.split("-").pop()) : -1);


// Add the event listeners
todoListElement.addEventListener("click", handleClickOnTodoList);
inputNewTodo.addEventListener("keydown", handleKeyDownToCreateNewTodo);
todoNav.addEventListener("click", handleClickOnNavbar);
document.addEventListener("DOMContentLoaded", renderTodos);
