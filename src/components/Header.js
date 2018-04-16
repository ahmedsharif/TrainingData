import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import SearchInput from 'react-search-input';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setSearchText,
  setUser,
  setVisibilityFilter,
} from '../actions/storeAction';
import { events, filters } from '../config';

let Header = props => {
  const searchBar = props.displaySearchBar ? (
    <NavItem>
      <SearchInput
        className="search-input"
        placeholder="Search News"
        onChange={props.handleSearchBar}
      />
    </NavItem>
  ) : null;

  const authOrNonAuthNav = localStorage.authToken ? (
    <Nav pullRight onSelect={props.handleNavBarSelect}>
      {searchBar}
      <NavItem>{localStorage.username}</NavItem>
      <NavItem eventKey={events.ADD_NEWS}> Add news </NavItem>
      <NavItem eventKey={events.LOGOUT}> Logout </NavItem>
    </Nav>
  ) : (
    <Nav pullRight onSelect={props.handleNavBarSelect}>
      {searchBar}
      <NavItem eventKey={events.LOGIN}>Login </NavItem>
    </Nav>
  );

  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.header>
        <Navbar.Brand>
          <Link to="/">News</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.header>
      <Navbar.Collapse>{authOrNonAuthNav}</Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    displaySearchBar: ownProps.history.location.pathname === '/',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleNavBarSelect: eventKey => {
      switch (eventKey) {
        case events.LOGOUT:
          localStorage.clear();
          dispatch(setUser(null));
          ownProps.history.push('/');
          return;
        case events.LOGIN:
          ownProps.history.push('/login');
          return;
        case events.ADD_NEWS:
          ownProps.history.push('/addNews');
      }
    },
    handleSearchBar: searchText => {
      dispatch(setSearchText(searchText));
      console.log(searchText);
      const visibilityFilter = searchText
        ? filters.SHOW_BY_SEARCH
        : filters.SHOW_ALL;
      console.log(visibilityFilter);
      dispatch(setVisibilityFilter(visibilityFilter));
    },
  };
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(Header);
