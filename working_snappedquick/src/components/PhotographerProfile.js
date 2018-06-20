import React, { Component } from "react";
import { byPropKey, images } from "./Base.js";
import { Redirect } from "react-router-dom";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import SideBar from "./Sidebar.js";
import "./Login.js";
import Header from "./Header.js";

const url = "http://54.213.158.63/snapped_quick_api_and_admin/public/api/pgs";

const companyRequest = state => {
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
      company_name: state.company_name,
      primary_contact: state.primary_contact,
      secondary_contact: state.secondary_contact,
      logo_image: state.logo_image,
      api_token: data["response"]["user"]["api_token"],
      company_st_address: state.company_st_address,
      company_city: state.company_city,
      company_state: "Pakistan",
      company_zip: state.company_zip,
      company_country: "Pakistan",
      company_location: state.company_st_address,
      time_zone: state.company_zip,
      redirect: false,

      is_mon_on: state.is_mon_on,
      mon_work_start_time: state.mon_work_start_time.format("HH:mm:ss"),
      mon_work_end_time: state.mon_work_end_time.format("HH:mm:ss"),
      is_mon_break_on: state.is_mon_break_on,
      mon_break_start_time: state.mon_break_start_time.format("H:mm:ss"),
      mon_break_end_time: state.mon_break_end_time.format("H:mm:ss"),

      is_tue_on: state.is_tue_on,
      tue_work_start_time: state.tue_work_start_time.format("H:mm:ss"),
      tue_work_end_time: state.tue_work_end_time.format("H:mm:ss"),
      is_tue_break_on: state.is_tue_break_on,
      tue_break_start_time: state.tue_break_start_time.format("H:mm:ss"),
      tue_break_end_time: state.tue_break_end_time.format("H:mm:ss"),

      is_wed_on: state.is_wed_on,
      wed_work_start_time: state.wed_work_start_time.format("H:mm:ss"),
      wed_work_end_time: state.wed_work_end_time.format("H:mm:ss"),
      is_wed_break_on: state.is_wed_break_on,
      wed_break_start_time: state.wed_break_start_time.format("H:mm:ss"),
      wed_break_end_time: state.wed_break_end_time.format("H:mm:ss"),

      is_thu_on: state.is_thu_on,
      thu_work_start_time: state.thu_work_start_time.format("H:mm:ss"),
      thu_work_end_time: state.thu_work_end_time.format("H:mm:ss"),
      is_thu_break_on: state.is_thu_break_on,
      thu_break_start_time: state.thu_break_start_time.format("H:mm:ss"),
      thu_break_end_time: state.thu_break_end_time.format("H:mm:ss"),

      is_fri_on: state.is_fri_on,
      fri_work_start_time: state.fri_work_start_time.format("H:mm:ss"),
      fri_work_end_time: state.fri_work_end_time.format("H:mm:ss"),
      is_fri_break_on: state.is_fri_break_on,
      fri_break_start_time: state.fri_break_start_time.format("H:mm:ss"),
      fri_break_end_time: state.fri_break_end_time.format("H:mm:ss"),

      is_sat_on: state.is_sat_on,
      sat_work_start_time: state.sat_work_start_time.format("H:mm:ss"),
      sat_work_end_time: state.sat_work_end_time.format("H:mm:ss"),
      is_sat_break_on: state.is_sat_break_on,
      sat_break_start_time: state.sat_break_start_time.format("H:mm:ss"),
      sat_break_end_time: state.sat_break_end_time.format("H:mm:ss"),

      is_sun_on: state.is_sun_on,
      sun_work_start_time: state.sun_work_start_time.format("H:mm:ss"),
      sun_work_end_time: state.sun_work_end_time.format("H:mm:ss"),
      is_sun_break_on: state.is_sun_break_on,
      sun_break_start_time: state.sun_break_start_time.format("H:mm:ss"),
      sun_break_end_time: state.sun_break_end_time.format("H:mm:ss")
    })
  })
    .then(response => response.json())
    .catch(error => console.error("Error:", error))
    .then(json => {
      console.log(json);
    });
};

