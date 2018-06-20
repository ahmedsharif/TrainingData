import React, { Component } from "react";
// import "react-stripe-elements";
import { byPropKey } from "./Base.js";
import Header from "./Header.js";
import SideBar from "./Sidebar.js";
import { Elements, CardElement } from "react-stripe-elements";

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

let loadedStripe = false;

class MainCentent extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      currency: "",
      routing_number: "",
      account_number: ""
    };
  }

  onSubmit = evt => {
    evt.preventDefault();
    const { routing_number, account_number } = this.state;
    window.Stripe.createToken(
      {
        country: "US",
        currency: "USD",
        routing_number: routing_number,
        account_number: account_number
      },
      (status, response) => {
        if (response.error) {
          alert(
            "Adding bank account failed with error: " + response.error.message
          );
        } else {
          const bankAccountToken = response.id;
          console.log(bankAccountToken);
          // send bankAccountToken to server to be saved under the current user
          // show success message and navigate away from form
        }
      }
    );
  };

  render() {
    return (
      <section className="main-content">
        <div className="header-fixed title-header">
          <h2>Payment Settings</h2>
        </div>
        {/* <BankForm
              onSubmit={this.onSubmit}
            /> */}
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
