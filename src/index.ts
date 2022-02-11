import Icon from "./assets/githubLogo-32px.png";
import "./styles.scss";
import Task from "./task";

function importAssets() {
  const img = document.getElementById("logo") as HTMLImageElement;
  img.src = Icon;
}

interface btn {
  elmnt: HTMLButtonElement;
  hidden: boolean;
}
[];

type btnType = "primaryBtns" | "onAddBtns" | "onDelBtns";

class TodoApp {
  btns: {
    [key in btnType]: btn[];
  };

  inputArea: {
    elmnt: HTMLDivElement;
    isEditable: boolean;
  };

  container: HTMLDivElement;

  tasks: Task[];

  constructor() {
    importAssets();

    this.btns = {
      primaryBtns: [],
      onAddBtns: [],
      onDelBtns: []
    };
    this.updateBtns();

    this.inputArea = {
      elmnt: document.getElementById("addTask") as HTMLDivElement,
      isEditable: false
    };
    this.container = document.querySelector(".tasksWrap") as HTMLDivElement;
    this.tasks = [];
    this.setListeners();
  }

  setListeners() {
    /*  Primary Buttons */
    this.btns.primaryBtns[0].elmnt.addEventListener(
      "click",
      this.onClickAdd.bind(this)
    ); // Add Btn
    this.btns.primaryBtns[1].elmnt.addEventListener(
      "click",
      this.onClickDelete.bind(this)
    ); // Delete Btn

    /*  Buttons shown when Add is clicked */
    this.btns.onAddBtns[0].elmnt.addEventListener(
      "click",
      this.onClickSave.bind(this)
    ); // Save Btn
    this.btns.onAddBtns[1].elmnt.addEventListener(
      "click",
      this.onClickDiscard.bind(this)
    ); // Discard Btn

    /*  Buttons shown when Delete is clicked  */
    this.btns.onDelBtns[0].elmnt.addEventListener(
      "click",
      this.onClickDone.bind(this)
    ); // Done Btn
    this.btns.onDelBtns[1].elmnt.addEventListener(
      "click",
      this.onClickClearAll.bind(this)
    ); // ClearAll Btn

    /*  Enter key pressed within TextArea */
    this.inputArea.elmnt.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        // console.log("Enter clicked inside TextBox");
        this.onClickSave();
      }
    });
  }

  toggleBtnStates(btn1: btnType, btn2: btnType) {
    if (btn1 === btn2)
      console.warn("toggleBtnStates() called with same arguments");

    [btn1, btn2].forEach((btnType) => {
      this.btns[btnType].map((btn) => {
        if (btn.hidden) {
          btn.elmnt.style.display = "";
        } else {
          btn.elmnt.style.display = "none";
        }
        btn.hidden = !btn.hidden;
      });
    });
  }

  /**
   * Toggles the Primary Btns and the InputArea
   * Can be reused to reverse the changes
   */
  onClickAdd() {
    this.inputArea.elmnt.contentEditable = this.inputArea.isEditable
      ? "false"
      : "true";
    this.inputArea.isEditable = !this.inputArea.isEditable;
    this.toggleBtnStates("primaryBtns", "onAddBtns");
    this.inputArea.elmnt.focus();
  }

  onClickSave() {
    if (this.inputArea.elmnt.innerText) {
      this.tasks.push(new Task(this.inputArea.elmnt.innerText, this.container));
      this.inputArea.elmnt.innerText = "";
      this.onClickAdd();
    } else {
      this.inputArea.elmnt.classList.add("addTask-error");
      setTimeout(() => {
        this.inputArea.elmnt.classList.remove("addTask-error");
        this.inputArea.elmnt.focus();
      }, 700);
    }
  }

  onClickDiscard() {
    this.inputArea.elmnt.innerText = "";
    this.onClickAdd();
  }

  onClickDelete() {
    this.toggleBtnStates("primaryBtns", "onDelBtns");
    this.container.classList.toggle("tasksWrap-delete");
  }

  onClickDone() {
    this.onClickDelete();
    this.tasks = this.tasks.filter((task) => !task.isDeleted);
  }

  onClickClearAll() {
    this.onClickDelete();
    this.tasks.map((task) => task.removeTask());
    this.tasks = [];
  }

  updateBtns() {
    const btnNames = {
      primaryBtns: ["add", "del"],
      onAddBtns: ["save", "discard"],
      onDelBtns: ["done", "clearAll"]
    };
    for (const [key, value] of Object.entries(btnNames)) {
      this.btns[key as btnType].push(
        ...value.map((name) => ({
          elmnt: document.querySelector(
            `.editBtns_${name}`
          ) as HTMLButtonElement,
          hidden: key != "primaryBtns"
        }))
      );
    }
  }
}

new TodoApp();
