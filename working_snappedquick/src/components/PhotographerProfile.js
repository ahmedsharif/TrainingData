import React, { Component } from "react";
// import { Route, Redirect, Link } from "react-router-dom";

import "./css/bootstrap.min.css";
import "./css/main.min.css";
import "./images/favicon.ico";
import "./images/favicon.ico";
import "./css/font-awesome.min.css";
import "./css/jquery.mCustomScrollbar.css";
import "./css/lightbox.min.css";
import "./css/justified.css";
import "./css/styles.css";
import "./Login.js";
import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

// import "./js/custom.js";
// import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
import validator from "validator";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);
const users = importAll(
  require.context("./images/users", false, /\.(png|jpe?g|svg)$/)
);

function validateEmail() {
  var email = document.getElementById("#email");
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const url = "http://54.213.158.63/snapped_quick_api_and_admin/public/api/pgs";

const companyRequest = state => {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: state.user_id,
      company_name: state.company_name,
      primary_contact: state.primary_contact,
      secondary_contact: state.secondary_contact,
      logo_image: state.logo_image,
      api_token: state.api_token,
      company_st_address: state.company_st_address,
      company_city: state.company_city,
      company_state: "Pakistan",
      company_zip: state.company_zip,
      company_country: "Pakistan",
      company_location: state.company_st_address,
      is_mon_on:state.is_mon_on,
      is_tue_on:state.is_tue_on,
      is_wed_on:state.is_wed_on,
      is_thu_on:state.is_thu_on,
      is_fri_on:state.is_fri_on,
      is_sat_on:state.is_sat_on,
      is_sun_on:state.is_sun_on,
      is_mon_break_on:state.is_mon_break_on,
      is_tue_break_on:state.is_tue_break_on,
      is_wed_break_on:state.is_wed_break_on,
      is_thu_break_on:state.is_thu_break_on,
      is_fri_break_on:state.is_fri_break_on,
      is_sat_break_on:state.is_sat_break_on,
      is_sun_break_on:state.is_sun_break_on,
      time_zone:state.time_zone,
      redirect: false
    })
  })
    .then(response => response.json())
    .catch(error => console.error("Error:", error))
    .then(json => {
      console.log(json);
    });
};

const email = value => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};

var initial_password = "";
const password = value => {
  if (value.toString().trim.length < 6) {
    return "password should be >=  6 digits";
  }
  initial_password = value;
};

const confirmPassword = value => {
  if (initial_password !== value) {
    return "password does not match";
  }
};

class Header extends Component {
  constructor() {
    super();
    this.state = { section: "header" };
  }
  render() {
    return (
      <header className="header header-fixed navbar top-header">
        <div className="brand">
          <a
            href="#"
            className="fa fa-bars off-left visible-xs"
            data-toggle="off-canvas"
            data-move="ltr"
          />
        </div>
        <ul className="nav navbar-nav navbar-right off-right">
          <li className="hidden-xs">
            <a href="javascript:void(0);">John Deo</a>
          </li>
          <li className="notifications dropdown hidden-xs">
            <a href="#" data-toggle="dropdown">
              <i className="fa fa-envelope-o" />
              <div className="badge">4</div>
            </a>
            <div className="dropdown-menu dropdown-menu-right animated slideInRight">
              <div className="panel bg-white no-border no-margin">
                <div className="panel-heading no-radius">
                  <small>
                    <b>Messages</b>
                  </small>
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-1.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>just now</small>
                    </div>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-2.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>2 mins ago</small>
                    </div>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-3.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>20 mins ago</small>
                    </div>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-4.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>1 day ago</small>
                    </div>
                  </a>
                </li>
              </ul>
              <div className="panel-footer no-border">
                <a href="messages.html">See all Messages</a>
              </div>
            </div>
          </li>
          <li className="notifications dropdown hidden-xs">
            <a href="#" data-toggle="dropdown">
              <i className="fa fa-bell" />
              <div className="badge">2</div>
            </a>
            <div className="dropdown-menu dropdown-menu-right animated slideInRight">
              <div className="panel bg-white no-border no-margin">
                <div className="panel-heading no-radius">
                  <small>
                    <b>Notifications</b>
                  </small>
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-5.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>just now</small>
                    </div>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-6.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>2 mins ago</small>
                    </div>
                  </a>
                </li>
                <li className="list-group-item">
                  <a href="#">
                    <span className="pull-left mg-t-xs mg-r-md">
                      <img
                        src={users["img-7.png"]}
                        className="avatar avatar-sm img-circle"
                        alt
                      />
                    </span>
                    <div className="m-body show pd-t-xs">
                      <span>Message text goes here</span>
                      <small>20 mins ago</small>
                    </div>
                  </a>
                </li>
              </ul>
              <div className="panel-footer no-border">
                <a href="notifications.html">See all notifications</a>
              </div>
            </div>
          </li>
          <li className="quickmenu mg-r-md dropdown">
            <a href="#" data-toggle="dropdown">
              <img
                src={users["img-5.png"]}
                className="avatar pull-left img-circle"
                alt="user"
                title="user"
              />
              <i className="caret mg-l-xs hidden-xs no-margin" />
            </a>
            <ul className="dropdown-menu mg-r-xs">
              <li>
                <a href="login.html">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    );
  }
}

