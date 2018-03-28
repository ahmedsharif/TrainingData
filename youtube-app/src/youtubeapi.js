import Url from "domurl";

var searchurl = new Url(
    
    "https://www.googleapis.com/youtube/v3/search?key=AIzaSyA0enOPFfAC-7T0Gct_aCrrzVc5YrDbVWo"
);

function search(callback, query, results) {
  searchurl.query.q = query;
  searchurl.query.part = "snippet";
  searchurl.query.maxResults = results ? results : 10;

  let request = new Request(searchurl.toString());
  fetch(request)
    .then(response => response.json())
    .then(callback);
}

export { search };
