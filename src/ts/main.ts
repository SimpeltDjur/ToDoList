import { Task } from "./models/Task";

let lista: Task[] = [
  new Task("Jobba", false),
  new Task("Sova", true),
  new Task("Äta", false),
  new Task("Dö", false),
];

taskDoneSort(lista);

makeList(lista, "list");

//Recursive function that generates a html version of a
//Task[] and sorts it based on wether the task is done or not.
function makeList(lista: Task[], id: string) {
  let showList = document.getElementById(id);

  while (showList.firstChild) {
    showList.removeChild(showList.lastChild);
  }

  taskDoneSort(lista);

  showList.classList.add("styleNone");
  for (let i = 0; i < lista.length; i++) {
    let li = document.createElement("li");

    li.innerHTML = lista[i].title;

    li.addEventListener("click", () => {
      if (lista[i].done === false) {
        lista[i].done = true;
        li.classList.add("done");
      } else {
        lista[i].done = false;
        li.classList.remove("done");
      }

      makeList(lista, id);
    });

    if (lista[i].done === true) {
      li.classList.add("done");
    }

    showList.appendChild(li);
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
//Hur man hittar index
let index = lista.findIndex((element) => element.title === lista[1].title);
