import Url from "domurl";

var searchurl = new Url(
    
    "http://192.168.100.13:8080/snapped_quick_api_and_admin/public/api/users"
);

function search(callback, state) {
  searchurl.state.q = state;
  

  let request = new Request(searchurl.toString());
  fetch(request)
    .then(response => response.json())
    .then(callback);
}

export { search };
