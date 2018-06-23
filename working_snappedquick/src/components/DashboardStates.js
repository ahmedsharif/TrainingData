import React from "react";

class DashboardStates extends React.Component {
  render() {
    return (
      <div className="states">
        <div className="row">
          <div className="col-md-4">
            <div className="state-col">
              <div className="small-box red-bg">
                <div className="inner">
                  <h3>$5000</h3>
                  <p>In Esscrow Payment</p>
                </div>
                <div className="icon">
                  <i className="fa fa-usd" aria-hidden="true" />
                </div>
                <a href={null} className="small-box-footer">
                  Results
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="state-col">
              <div className="small-box green-bg">
                <div className="inner">
                  <h3>$10,5200</h3>
                  <p>Total Earned</p>
                </div>
                <div className="icon">
                  <i className="fa fa-usd" aria-hidden="true" />
                </div>
                <a href={null} className="small-box-footer">
                  Results
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="state-col">
              <div className="small-box yellow-bg">
                <div className="inner">
                  <h3>15</h3>
                  <p>Total Booking Counts</p>
                </div>
                <div className="icon">
                  <i className="fa fa-flask" aria-hidden="true" />
                </div>
                <a href={null} className="small-box-footer">
                  Results
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardStates;
