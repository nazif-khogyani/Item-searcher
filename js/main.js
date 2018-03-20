// import axios from "axios";
import SavedArticle from "./components/SavedArticle";

//const url = "https://nieuws.vtm.be/feed/articles/solr?format=json&query=";
const mySavedArray = [];
//const searchArticle = document.getElementById("searchArticle");
const savedArticle = document.getElementById("savedArticle");

const savedArticle1 = new SavedArticle(mySavedArray, savedArticle);
