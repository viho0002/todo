let todoArr = [];
window.addEventListener("load", start);

function start() {
  // Retrieving the string
  let retString = localStorage.getItem("key");
  // Retrieved array
  todoArr = JSON.parse(retString);
  // Update Array from localstorage
  updateArr();
  // TODO: Add event-listeners to completed button and inputfield
  registerButtons();
}

function registerButtons() {
  // ADD event listener
  document.querySelector(".input button").addEventListener("click", createObj);
}

function createObj() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // GAMMEL DATO TING
  // const month = new Date().getMonth(); // months from 1-12
  // const day = new Date().getDate();
  // const year = new Date().getFullYear();
  // // const date = `${day}-${month}-${year}`;

  //Finder datoen som blivergivet af input
  const date = inputDate.value;

  // Deler datoen op fordi den venner den forkerte vej
  let tododateyear = "";
  let tododatemonth = "";
  let tododateday = "";
  // Tjekker om der er en tom ting i datoen
  if (date === "") {
    removeWarning();
    return;
  } else {
    tododateyear = date.substring(date.indexOf(""), date.indexOf("-"));
    tododatemonth = date.substring(date.indexOf("-"), date.lastIndexOf("-"));
    tododateday = date.substring(date.lastIndexOf("-") + 1);
  }

  // Sætter datoen sammen
  const realdate = `${tododateday}${tododatemonth}-${tododateyear}`;

  // Laver objected
  const taskObject = {
    text: text.value,
    id: self.crypto.randomUUID(),
    done: false,
    date: realdate,
  };

  // Tilføjer objected til arrayet
  todoArr.push(taskObject);

  // sender opatering til arr
  updateArr();
}

// TIngen der popper op når man mangler en dato
function removeWarning() {
  document.querySelector("#remove_other").classList.remove("hide");
  document.querySelector("#remove_other .closebutton").addEventListener("click", closeDialog);
  function closeDialog() {
    document.querySelector("#remove_other").classList.add("hide");
    document.querySelector("#remove_other .closebutton").removeEventListener("click", closeDialog);
  }

  // sender opatering til arr
  updateArr();
}

function updateArr() {
  // resetter templaten
  document.querySelector("#list tbody").innerHTML = "";
  // sortere i forehold til done boolean
  todoArr.sort(function (a, b) {
    if (a.done > b.done) {
      return 1;
    } else {
      return -1;
    }
  });
  // Tilføjer updatering til localstorage
  let localeArr = JSON.stringify(todoArr);
  localStorage.setItem("key", localeArr);
  // sender til visualisering af data
  todoArr.forEach(displayTask);
}

function displayTask(task) {
  const clone = document.querySelector("template#task").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=text]").textContent = task.text;
  clone.querySelector("[data-field=date]").textContent = task.date;
  clone.querySelector("[data-field=del]").textContent = "X";

  clone.querySelector("[data-field=done]").dataset.done = task.done;
  //ting til at gøre done true
  if (task.done === true) {
    clone.querySelector("[data-field=done]").textContent = "☑";
    clone.querySelector("tr").classList.add("done");
  } else {
    clone.querySelector("[data-field=done]").textContent = "☐";
    clone.querySelector("tr").classList.remove("done");
  }

  clone.querySelector("[data-field=done]").addEventListener("click", clickDone);

  function clickDone() {
    if (task.done === true) {
      task.done = false;
    } else {
      task.done = true;
    }
    updateArr();
  }

  //ting til at fjerne ting
  clone.querySelector("[data-field=del]").addEventListener("mousedown", (e) => {
    let ded = todoArr.findIndex((obj) => obj.id === task.id);
    todoArr.splice(ded, 1);
    updateArr();
  });

  document.querySelector("#list tbody").appendChild(clone);
}

// LAVET SOME LISTE

// displayTask();
// function displayTask() {
//   toDoListQsl.innerHTML = "";
//   toDOarr.forEach((task) => {
//     const li = document.createElement("li");

//     li.innerHTML += `<h3>${task.text}<h3><button class="toggle_done">Done</button>`;
//     li.classList.add(task.done ? "colorDone" : "colorTodo");

//     // if (task.done) {
//     //   li.classList.add("colorDone");
//     // } else {
//     //   li.classList.add("colorTodo");
//     // }

//     li.addEventListener("click", (evt) => {
//       const target = evt.target;
//       const currentTarget = evt.currentTarget;

//       console.log("current target", currentTarget);
//       console.log("target", target);

//       if (target.classList.contains("toggle_done")) {
//         console.log("jeg har klikket på Done");
//         task.done = !task.done;
//         console.log("todoarr", toDOarr);
//         displayTask();
//       }
//     });

//     toDoListQsl.appendChild(li);
//   });
// }
// // hvordan man får en id
// // self.crypto.randomUUID();

// // hvad er thead og tbody????
// //ville det måske være en god ide at have dato?
