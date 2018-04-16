import React from 'react';
import { Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getVisibleNews } from './VisibleNewsList';
import { connect } from 'react-redux';
import { setDetailedNewsId, setVisibilityFilter } from '../actions/storeAction';
import { loadNewsFromAPI } from '../actions/index';
import { filters } from '../config';
import Moment from 'react-moment';

let NewsDetailedCard = ({ news }) => {
  return news ? (
    <div className="news-card" key={news.id}>
      <h1>{news.title}</h1>
      <Media>
        <Media.Left>
          <img src={news.image_url} alt="News" />
        </Media.Left>
        <Media.Body>
          <p dangerouslySetInnerHTML={{ __html: news.content }} />
          <p className="pub_date">
            <Moment fromNow>{news.pub_date}</Moment>
          </p>
        </Media.Body>
      </Media>
    </div>
  ) : null;
};

const mapStateToProps = state => {
  return { news: getVisibleNews(state) };
};

NewsDetailedCard = connect(mapStateToProps)(NewsDetailedCard);

export default class NewsDetailed extends React.Component {
  static isPrivate = false;

  componentWillMount = () => {
    const { store } = this.context;
    const NewsId = parseInt(this.props.match.params.id);
    if (store.getState().news.length === 0) loadNewsFromAPI(store, NewsId);
    store.dispatch(setDetailedNewsId(NewsId));
    store.dispatch(setVisibilityFilter(filters.SHOW_BY_ID));
  };
  render() {
    return <NewsDetailedCard />;
  }
}

NewsDetailed.contextTypes = {
  store: PropTypes.object,
};
