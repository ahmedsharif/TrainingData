import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";

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
// import "./js/custom.js";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import validator from "validator";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const url = "http://54.213.158.63/snapped_quick_api_and_admin/public/api/users";

const companyRequest = state => {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: state.userId,
      company_name: state.company_name,
      primary_contact: state.primary_contact,
      secondary_contact: state.secondary_contact,
      logo_image: state.logo_image,
      api_token: state.api_token,
      company_st_address: state.company_st_address,
      company_city: state.company_city,
      company_state: state.company_state,
      company_zip: state.company_zip,
      company_country: state.company_country,
      company_location: state.company_location,
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

const required = value => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return "require";
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
  if (initial_password != value) {
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
                        src="images/users/img-1.png"
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
                        src="images/users/img-2.png"
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
                        src="images/users/img-3.png"
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
                        src="images/users/img-4.png"
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
                        src="images/users/img-5.png"
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
                        src="images/users/img-6.png"
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
                        src="images/users/img-7.png"
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
                src="images/users/img-5.png"
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

class SideBar extends Component {
  render() {
    return (
      <aside className="sidebar collapsible canvas-left bg-dark">
        <div className="small-logo">
          <a href="dashboard.html">
            <img src="images/logo@2x.png" alt="logo" />
          </a>
        </div>
        <nav className="main-navigation">
          <ul>
            <li className="active">
              <a href="dashboard.html">
                <img src="images/home-icon.png" alt />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="dropdown show-on-hover">
              <a href="#" data-toggle="dropdown">
                <img src="images/package-icon.png" alt />
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
                <img src="images/booking-history-icon.png" alt />
                <span>My Booking History</span>
              </a>
            </li>
            <li>
              <a href="profile-settings.html">
                <img src="images/profile-setting-icon.png" alt />
                <span>Profile Settings</span>
              </a>
            </li>
            <li>
              <a href="payment-settings.html">
                <img src="images/payment-settings-icon.png" alt />
                <span>Payment Settings</span>
              </a>
            </li>
            <li>
              <a href="gallery.html">
                <img src="images/gallery-icon.png" alt />
                <span>Gallery</span>
              </a>
            </li>
            <li>
              <a href="login.html">
                <img src="images/logout-icon.png" alt />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}

// class MainCentent extends Component {
//         render() {
//           return (
//             <section className="main-content">
//               <div className="header-fixed title-header">
//                 <h2>Profile Settings</h2>
//               </div>
//               <div className="content-wrap spacer">
//                 <div className="form-content">
//                   <form>
//                     <div className="row">
//                       <div className="col-md-6 col-sm-12">
//                         <div className="box">
//                           <input type="file" name id="file-1" className="inputfile inputfile-4" />
//                           <label htmlFor="file-1">
//                             <figure className="main-image"><img src="images/upload-to-cloud-large.png" className="img-responsive" alt /></figure> <span>Upload Profile Photo…</span>
//                           </label>
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="row">
//                           <div className="col-md-6 col-sm-6 col-xs-6">
//                             <div className="box">
//                               <input type="file" name id="file-2" className="inputfile inputfile-4" />
//                               <label htmlFor="file-2">
//                                 <figure><img src="images/upload-to-cloud.png" className="img-responsive" alt /></figure> <span>Upload Profile Photo</span>
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6 col-sm-6 col-xs-6">
//                             <div className="box">
//                               <input type="file" name id="file-3" className="inputfile inputfile-4" />
//                               <label htmlFor="file-3">
//                                 <figure><img src="images/upload-to-cloud.png" className="img-responsive" alt /></figure> <span>Upload Profile Photo</span>
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6 col-sm-6 col-xs-6">
//                             <div className="box">
//                               <input type="file" name id="file-4" className="inputfile inputfile-4" />
//                               <label htmlFor="file-4">
//                                 <figure><img src="images/upload-to-cloud.png" className="img-responsive" alt /></figure> <span>Upload Profile Photo</span>
//                               </label>
//                             </div>
//                           </div>
//                           <div className="col-md-6 col-sm-6 col-xs-6">
//                             <div className="box">
//                               <input type="file" name id="file-5" className="inputfile inputfile-4" />
//                               <label htmlFor="file-5">
//                                 <figure><img src="images/upload-to-cloud.png" className="img-responsive" alt /></figure> <span>Upload Profile Photo</span>
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row spacer">
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="text" name id required="required" />
//                           <label>User Name</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="text" name id required="required" />
//                           <label>Date Of Birth</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="text" name id required="required" />
//                           <label>Email</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="password" name id required="required" />
//                           <label>Old Password</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="password" name id required="required" />
//                           <label>New Password</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="password" name id required="required" />
//                           <label>Confirm Password</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="text" name id required="required" />
//                           <label>Address</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                       <div className="col-md-6 col-sm-12">
//                         <div className="input-container">
//                           <input type="text" name id required="required" />
//                           <label>Phone Number</label>
//                           <div className="bar" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="custom-btn"><button type="submit"><i className="fa fa-floppy-o" aria-hidden="true" /> Save Settings</button></div>
//                   </form>
//                 </div>
//               </div>
//             </section>
//           );
//         }
// }

class CompanyProfile extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
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
    return (
      <div className="app" data-sidebar="locked">
        {/* <section className="layout"><SideBar /></section> */}
        <Header />
      </div>
    );
  }
}

export default CompanyProfile;
