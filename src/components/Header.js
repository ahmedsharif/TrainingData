import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import SearchInput from 'react-search-input';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchText, setUser } from '../actions/storeAction';
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
    <Navbar.header>
      <Navbar.Brand>
        <Link to="/">News</Link>
      </Navbar.Brand>
    </Navbar.header>
  );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        displaySearchBar:
        (ownProps.history.location.pathname === "/"),
    }
};



Header = connect(
    mapStateToProps,
)(Header);

export default withRouter(Header);
