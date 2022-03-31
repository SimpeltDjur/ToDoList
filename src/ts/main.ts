import { Task } from "./models/Task";

let lista: Task[] = [
  new Task("Jobba", false),
  new Task("Sova", true),
  new Task("Äta", false),
  new Task("Dö", false),
];

let showDoneTaskes: boolean = true;

taskDoneSort(lista);

makeList(lista, "list");

let saveButton = document.getElementById("save");
saveButton.addEventListener("click", saveToDo);

function saveToDo() {
  let todo = (<HTMLInputElement>document.getElementById("newtodo")).value;
  if (todo != "") {
    let task: Task = new Task(todo, false);
    lista.push(task);
    makeList(lista, "list");
  }
}

let show = document.getElementById("show").addEventListener("click", showDone);

function showDone() {
  showDoneTaskes = true;
  makeList(lista, "list");
}

let hide = document.getElementById("hide").addEventListener("click", hideDone);

function hideDone() {
  showDoneTaskes = false;
  makeList(lista, "list");
}

//Recursive function that generates a html version of a
//Task[] and sorts it based on wether the task is done or not.
// Allso adds eventlisteners to both the text and the side buttons.
function makeList(lista: Task[], id: string) {
  let showList = document.getElementById(id);

  while (showList.firstChild) {
    showList.removeChild(showList.lastChild);
  }

  taskDoneSort(lista);

  showList.classList.add("styleNone");
  for (let i = 0; i < lista.length; i++) {
    let li = document.createElement("li");

    let buttonUp = document.createElement("button");
    buttonUp.innerHTML = "up";

    let span = document.createElement("span");
    span.innerHTML = lista[i].title;

    let buttonDown = document.createElement("button");
    buttonDown.innerHTML = "down";

    li.appendChild(buttonUp);
    li.appendChild(span);
    li.appendChild(buttonDown);
    li.classList.add("adjust");

    buttonUp.addEventListener("click", () => {
      if (i > 0) {
        let temp: Task = lista[i - 1];
        lista[i - 1] = lista[i];
        lista[i] = temp;
        makeList(lista, id);
      }
    });
    buttonDown.addEventListener("click", () => {
      if (i < lista.length - 1) {
        let temp: Task = lista[i + 1];
        lista[i + 1] = lista[i];
        lista[i] = temp;
        makeList(lista, id);
      }
    });

    span.addEventListener("click", () => {
      if (lista[i].done === false) {
        lista[i].done = true;
        span.classList.add("done");
      } else {
        lista[i].done = false;
        span.classList.remove("done");
      }

      makeList(lista, id);
    });

    if (lista[i].done === true) {
      span.classList.add("done");
    }

    if (showDoneTaskes || lista[i].done === false) {
      showList.appendChild(li);
    }
  }
}

// Jag har lärt mig sortera objekt i Javascript :D
function taskDoneSort(lista: Task[]) {
  lista.sort((a, b) => {
    if (a.done === false) {
      return -1;
    }
    if (b.done === false) {
      return 1;
    } else {
      return 0;
    }
  });
}
