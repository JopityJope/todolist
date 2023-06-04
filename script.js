"use strict";

const list = document.querySelector(".todo_list");
const btnAdd = document.querySelector(".btn--add");
const input = document.querySelector(".todo_input-box");

const displayItem = function () {
  const newItem = document.createElement("li");
  newItem.classList.add("todo_item");
  newItem.innerHTML = `<p class="todo_text">${input.value}</p>`;
  input.value = "";
  list.appendChild(newItem);
  addCheckbox(newItem);
  addDeleteBtn(newItem);
};

btnAdd.addEventListener("click", displayItem);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    displayItem();
  }
});

const addCheckbox = function (newItem) {
  const checkmark = document.createElement("span");
  checkmark.classList.add("todo_checkmark");
  checkmark.innerHTML = `<img class="todo_checkmark-icon" src="img/checkmark.svg" />`;

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("todo_checkbox");

  checkbox.addEventListener("click", markDone);
  newItem.insertBefore(checkmark, newItem.firstChild);
  newItem.insertBefore(checkbox, newItem.firstChild);
};

const addDeleteBtn = function (newItem) {
  const newButton = document.createElement("button");
  newButton.classList.add("btn--delete");
  newButton.classList.add("btn");
  newButton.innerHTML = `<img class="btn--delete-icon" src="img/close.svg" />`;
  newItem.appendChild(newButton);

  newButton.addEventListener("click", deleteItem);
};

const markDone = function (e) {
  const checkbox = e.target;
  checkbox.parentNode.classList.toggle("todo--done");
};

const deleteItem = function (e) {
  const btnDelete = e.target;
  console.log(btnDelete);
  btnDelete.parentNode.parentNode.remove();
};
