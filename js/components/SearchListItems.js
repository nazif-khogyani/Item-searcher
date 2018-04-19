import SaveListItem from "./SaveListItem";
import axios from "axios";
const popupS = require("popups");
export default class SearchListItems {
  constructor(item, holder, mySavedArray, firebaseRef) {
    this.item = item;
    this.holder = holder;
    this.mySavedArray = mySavedArray;
    this.firebaseRef = firebaseRef;
    this.liId = "";
    this.items = "";
    this.addHtml();
    this.events();
  }
  addHtml(e) {
    let searchLiHtml = `<li id="searchItem-${
      this.item.fields.entity_id
    }" data-id="${this.item.fields.entity_id}">
    <img src="${this.item.fields.image_path}"></img>
    <h2>${this.item.title}</h2>
    <a href="#" id="heart"></a>
    </li>`;
    this.holder.insertAdjacentHTML("beforeend", searchLiHtml);
    this.liId = document.getElementById(
      `searchItem-${this.item.fields.entity_id}`
    );
    let checkId = this.inArray(this.item.fields.entity_id, this.mySavedArray);
    if (checkId) {
      this.liId.querySelector("#heart").classList.add("active");
    } else {
      this.liId.querySelector("#heart").classList.remove("active");
    }
  }
  events() {
    this.liId.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    e.preventDefault();

    // console.log(e.target.parentElement);
    // add class active==red
    // e.target.classList.add("active");
    if (e.target.nodeName == "A") {
      let id = parseInt(e.target.parentElement.dataset.id);
      if (e.target.classList.contains("active")) {
        // remove aricle
        e.target.classList.remove("active");
        let saveItem = document.getElementById(`save-${id}`);
        saveItem.querySelector("A").click();
      } else {
        e.target.classList.add("active");
        //add article
        this.mySavedArray.push(id);
        // new SavedListItem
        new SaveListItem(
          id,
          document.getElementById("ulHolder"),
          this.mySavedArray,
          this.firebaseRef
        );
        this.firebaseRef.set(this.mySavedArray);
      }
    }
    // push to array
    // firebase set(array)
  }
  inArray(needle, heystack) {
    let length = heystack.length;
    for (let i = 0; i < length; i++) {
      if (heystack[i] === needle) {
        return true;
      }
    }
    return false;
  }
}
