import * as firebase from "firebase";
import SaveListItem from "./SaveListItem";
export default class SavedArticle {
  constructor(mySavedArray, articleHolder, firebaseRef) {
    this.mySavedArray = mySavedArray;
    this.firebaseRef = firebaseRef;
    this.articleHolder = articleHolder;
    this.ulHolder = "";
    //maak h1 en ul en ul opslaan in listHolder
    this.generateHtml();
    this.getDB();
  }
  generateHtml() {
    let html = `<h1> Saved Article </h1>`;
    html += `<ul id="ulHolder"></ul>`;
    this.articleHolder.insertAdjacentHTML("afterbegin", html);
    this.ulHolder = document.getElementById("ulHolder");
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
