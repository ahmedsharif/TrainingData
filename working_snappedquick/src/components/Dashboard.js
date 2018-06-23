import React from "react";

import SideBar from "./Sidebar";
import Header from "./Header";
import DashboardStates from "./DashboardStates";
import TodayBooking from "./TodayBooking";
import UpComingBooking from "./UpcomingBooking";
import BookingDetailModel from "./BookingDetailModel";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div className="test">
          <Header />
          <section className="layout">
            <SideBar />
            <section className="main-content">
              <div className="content-wrap">
                <DashboardStates />
                <div className="two-cols">
                  <div className="row">
                    <TodayBooking />
                    <UpComingBooking />
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
        <BookingDetailModel />
      </div>
    );
  }
}

export default Dashboard;
