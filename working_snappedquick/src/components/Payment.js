import React, { Component } from "react";

import { byPropKey } from "./Base.js";
import { Redirect } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';

import Header from "./Header.js";
import SideBar from "./Sidebar.js";


const url =
  "http://54.213.158.63/snapped_quick_api_and_admin/public/api/pgs/saveba";

const paymentRequest = state => {
  var data = JSON.parse(localStorage.getItem("data"));
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      mode: "no-cors"
    },
    body: JSON.stringify({
      user_id: data["response"]["user"]["id"],
      dob: state.dob,
      ssn: state.ssn,
      dba_name: state.dba_name,
      tax_id: state.tax_id,
      bank_account_number: state.bank_account_number,
      api_token: data["response"]["user"]["api_token"],
      routing_number: state.routing_number,
      tandc: "1",
      redirect: false
    })
  })
    .then(response => response.json())
    .catch(error => console.error("Error:", error))
    .then(json => {
      console.log(json);
    });
};



class MainCentent extends Component {
  render() {
    return (
      <section className="main-content">
        <div className="header-fixed title-header">
          <h2>Payment Settings</h2>
        </div>
        <div className="content-wrap spacer">
          <div className="payment-setting-holder">
            <div className="tabs-links">
              <ul className="tabs">
                <li className="tab-link" data-tab="tab-2">
                  Stripe
                </li>
              </ul>
            </div>
            <div className="tabs-content">
              <div id="tab-1" className="tab-content current">
                <form>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className="input-container">
                        <input
                          type="text"
                          id="bank_account_number"
                          required="required"
                          onChange={event =>
                            this.setState(
                              byPropKey(
                                "bank_account_number",
                                event.target.value
                              )
                            )
                          }
                        />
                        <label>Account Number</label>
                        <div className="bar" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="input-container">
                        <input
                          type="text"
                          id="routing_number"
                          required="required"
                          onChange={event =>
                            this.setState(
                              byPropKey("routing_number", event.target.value)
                            )
                          }
                        />
                        <label>Routing Number</label>
                        <div className="bar" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="input-container">
                        <input
                          type="text"
                          id="country"
                          required="required"
                          onChange={event =>
                            this.setState(
                              byPropKey("country", event.target.value)
                            )
                          }
                        />
                        <label>Country Name e.g(US)</label>
                        <div className="bar" />
                      </div>
                    </div>
                  </div>
                  <div className="custom-btn">
                    <button type="submit">
                      <i className="fa fa-refresh" aria-hidden="true" /> Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

class Payment extends Component {
  render() {
    return (
      <div className="test">
        <Header />
        <section className="layout">
          <SideBar />
          <MainCentent />
        </section>
      </div>
    );
  }
}

export default Payment;
