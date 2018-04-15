import axios from "axios";
import * as firebase from "firebase";
import SaveListItem from "./SaveListItem";
const popupS = require("popups");
export default class SavedArticle {
  constructor(mySavedArray, articleHolder, firebaseRef) {
    this.mySavedArray = mySavedArray;
    this.firebaseRef = firebaseRef;
    this.articleHolder = articleHolder;
    this.ulHolder = "";
    this.liId = "";
    this.articl = "";
    //maak h1 en ul en ul opslaan in listHolder
    this.generateHtml();
    this.getDB();
    this.setUpEvents();
  }

  generateHtml() {
    let html = `<h1> Saved Article </h1>`;
    html += `<ul id="ulHolder"></ul>`;
    this.articleHolder.insertAdjacentHTML("afterbegin", html);
    this.ulHolder = document.getElementById("ulHolder");
  }

  setUpEvents() {
    this.ulHolder.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    e.preventDefault();
    if (e.target.nodeName == "A") {
      let id = e.target.parentElement.dataset.id;
      let position = this.mySavedArray.indexOf(id);
      this.mySavedArray.splice(position, 1);
      e.target.parentElement.remove();
      this.firebaseRef.set(this.mySavedArray);
    }
    if (e.target.nodeName == "H3" || e.target.nodeName == "IMG") {
      this.liId = e.target.parentElement.dataset.id;
      axios
        .get("https://nieuws.vtm.be/feed/articles?format=json&ids=" + this.liId)
        .then(response => {
          this.articl = response.data.response.items[0];
        })
        .catch(function(error) {
          // console.log(error);
        });
      popupS.modal({
        content: `<h3>${this.articl.title}</h3>
      <img src="${this.articl.image.thumb}"></img>`
      });
    }
  }
  getDB() {
    this.firebaseRef.once("value", snapshot => {
      const snapShotValue = snapshot.val();
      for (var property in snapShotValue) {
        this.mySavedArray.push(snapShotValue[property]);
        // console.log(snapShotValue[property]);
        new SaveListItem(
          snapShotValue[property],
          this.ulHolder,
          this.mySavedArray,
          this.firebaseRef
        );
      }
    });
  }
}