class MainCentent extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      startDate: moment(),
      company_name: "",
      primary_contact: "",
      secondary_contact: "",
      logo_image: "",
      api_token: "",
      company_st_address: "",
      company_city: "",
      company_state: "",
      company_zip: "",
      company_country: "",
      company_location: "",
      time_zone: "",

      is_mon_on: false,
      mon_work_start_time: moment(),
      mon_work_end_time: moment(),
      is_mon_break_on: false,
      mon_break_start_time: moment(),
      mon_break_end_time: moment(),

      is_tue_on: false,
      tue_work_start_time: moment(),
      tue_work_end_time: moment(),
      is_tue_break_on: false,
      tue_break_start_time: moment(),
      tue_break_end_time: moment(),

      is_wed_on: false,
      wed_work_start_time: moment(),
      wed_work_end_time: moment(),
      is_wed_break_on: false,
      wed_break_start_time: moment(),
      wed_break_end_time: moment(),

      is_thu_on: false,
      thu_work_start_time: moment(),
      thu_work_end_time: moment(),
      is_thu_break_on: false,
      thu_break_start_time: moment(),
      thu_break_end_time: moment(),

      is_fri_on: false,
      fri_work_start_time: moment(),
      fri_work_end_time: moment(),
      is_fri_break_on: false,
      fri_break_start_time: moment(),
      fri_break_end_time: moment(),

      is_sat_on: false,
      sat_work_start_time: moment(),
      sat_work_end_time: moment(),
      is_sat_break_on: false,
      sat_break_start_time: moment(),
      sat_break_end_time: moment(),

      is_sun_on: false,
      sun_work_start_time: moment(),
      sun_work_end_time: moment(),
      is_sun_break_on: false,
      sun_break_start_time: moment(),
      sun_break_end_time: moment(),

      redirect: false
    };
  }

  onSubmit = event => {
    event.preventDefault();
    companyRequest(this.state);
    this.setState({
      redirect: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    setTimeout(() => {
      this.form.showErr(this.userInput, <span>API error</span>);
    }, 1000);
  };

  removeApiError = () => {
    this.form.hideError(this.userInput);
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/payment" />
    ) : (
      <section className="main-content">
        <div className="header-fixed title-header">
          <h2>Profile Settings</h2>
        </div>
        <div className="content-wrap spacer">
          <div className="form-content">
            <form>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="box">
                    <input
                      type="file"
                      id="logo_image"
                      className="inputfile inputfile-4"
                    />
                    <label htmlFor="file-1">
                      <figure className="main-image">
                        <img
                          src={images["upload-to-cloud-large.png"]}
                          className="img-responsive"
                          onChange={event =>
                            this.setState(
                              byPropKey("logo_image", event.target.value)
                            )
                          }
                          alt=""
                        />
                      </figure>
                      <span>Upload Profile Photo…</span>
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="box">
                        <input
                          type="file"
                          id="logo_image"
                          className="inputfile inputfile-4"
                          onChange={event =>
                            this.setState(
                              byPropKey("logo_image", event.target.value)
                            )
                          }
                        />
                        <label htmlFor="file-2">
                          <figure>
                            <img
                              src={images["upload-to-cloud.png"]}
                              className="img-responsive"
                              alt=""
                            />
                          </figure>{" "}
                          <span>Upload Profile Photo</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="box">
                        <input
                          type="file"
                          id="file-3"
                          className="inputfile inputfile-4"
                        />
                        <label htmlFor="file-3">
                          <figure>
                            <img
                              src={images["upload-to-cloud.png"]}
                              className="img-responsive"
                              alt=""
                            />
                          </figure>{" "}
                          <span>Upload Profile Photo</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="box">
                        <input
                          type="file"
                          id="file-4"
                          className="inputfile inputfile-4"
                        />
                        <label htmlFor="file-4">
                          <figure>
                            <img
                              src={images["upload-to-cloud.png"]}
                              className="img-responsive"
                              alt=""
                            />
                          </figure>{" "}
                          <span>Upload Profile Photo</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="box">
                        <input
                          type="file"
                          id="file-5"
                          className="inputfile inputfile-4"
                        />
                        <label htmlFor="file-5">
                          <figure>
                            <img
                              src={images["upload-to-cloud.png"]}
                              className="img-responsive"
                              alt=""
                            />
                          </figure>{" "}
                          <span>Upload Profile Photo</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row spacer">
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input
                      type="text"
                      id="company_name"
                      required="required"
                      onChange={event =>
                        this.setState(
                          byPropKey("company_name", event.target.value)
                        )
                      }
                    />
                    <label>Company Name</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input
                      type="text"
                      id="primary_contact"
                      onChange={event =>
                        this.setState(
                          byPropKey("primary_contact", event.target.value)
                        )
                      }
                      required="required"
                    />
                    <label>Primary Contact</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input
                      type="text"
                      id="secondary_contact"
                      required="required"
                      onChange={event =>
                        this.setState(
                          byPropKey("secondary_contact", event.target.value)
                        )
                      }
                    />
                    <label>Secondary Contact</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input
                      type="text"
                      id="company_st_address"
                      onChange={event =>
                        this.setState(
                          byPropKey("company_st_address", event.target.value)
                        )
                      }
                      required="required"
                    />
                    <label>Address</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input
                      type="text"
                      id="company_zip"
                      onChange={event =>
                        this.setState(
                          byPropKey("company_zip", event.target.value)
                        )
                      }
                      required="required"
                    />
                    <label>Zip</label>
                    <div className="bar" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="input-container">
                  <input
                    type="text"
                    id="company_city"
                    onChange={event =>
                      this.setState(
                        byPropKey("company_city", event.target.value)
                      )
                    }
                    required="required"
                  />
                  <label>City</label>
                  <div className="bar" />
                </div>
              </div>

              {/* new section for dates */}
              <section className="mondaydata">
                <label> Monday </label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.is_mon_on}
                  onChange={event =>
                    this.setState(byPropKey("is_mon_on", !this.state.is_mon_on))
                  }
                />
                <br />
                <label> Mon start work time </label>
                <DatePicker
                  id="mon_work_start_time"
                  name="mon_work_start_time"
                  selected={this.state.mon_work_start_time}
                  onChange={event =>
                    this.setState(byPropKey("mon_work_start_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="HH:mm:ss"
                  dateFormat="LT"
                  timeCaption="Time"
                />
                <label> Mon end work time </label>
                <DatePicker
                  selected={this.state.mon_work_end_time}
                  onChange={event =>
                    this.setState(byPropKey("mon_work_end_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />

                {/* break time */}
                <label> Break </label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.is_mon_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey(
                        "mon_break_start_time",
                        !this.state.is_mon_break_on
                      )
                    )
                  }
                />
                <br />
                <label> Mon break start time </label>
                <DatePicker
                  id="mon_break_start_time"
                  name="mon_break_start_time"
                  selected={this.state.mon_break_start_time}
                  onChange={event =>
                    this.setState(byPropKey("mon_break_start_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
                <label> Mon break end time </label>
                <DatePicker
                  selected={this.state.mon_break_end_time}
                  onChange={event =>
                    this.setState(byPropKey("mon_break_end_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
              </section>

              {/* For tuesday datepickers */}
              <section className="tuesdaydata">
                <label> Tuesday </label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.is_tue_on}
                  onChange={event =>
                    this.setState(byPropKey("is_tue_on", !this.state.is_tue_on))
                  }
                />
                <br />
                <label> Tue start work time </label>
                <DatePicker
                  id="tue_work_start_time"
                  name="tue_work_start_time"
                  selected={this.state.tue_work_start_time}
                  onChange={event =>
                    this.setState(byPropKey("tue_work_start_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
                <label> Tue end work time </label>
                <DatePicker
                  selected={this.state.tue_work_end_time}
                  onChange={event =>
                    this.setState(byPropKey("tue_work_end_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />

                {/* break time */}
                <label> Break </label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.is_tue_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey(
                        "tue_break_start_time",
                        !this.state.is_tue_break_on
                      )
                    )
                  }
                />
                <br />

                <label> Tue break start time </label>
                <DatePicker
                  id="tue_break_start_time"
                  name="tue_break_start_time"
                  selected={this.state.tue_break_start_time}
                  onChange={event =>
                    this.setState(byPropKey("tue_break_start_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
                <label> Tue break end time </label>
                <DatePicker
                  selected={this.state.tue_break_end_time}
                  onChange={event =>
                    this.setState(byPropKey("tue_break_end_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
              </section>

              {/* For Wednesday datepickers */}
              <section className="wednesdaydata">
                <label> Wednesday </label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.is_wed_on}
                  onChange={event =>
                    this.setState(byPropKey("is_wed_on", !this.state.is_wed_on))
                  }
                />
                <br />
                <label> Wed start work time </label>
                <DatePicker
                  id="wed_work_start_time"
                  name="wed_work_start_time"
                  selected={this.state.wed_work_start_time}
                  onChange={event =>
                    this.setState(byPropKey("wed_work_start_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
                <label> Wed end work time </label>
                <DatePicker
                  selected={this.state.wed_work_end_time}
                  onChange={event =>
                    this.setState(byPropKey("wed_work_end_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />

                {/* break time */}
                <label> Break </label>
                <input
                  type="checkbox"
                  defaultChecked={this.state.is_wed_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey(
                        "wed_break_start_time",
                        !this.state.is_wed_break_on
                      )
                    )
                  }
                />
                <br />

                <label> Wed break start time </label>
                <DatePicker
                  id="wed_break_start_time"
                  name="wed_break_start_time"
                  selected={this.state.wed_break_start_time}
                  onChange={event =>
                    this.setState(byPropKey("wed_break_start_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
                <label> Wed break end time </label>
                <DatePicker
                  selected={this.state.wed_break_end_time}
                  onChange={event =>
                    this.setState(byPropKey("wed_break_end_time", event))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="LT"
                  timeCaption="Time"
                />
              </section>

              <div className="custom-btn">
                <button
                  type="submit"
                  className="register"
                  onClick={this.onSubmit}
                >
                  <i className="fa fa-floppy-o" aria-hidden="true" /> Save
                  Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

class CompanyProfile extends Component {
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

export default CompanyProfile;
