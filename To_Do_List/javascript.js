let taskObjArr = JSON.parse(localStorage.getItem("taskAdded")) || [];

displayTask();

// to add task
function taskAddingFn() {
  const inputEl = document.getElementById("taskInput");
  const text = inputEl.value.trim();
  if (!text) return alert("Please enter a task.");

  const taskObj = {
    id: Date.now(),
    taskAdd: text,
    date: new Date().toLocaleDateString(),
    completed: false,
  };

  taskObjArr.push(taskObj);
  localStorage.setItem("taskAdded", JSON.stringify(taskObjArr));
  inputEl.value = "";
  displayTask();
}

// to display task
function displayTask() {
  taskObjArr =
    JSON.parse(localStorage.getItem("taskAdded")) || taskObjArr || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  if (taskObjArr.length === 0) {
    taskList.innerHTML = "No task added yet";
  }
  if (taskObjArr.length > 0) {
    let filterTaskArr = [];
    let filterSelected = document.getElementById("filterTask").value;

    if (filterSelected === "true") {
      filterTaskArr = taskObjArr.filter((taskObj) => taskObj.completed);
    } else if (filterSelected === "false") {
      filterTaskArr = taskObjArr.filter((taskObj) => !taskObj.completed);
    } else {
      filterTaskArr = taskObjArr;
    }

    filterTaskArr.forEach((task, i) => {
      const li = document.createElement("li");

      const p = document.createElement("p");
      p.className = task.completed ? "completed" : "pending";
      p.ondblclick = () => editTask(task.id);

      const left = document.createElement("span");
      left.textContent = `${i + 1} || ${task.date} || ${task.taskAdd}`;

      const btnSet = document.createElement("span");
      btnSet.className = "buttonSet";

      const toggleBtn = document.createElement("button");
      toggleBtn.className = task.completed ? "tick" : "cross";
      toggleBtn.type = "button";
      toggleBtn.textContent = task.completed ? "⏳" : "✔";
      toggleBtn.onclick = () => taskCompleted(task.id);

      const delBtn = document.createElement("button");
      delBtn.className = "crossButton";
      delBtn.type = "button";
      delBtn.textContent = "X";
      delBtn.onclick = () => taskDelete(task.id);

      btnSet.appendChild(toggleBtn);
      btnSet.appendChild(delBtn);
      p.appendChild(left);
      p.appendChild(btnSet);
      li.appendChild(p);
      taskList.appendChild(li);
    });
  }
  document.getElementById("taskInput").value = "";
  deleteBtnToggle();
}

//to delete all the task and delete button toggle
function deleteBtnToggle() {
  let clearAllBtn = document.getElementById("clearAllBtn");

  if (taskObjArr.length > 0) {
    clearAllBtn.style.display = "block";
    document.getElementById("spanText").style.display = "block";
    document.getElementById("filters").style.display = "block";
  }
  if (taskObjArr.length === 0) {
    clearAllBtn.style.display = "none";
    document.getElementById("spanText").style.display = "none";
    document.getElementById("filters").style.display = "none";
  }
}
function deleteAllTask() {
  localStorage.removeItem("taskAdded");
  taskObjArr = [];
  displayTask();
}
//to delete particular task
function taskDelete(id) {
  taskObjArr = taskObjArr.filter((task) => task.id !== id);
  localStorage.setItem("taskAdded", JSON.stringify(taskObjArr));
  displayTask();
}

//toggleTaskStatus
function taskCompleted(id) {
  taskObjArr = taskObjArr.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("taskAdded", JSON.stringify(taskObjArr));
  displayTask();
}

// fitlerTask
function filterTask() {
  displayTask();
}

//changeTheme
let currentTheme = JSON.parse(localStorage.getItem("theme"));
if (currentTheme === null) {
  currentTheme = true; // default = light mode
}
let themeBtn = document.getElementById("theme");
function applyTheme() {
  themeBtn.innerHTML = currentTheme ? "🌝" : "🌑";
  document.body.style.backgroundColor = currentTheme ? "white" : "black";
}
function toggleTheme() {
  currentTheme = !currentTheme;
  applyTheme();
  localStorage.setItem("theme", JSON.stringify(currentTheme));
}
applyTheme();

//editTask
let currendEditId = null;
function editTask(id) {
  currendEditId = id;
  document.getElementById("addTaskBtn").style.display = "none";
  document.getElementById("editTaskBtn").style.display = "block";

  const taskToEdit = taskObjArr.find((task) => task.id === id);

  if (taskToEdit) {
    document.getElementById("taskInput").value = taskToEdit.taskAdd;
    document.getElementById("taskInput").focus();
  } else {
    document.getElementById("taskInput").value = "Enter your task...";
  }
}
function editAddingFn() {
  let newText = document.getElementById("taskInput").value;
  taskObjArr = taskObjArr.map((task) => {
    if (task.id === currendEditId) {
      return { ...task, taskAdd: newText };
    }
    return task;
  });
  localStorage.setItem("taskAdded", JSON.stringify(taskObjArr));
  displayTask();
  currendEditId = null;
  document.getElementById("taskInput").value = "";
  document.getElementById("addTaskBtn").style.display = "block";
  document.getElementById("editTaskBtn").style.display = "none";
}
