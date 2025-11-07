let taskObjArr = JSON.parse(localStorage.getItem("taskAdded")) || [];

displayTask();

// to add task
function taskAddingFn() {
  let taskObj = {
    id: Date.now(),
    taskAdd: document.getElementById("taskInput").value,
    date: new Date().toLocaleDateString(),
    completed: false,
  };

  taskObjArr.push(taskObj);
  localStorage.setItem("taskAdded", JSON.stringify(taskObjArr));
  displayTask();
}

// to display task
function displayTask() {
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
      li.innerHTML = ` <p class="${
        task.completed ? "completed" : "pending"
      }" ondblclick='editTask(${task.id})'>
    <span >
        ${i + 1} || ${task.date} || ${task.taskAdd}
    </span>
    <span class='buttonSet'>
        <button onclick = 'taskCompleted(${task.id})' class="${
        task.completed ? "tick" : "cross"
      }"> ${task.completed ? `⏳` : `✔`}</button>
        <button onclick = 'taskDelete(${
          task.id
        })' class="crossButton">X</button>
     </span>
    </p>
      `;
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
  localStorage.clear();
  location.reload();
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
  document.getElementById("addTaskBtn").style.display = "block";
  document.getElementById("editTaskBtn").style.display = "none";
  displayTask();
}
