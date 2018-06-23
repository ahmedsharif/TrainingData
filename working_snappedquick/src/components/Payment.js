import React, { Component } from "react";
import { byPropKey } from "./Base.js";
import Header from "./Header.js";
import SideBar from "./Sidebar.js";
import { Redirect } from "react-router-dom";

const url =
  "http://54.213.158.63/snapped_quick_api_and_admin/public/api/pgs/saveba";

var flag = false;

const getPaymentData = (token_data, account_number) => {
  var data = JSON.parse(localStorage.getItem("data"));

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      mode: "no-cors"
    },
    body: JSON.stringify({
      user_id: data["response"]["id"],
      api_token: data["response"]["api_token"],
      bank_account_number: account_number,
      routing_number: token_data["token"]["bank_account"]["routing_number"],
      country: token_data["token"]["bank_account"]["country"],
      dba_name: localStorage.getItem("company_name"),
      stripe_token: token_data["token"]["bank_account"]["id"]
    })
  })
    // .then(response => response.json())
    // .then(responseData => {
    //   console.log(responseData);
    //   flag = true;
    // })
    // .catch(error => console.log(error));

    .then(function(result) {
      console.log(result);
      <Redirect to="/dashboard" />;
    });
};

class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      currency: "",
      routing_number: "",
      account_number: "",
      redirect: false
    };
  }

  onSubmit = evt => {
    evt.preventDefault();
    const { routing_number, account_number, country, currency } = this.state;
    var stripe = new window.Stripe("pk_test_g6do5S237ekq10r65BnxO6S0");
    stripe
      .createToken("bank_account", {
        country: country,
        currency: currency,
        routing_number: routing_number,
        account_number: account_number
      })
      .then(function(result) {
        // token_data = JSON.stringify(result);
        // token_data = JSON.parse(token_data);
        // console.log(token_data['token']['bank_account']['id']);
        flag = true;
        console.log("bank_token", result);

        getPaymentData(result, account_number);
      });
    this.state.redirect = true;
    // var bank_token = JSON.parse(token_data);
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/dashboard" />
    ) : (
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
                <form onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className="input-container">
                        <input
                          type="text"
                          id="account_number"
                          required="required"
                          onChange={event =>
                            this.setState(
                              byPropKey("account_number", event.target.value)
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

                    <div className="col-md-6 col-sm-12">
                      <div className="input-container">
                        <input
                          type="text"
                          id="currency"
                          required="required"
                          onChange={event =>
                            this.setState(
                              byPropKey("currency", event.target.value)
                            )
                          }
                        />
                        <label>Currency </label>
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
          <MainContent />
        </section>
      </div>
    );
  }
}

export default Payment;
