import axios from "axios";
import PerfectScrollbar from "perfect-scrollbar";
export default class SaveListItem {
  constructor(id, liHolder, mySavedArray, firebaseRef) {
    this.id = id;
    this.liHolder = liHolder;
    this.mySavedArray = mySavedArray;
    this.firebaseRef = firebaseRef;
    this.article = "";
    this.parent = "";
    this.getDataFromId();
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
      <img src="${this.article.image.thumb}"></img>
      <h3>${this.article.title}</h3>
      
    <a href="" id="remove"></a></li>`;
    this.liHolder.insertAdjacentHTML("beforeend", liHtml);
  }
}
