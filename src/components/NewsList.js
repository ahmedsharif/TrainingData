import * as React from 'react';
import NewsCard from './NewsCard';

const NewsList = props => {
  return (
    <div>
      <div>
        {props.newsList.map(news => <NewsCard key={news.id} news={news} />)}
      </div>
    </div>
  );
};

export default NewsList;
