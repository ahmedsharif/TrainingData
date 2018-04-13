import { domain } from '../config';
import { addNews } from './storeAction';

function getRequestHeader() {
  return {
    Accept: 'application/json',
    'Content-type': 'application/json',
  };
}

const updateStoreState = (store, newsJson) => {
  if (Array.isArray(newsJson)) {
    newsJson.forEach((news) => {
      store.dispatch(addNews(news));
    });
  } else {
    store.dispatch(addNews(newsJson));
  }
};

const loadNewsFromAPI = (store, id) => {
  let link = domain + '/news/';
  link += id ? id : '';
  fetch(link, {
    method: 'GET',
    headers: getRequestHeader(),
  })
    .then(response => response.json())
    .then(newsJson => {
      updateStoreState(store, newsJson);
    })
    .catch((error) => {
        console.error(error);
    });
};

export {loadNewsFromAPI, updateStoreState}
