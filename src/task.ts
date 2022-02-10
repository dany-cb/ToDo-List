/**
 * Defines the necessary structure of the task and returns the Parent Element
 * @param textData text to be inserted
 */
function createTaskEl() {
  const div = document.createElement("div");
  div.className = "task";
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "task_hiddenInput";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 15 15");
  svg.setAttribute("class", "i task_checkBox");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#tickSymbol");
  svg.appendChild(use);
  label.append(checkBox, svg);
  div.appendChild(label);
  return div;
}

function addText(taskEl: Node, textData: string) {
  const text = document.createElement("p");
  text.className = "task_text";
  text.innerText = textData;
  taskEl.appendChild(text);
}

let div: HTMLDivElement | undefined;

class Task {
  taskEl: Node;
  textEl: HTMLParagraphElement;
  isDone: boolean;

  constructor(textData: string, container: HTMLDivElement, done = true) {
    //Defining the necessary structure for each Task and appending it to the container
    if (!div) {
      div = createTaskEl();
    }
    this.taskEl = div.cloneNode(true);
    addText(this.taskEl, textData);
    this.textEl = this.taskEl.lastChild as HTMLParagraphElement;
    const label = this.taskEl.firstChild?.firstChild as HTMLLabelElement;
    label.addEventListener("click", this.toggleState.bind(this));
    container.appendChild(this.taskEl);
    this.isDone = done || false;
  }

  toggleState() {
    this.isDone = !this.isDone;
    this.textEl.style.textDecoration = this.isDone ? "" : "line-through";
  }
}

export default Task;
