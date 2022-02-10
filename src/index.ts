import Icon from "./assets/githubLogo-32px.png";
import "./styles.scss";
import Task from "./task";

function importAssets() {
  const img = document.getElementById("logo") as HTMLImageElement;
  img.src = Icon;
}

class TodoApp {
  btns: {
    elmnt: HTMLButtonElement;
    hidden: boolean;
  }[];

  inputArea: {
    elmnt: HTMLDivElement;
    isEditable: boolean;
  };

  container: HTMLDivElement;

  tasks: Task[];

  constructor() {
    importAssets();

    this.btns = [];
    this.updateBtns();

    this.inputArea = {
      elmnt: document.getElementById("addTask") as HTMLDivElement,
      isEditable: false
    };
    this.container = document.querySelector(".tasksWrap") as HTMLDivElement;
    this.tasks = [];
    //  Testing
    this.setListeners();
  }

  setListeners() {
    this.btns[0].elmnt.addEventListener("click", this.toggleStates.bind(this));
    this.btns[1].elmnt.addEventListener("click", this.onClickSave.bind(this));
    this.inputArea.elmnt.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        // console.log("Enter clicked inside TextBox");
        this.onClickSave();
      }
    });
  }

  toggleStates() {
    this.inputArea.elmnt.contentEditable = this.inputArea.isEditable
      ? "false"
      : "true";
    this.inputArea.isEditable = !this.inputArea.isEditable;
    this.btns.map((btn) => {
      if (btn.hidden) {
        btn.elmnt.style.display = "";
      } else {
        btn.elmnt.style.display = "none";
      }
      btn.hidden = !btn.hidden;
    });
  }

  onClickSave() {
    if (this.inputArea.elmnt.innerText) {
      this.tasks.push(new Task(this.inputArea.elmnt.innerText, this.container));
      this.inputArea.elmnt.innerText = "";
      this.toggleStates();
    } else {
      this.inputArea.elmnt.classList.add("addTask-error");
      setTimeout(() => {
        this.inputArea.elmnt.classList.remove("addTask-error");
        this.inputArea.elmnt.focus();
      }, 700);
    }
  }

  updateBtns() {
    const btnNames = ["add", "save", "del", "discard"];
    const hiddenBtns = ["save", "discard"];
    btnNames.map((name) => {
      this.btns.push({
        elmnt: document.querySelector(`.editBtns_${name}`) as HTMLButtonElement,
        hidden: hiddenBtns.includes(name)
      });
    });
  }
}

new TodoApp();
