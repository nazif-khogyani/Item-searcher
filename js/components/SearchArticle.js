import axios from "axios";
import SearchListItems from "./SearchListItems";
import PerfectScrollbar from "perfect-scrollbar";
const popupS = require("popups");
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
    let ulHtml = `<h1>Search below</h1>
    <form action="" id="form">
      <input type="text"  id="input" placeholder=" Search">
      <button id="button">search</button>
    </form>
    <ul id="ulSearchHolder">

    </ul>`;
    searchArticle.insertAdjacentHTML("afterbegin", ulHtml);
    this.holder = document.getElementById("ulSearchHolder");
    const ps = new PerfectScrollbar("#ulSearchHolder");
    ps.update();
  }
  setEvent() {
    document
      .getElementById("form")
      .addEventListener("submit", this.getUrl.bind(this));
    this.holder.addEventListener("click", this.handlePopups.bind(this));
  }

  handlePopups(e) {
    e.preventDefault();
    if (e.target.nodeName == "H2" || e.target.nodeName == "IMG") {
      this.liId = e.target.parentElement.dataset.id;
      axios
        .get(
          "https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=" +
            this.liId
        )
        .then(response => {
          this.items = response.data.response.items[0];
        })
        .catch(function(error) {
          // console.log(error);
        });
      popupS.modal({
        content: `<h2>${this.items.title}</h2>
      <img src="${this.items.image.large}"></img>
      <p>${this.items.text_html}</p>`
      });
      console.log(this.items.fields);
    }

    // )
    // .then(response => {
    // this.article = response.data.response.items[0];
    // //console.log(this.article);
    // popupS.modal({
    // content: `<h2>${this.article.title}</h2>
    // <img src="${this.article.image.large}"></img>
    // <p>${this.article.text_html}</p>`
    // });
    // })

    // .catch(function(error) {
    // console.log(error);
    // });
    // }
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
