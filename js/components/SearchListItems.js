import SaveListItem from "./SaveListItem";
export default class SearchListItems {
  constructor(item, holder, mySavedArray, firebaseRef) {
    this.item = item;
    this.holder = holder;
    this.mySavedArray = mySavedArray;
    this.firebaseRef = firebaseRef;
    this.liId = "";
    this.addHtml();
    this.events();
  }
  addHtml() {
    let searchLiHtml = `<li id="searchItem-${
      this.item.fields.entity_id
    }" data-id="${this.item.fields.entity_id}">
    <h2>${this.item.title}</h2>
    <p>${this.item.fields.entity_id}</p>
    <a href="#" id="heart"></a>
    </li>`;
    this.holder.insertAdjacentHTML("beforeend", searchLiHtml);
    this.liId = document.getElementById(
      `searchItem-${this.item.fields.entity_id}`
    );
    let checkId = this.inArray(this.item.fields.entity_id, this.mySavedArray);
  }
  events() {
    this.liId.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    console.log(e.target.parentElement);
    // add class active==red
    e.target.classList.add("active");
    // push to array
    let id = e.target.parentElement.dataset.id;
    this.mySavedArray.push(id);
    // new SavedListItem
    new SaveListItem(
      id,
      document.getElementById("ulHolder"),
      this.mySavedArray,
      this.firebaseRef
    );
    // firebase set(array)
    this.firebaseRef.set(this.mySavedArray);
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
