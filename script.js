"use strict";

const btnAdd = document.querySelector(".btn--add");
const input = document.querySelector(".todo_input-box");
const list = document.querySelector(".todo_list");
let todos;

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  displayItems();
});

btnAdd.addEventListener("click", addItem);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addItem();
  }
});

function addItem() {
  const task = {
    content: input.value.trim(),
    done: false,
  };

  if (task.content !== "") {
    todos.push(task);
    input.value = "";

    console.log(todos);

    localStorage.setItem("todos", JSON.stringify(todos));

    displayItems();
  }
}

const displayItems = function () {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const newItem = document.createElement("li");
    newItem.classList.add("todo_item");

    const text = document.createElement("p");
    text.classList.add("todo_text");
    text.textContent = todo.content;

    const checkmark = document.createElement("span");
    checkmark.classList.add("todo_checkmark");
    checkmark.innerHTML = `<img class="todo_checkmark-icon" src="img/checkmark.svg" />`;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("todo_checkbox");
    checkbox.checked = todo.done;
    text.style.textDecoration = todo.done ? "line-through" : "none";

    checkbox.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log(text);

      if (todo.done) {
        text.classList.add("todo--done");
      } else {
        text.classList.remove("todo--done");
      }

      displayItems();
    });

    const newButton = document.createElement("button");
    newButton.classList.add("btn--delete");
    newButton.classList.add("btn");
    newButton.innerHTML = `<img class="btn--delete-icon" src="img/close.svg" />`;
    newButton.addEventListener("click", () => {
      newItem.remove();
    });

    newButton.addEventListener("click", () => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      displayItems();
    });

    list.appendChild(newItem);
    newItem.insertBefore(checkmark, newItem.firstChild);
    newItem.insertBefore(checkbox, newItem.firstChild);
    newItem.appendChild(text);
    newItem.appendChild(newButton);
  });
};
