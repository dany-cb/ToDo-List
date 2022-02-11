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
  return text;
}

function createRemoveBtn() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "inherit");
  svg.setAttribute("class", "i task_delBtn");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", "#xSymbol");
  svg.appendChild(use);
  return svg;
}

let removeBtn: SVGElement | undefined;
let div: HTMLDivElement | undefined;

class Task {
  taskEl: HTMLDivElement;
  textEl: HTMLParagraphElement;
  isDone: boolean;
  isDeleted: boolean;

  constructor(textData: string, container: HTMLDivElement, done = false) {
    //Defining the necessary structure for each Task and appending it to the container
    if (!div || !removeBtn) {
      div = createTaskEl();
      removeBtn = createRemoveBtn();
    }
    this.taskEl = div.cloneNode(true) as HTMLDivElement;
    this.textEl = addText(this.taskEl, textData);
    const xBtn = removeBtn.cloneNode(true) as SVGElement;
    this.taskEl.appendChild(xBtn);
    container.insertBefore(this.taskEl, container.firstChild);
    const label = this.taskEl.firstChild?.firstChild as HTMLLabelElement;
    label.addEventListener("click", this.toggleState.bind(this));
    xBtn.addEventListener("click", this.removeTask.bind(this));

    this.isDone = done;
    this.isDeleted = false;
  }

  toggleState() {
    this.isDone = !this.isDone;
    this.textEl.style.textDecoration = this.isDone ? "line-through" : "";
  }

  removeTask() {
    this.taskEl.firstChild?.removeEventListener(
      "click",
      this.toggleState.bind(this)
    );
    this.taskEl.remove();
    this.isDeleted = true;
  }
}

export default Task;
