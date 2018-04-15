import axios from "axios";
import SearchListItems from "./SearchListItems";
export default class SearchArticle {
  constructor(mySavedArray, serchHolder, firebaseRef) {
    this.mySavedArray = mySavedArray;
    this.serchHolder = serchHolder;
    this.firebaseRef = firebaseRef;
    this.holder = "";
    this.htmlCreator();
    this.setEvent();
  }
  htmlCreator() {
    const searchArticle = document.getElementById("searchArticle");
    let ulHtml = `<h1>Search below:</h1>
    <form action="" id="form">
      <input type="text"  id="input" placeholder=" Search">
      <button id="button">search</button>
    </form>
    <ul id="ulSearchHolder">

    </ul>`;
    searchArticle.insertAdjacentHTML("afterbegin", ulHtml);
    this.holder = document.getElementById("ulSearchHolder");
  }
  setEvent() {
    document
      .getElementById("form")
      .addEventListener("submit", this.getUrl.bind(this));
  }
  getUrl(e) {
    e.preventDefault();
    this.holder.innerHTML = "";
    const value = document.getElementById("input").value;
    const url = `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${value}`;
    axios
      .get(url)
      .then(response => {
        response.data.response.items.forEach(item => {
          new SearchListItems(
            item,
            this.holder,
            this.mySavedArray,
            this.firebaseRef
          );
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
