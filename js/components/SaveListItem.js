import axios from "axios";
//const url = "https://nieuws.vtm.be/feed/articles?format=json&ids=";

export default class SaveListItem {
  constructor(id, liHolder, mySavedArray, firebaseRef) {
    this.id = id;
    this.liHolder = liHolder;
    this.mySavedArray = mySavedArray;
    this.firebaseRef = firebaseRef;
    this.article = "";
    this.parent = "";
    this.li = "";
    this.getDataFromId();
    this.events();
  }
  getDataFromId() {
    axios
      .get("https://nieuws.vtm.be/feed/articles?format=json&ids=" + this.id)
      .then(response => {
        this.article = response.data.response.items[0];
        this.init();
      })
      .catch(function(error) {
        // console.log(error);
      });
  }
  init() {
    let liHtml = "";
    liHtml += `<li data-id="${this.article.id}" id="save-${this.article.id}">
      <h3>${this.article.title}</h3>
    <a href="" id="remove"></a></li>`;
    // this.delete = document.querySelector("li");
    // this.parent = this.delete.parentElement;
    this.liHolder.insertAdjacentHTML("beforeend", liHtml);
    this.li = this.liHolder.getElementById(`save-${this.article.id}`);
  }
  events() {
    this.liHolder.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    e.preventDefault();
    if (e.target.nodeName == "A") {
      let id = e.target.parentElement.dataset.id;
      let pos = this.mySavedArray.indexOf(id);
      this.mySavedArray.splice(pos, 1);
      e.target.parentElement.remove();
    }
    this.firebaseRef.set(this.mySavedArray);
  }
}