function SideBar() {
  return (
    <aside className="sidebar collapsible canvas-left bg-dark">
      <div className="small-logo">
        <a href="dashboard.html">
          <img src={images["logo@2x.png"]} alt="logo" />
        </a>
      </div>
      <nav className="main-navigation">
        <ul>
          <li className="active">
            <a href="dashboard.html">
              <img src={images["home-icon.png"]} alt="" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="dropdown show-on-hover">
            <a href="#" data-toggle="dropdown">
              <img src={images["package-icon.png"]} alt="" />
              <span>Packages</span>
              <i className="toggle-accordion" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="manage-package.html">
                  <span>Manage</span>
                </a>
              </li>
              <li>
                <a href="create-new-package.html">
                  <span>Create New</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="booking-hisory.html">
              <img src={images["booking-history-icon.png"]} alt="" />
              <span>My Booking History</span>
            </a>
          </li>
          <li>
            <a href="profile-settings.html">
              <img src={images["profile-setting-icon.png"]} alt="" />
              <span>Profile Settings</span>
            </a>
          </li>
          <li>
            <a href="payment-settings.html">
              <img src={images["payment-settings-icon.png"]} alt="" />
              <span>Payment Settings</span>
            </a>
          </li>
          <li>
            <a href="gallery.html">
              <img src={images["gallery-icon.png"]} alt="" />
              <span>Gallery</span>
            </a>
          </li>
          <li>
            <a href="login.html">
              <img src={images["logout-icon.png"]} alt="" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

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
      time_zone:"",

      is_mon_on:false,
      mon_work_start_time: moment(),
      mon_work_end_time: moment(),
      is_mon_break_on:false,
      mon_break_start_time:"",
      mon_break_end_time:"",
     
      is_tue_on:false,
      tue_work_start_time:"",
      tue_work_end_time:"",
      is_tue_break_on:false,
      tue_break_start_time:"",
      tue_break_end_time:"",
  
      is_wed_on:false,
      wed_work_start_time:"",
      wed_work_end_time:"",
      is_wed_break_on:false,
      wed_break_start_time:"",
      wed_break_end_time:"",
  
      is_thu_on:false,
      thu_work_start_time:"",
      thu_work_end_time:"",
      is_thu_break_on:false,
      thu_break_start_time:"",
      thu_break_end_time:"",
  
      is_fri_on:false,
      fri_work_start_time:"",
      fri_work_end_time:"",
      is_fri_break_on:false,
      fri_break_start_time:"",
      fri_break_end_time:"",
  
      is_sat_on:false,
      sat_work_start_time:"",
      sat_work_end_time:"",
      is_sat_break_on:false,
      sat_break_start_time:"",
      sat_break_end_time:"",
  
      is_sun_on:false,
      sun_work_start_time:"",
      sun_work_end_time:"",
      is_sun_break_on:false,
      sun_break_start_time:"",
      sun_break_end_time:"",

      redirect: false
    };
    //this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    companyRequest(this.state);
    this.setState({
      redirect: true
    });
  };

  // handleChange() {
  //   this.setState({
  //     mon_work_start_time: date
  //   });
  // }
  
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
    return (
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
                      name
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
                            )}
                          alt=""
                        />
                      </figure>{" "}
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
                          name
                          id="logo_image"
                          className="inputfile inputfile-4"
                          onChange={event =>
                            this.setState(
                              byPropKey("logo_image", event.target.value)
                            )}
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
                          name
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
                          name
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
                          name
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
                    <input type="text" name id="company_name" required="required" onChange={event =>
                          this.setState(
                            byPropKey("company_name", event.target.value)
                          )} />
                    <label>Company Name</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input type="text" name id="primary_contact" onChange={event =>
                          this.setState(
                            byPropKey("primary_contact", event.target.value)
                          )} required="required" />
                    <label>Primary Contact</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input type="text" name id="secondary_contact" required="required" onChange={event =>
                          this.setState(
                            byPropKey("secondary_contact", event.target.value)
                          )} />
                    <label>Secondary Contact</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input type="text" name id="company_st_address"  onChange={event =>
                          this.setState(
                            byPropKey("company_st_address", event.target.value)
                          )}  required="required" />
                    <label>Address</label>
                    <div className="bar" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input type="text" name id="company_zip" onChange={event =>
                          this.setState(
                            byPropKey("company_zip", event.target.value)
                          )}  required="required" />
                    <label>Zip</label>
                    <div className="bar" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                  <div className="input-container">
                    <input type="text" name id="company_city" onChange={event =>
                          this.setState(
                            byPropKey("company_city", event.target.value)
                          )}  required="required" />
                    <label>City</label>
                    <div className="bar" />
                  </div>
                </div>
            
            {/* new section for dates */}
            <section className="weeklydata">
              <label> Monday </label>
            <input type="checkbox" defaultChecked={this.state.is_mon_on} onChange={event =>
                  this.setState(
                    byPropKey("is_mon_on", !this.state.is_mon_on)
                  )} />
            <br />
              <label> Mon start work time </label>
              <DatePicker
                id="mon_work_start_time"
                name="mon_work_start_time"
                selected={this.state.mon_work_start_time}
                // onChange={(e) => this.handleChange("mon_work_start_time", e)}
                onChange={event =>
                  this.setState(
                    byPropKey("mon_work_start_time", event)
                  )}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="LT"
                timeCaption="Time"
            />
            <label> Mon end work time </label>
              <DatePicker
                selected={this.state.mon_work_end_time}
                onChange={event =>
                  this.setState(
                    byPropKey("mon_work_end_time", event)
                  )}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="LT"
                timeCaption="Time"
            />
            {/* break */}
            <label> Break </label>
            <input type="checkbox" defaultChecked={this.state.is_mon_break_on} onChange={event =>
                  this.setState(
                    byPropKey("mon_break_start_time", !this.state.is_mon_break_on)
                  )} />
            <br />
            <label> Mon break start time </label>
              <DatePicker
                id="mon_break_start_time"
                name="mon_break_start_time"
                selected={this.state.mon_break_start_time}
                onChange={event =>
                  this.setState(
                    byPropKey("mon_break_start_time", event)
                  )}
                disabled={!this.state.is_mon_break_on}
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
                  this.setState(
                    byPropKey("mon_break_end_time", event)
                  )}
                disabled={!this.state.is_mon_break_on}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="LT"
                timeCaption="Time"
            />
              </section>
              <div className="custom-btn">
                <button type="submit" className="register" onClick={this.onSubmit}>
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
      <div>
        <Header />
        <section class="layout">
        <SideBar />
        <MainCentent />
        </section>
        </div>
    );
  }
}

export default CompanyProfile;
