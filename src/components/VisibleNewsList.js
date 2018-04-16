import NewsList from './NewsList';
import { connect } from 'react-redux';
import { filters } from '../config';

const getVisibleNews = ({
  news,
  visibilityFilter,
  searchText,
  detailedNewsId,
}) => {
  switch (visibilityFilter) {
    case filters.SHOW_BY_SEARCH:
      searchText = searchText.toLowerCase();
      return news.filter(n => {
        const title = n.title.toLowerCase();
        return title.includes(searchText);
      });
    case filters.SHOW_BY_ID:
      return news.find(n => n.id === detailedNewsId);
    case filters.SHOW_ALL:
      return news;
    default:
      return news;
  }
};

const mapStateToProps = state => {
  return {
    newsList: getVisibleNews(state),
  };
};

const VisibleNewsList = connect(mapStateToProps, null)(NewsList);


export default VisibleNewsList;
export { getVisibleNews };
