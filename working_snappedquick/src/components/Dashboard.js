import React, { Component } from "react";

import SideBar from "./Sidebar.js";
import Header from "./Header.js";


class Dashboard extends React.Component {
  render() {
    return (
      <div className="test">
        <Header />
        <section className="layout">
          <SideBar />
        </section>
      </div>
    );
  }
}

export default Dashboard;
