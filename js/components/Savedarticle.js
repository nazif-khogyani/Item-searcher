import * as firebase from "firebase";

export default class SavedArticle {
  constructor(mySavedArray, savedArticle) {
    this.mySavedArray = mySavedArray;
    this.savedArticle = savedArticle;
    this.getDB();
  }
  getDB() {
    var config = {
      apiKey: "AIzaSyAy4irOtokEoWrvVUu-0iA1rRmZWtbo62A",
      authDomain: "search-article.firebaseapp.com",
      databaseURL: "https://search-article.firebaseio.com",
      projectId: "search-article",
      storageBucket: "search-article.appspot.com",
      messagingSenderId: "664952422865"
    };
    firebase.initializeApp(config);
    var data = firebase.database().ref("articles");
    data.once("value", function(snapshot) {
      console.log(snapshot.val());
      const snapshotValue = snapshot.val();
    });
  }
}
