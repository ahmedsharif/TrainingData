import { domain } from '../config';
import { addNews } from './storeAction';

function getRequestHeader() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
  };
}

const updateStoreState = (store, newsJson) => {
  if (Array.isArray(newsJson)) {
    newsJson.forEach(news => {
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
    .catch(error => {
      console.error(error);
    });
};

const addNewsInAPI = (news, redirect) => {
  const link = domain + '/news/';
  let data = new FormData();
  data.append('title', news.title);
  data.append('content', news.content);
  data.append('image', news.image);
  fetch(link, {
    method: 'POST',
    headers: {
      Authorization: 'Token' + localStorage.authToken,
    },
    body: data,
  }).then(response => {
    if (response.ok) redirect('/');
    else alert(response.statusText + '\nTry again');
  });
};

export { getRequestHeader, loadNewsFromAPI, addNewsInAPI };
