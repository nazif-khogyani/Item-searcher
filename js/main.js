// import axios from "axios";
import * as firebase from "firebase";
import SavedArticle from "./components/SavedArticle";
import SearchArticle from "./components/SearchArticle";
var config = {
  apiKey: "AIzaSyAy4irOtokEoWrvVUu-0iA1rRmZWtbo62A",
  authDomain: "search-article.firebaseapp.com",
  databaseURL: "https://search-article.firebaseio.com",
  projectId: "search-article",
  storageBucket: "search-article.appspot.com",
  messagingSenderId: "664952422865"
};
firebase.initializeApp(config);
const firebaseRef = firebase.database().ref("articles");
//const url = "https://nieuws.vtm.be/feed/articles/solr?format=json&query=";
const mySavedArray = [];
//const searchArticle = document.getElementById("searchArticle");
const articleHolder = document.getElementById("savedArticle");
const serchHolder = document.getElementById("searchArticle");

const savedArticle = new SavedArticle(mySavedArray, articleHolder, firebaseRef);
const searchArticle = new SearchArticle(mySavedArray, serchHolder, firebaseRef);
