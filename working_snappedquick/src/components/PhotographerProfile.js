import React, { Component } from "react";
import { byPropKey, images } from "./Base.js";
import { Redirect } from "react-router-dom";

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import SideBar from "./Sidebar.js";
import "./Login.js";
import Header from "./Header.js";
import ImageUploader from "react-images-upload";

const url = "http://54.213.158.63/snapped_quick_api_and_admin/public/api/pgs";
var flag = false;

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
      user_id: data["response"]['user']["id"],
      company_name: state.company_name,
      primary_contact: state.primary_contact,
      secondary_contact: state.secondary_contact,
      logo_image: state.logo_image,
      api_token: data["response"]['user']["api_token"],
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
      mon_break_start_time: state.mon_break_start_time.format("HH:mm:ss"),
      mon_break_end_time: state.mon_break_end_time.format("HH:mm:ss"),

      is_tue_on: state.is_tue_on,
      tue_work_start_time: state.tue_work_start_time.format("HH:mm:ss"),
      tue_work_end_time: state.tue_work_end_time.format("HH:mm:ss"),
      is_tue_break_on: state.is_tue_break_on,
      tue_break_start_time: state.tue_break_start_time.format("HH:mm:ss"),
      tue_break_end_time: state.tue_break_end_time.format("HH:mm:ss"),

      is_wed_on: state.is_wed_on,
      wed_work_start_time: state.wed_work_start_time.format("HH:mm:ss"),
      wed_work_end_time: state.wed_work_end_time.format("HH:mm:ss"),
      is_wed_break_on: state.is_wed_break_on,
      wed_break_start_time: state.wed_break_start_time.format("HH:mm:ss"),
      wed_break_end_time: state.wed_break_end_time.format("HH:mm:ss"),

      is_thu_on: state.is_thu_on,
      thu_work_start_time: state.thu_work_start_time.format("HH:mm:ss"),
      thu_work_end_time: state.thu_work_end_time.format("HH:mm:ss"),
      is_thu_break_on: state.is_thu_break_on,
      thu_break_start_time: state.thu_break_start_time.format("HH:mm:ss"),
      thu_break_end_time: state.thu_break_end_time.format("HH:mm:ss"),

      is_fri_on: state.is_fri_on,
      fri_work_start_time: state.fri_work_start_time.format("HH:mm:ss"),
      fri_work_end_time: state.fri_work_end_time.format("HH:mm:ss"),
      is_fri_break_on: state.is_fri_break_on,
      fri_break_start_time: state.fri_break_start_time.format("HH:mm:ss"),
      fri_break_end_time: state.fri_break_end_time.format("HH:mm:ss"),

      is_sat_on: state.is_sat_on,
      sat_work_start_time: state.sat_work_start_time.format("HH:mm:ss"),
      sat_work_end_time: state.sat_work_end_time.format("HH:mm:ss"),
      is_sat_break_on: state.is_sat_break_on,
      sat_break_start_time: state.sat_break_start_time.format("HH:mm:ss"),
      sat_break_end_time: state.sat_break_end_time.format("HH:mm:ss"),

      is_sun_on: state.is_sun_on,
      sun_work_start_time: state.sun_work_start_time.format("HH:mm:ss"),
      sun_work_end_time: state.sun_work_end_time.format("HH:mm:ss"),
      is_sun_break_on: state.is_sun_break_on,
      sun_break_start_time: state.sun_break_start_time.format("HH:mm:ss"),
      sun_break_end_time: state.sun_break_end_time.format("HH:mm:ss")
    })
  })
    // .then(response => response.json())
    // .catch(error => console.error("Error:", error))
    // .then(json => {
    //   console.log(json);
    //   flag = true;
    // });
    .then(responseData => {
      console.log(responseData);
      localStorage.setItem('company_name',state.company_name);
      flag = true;
    })
    .catch(error => console.log(error));
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
      logo_image: [],
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
    this.onDrop = this.onDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    companyRequest(this.state);
    if (flag) {
      this.setState({
        redirect: true
      });
    }
  };

  onDrop(picture) {
      this.setState({
      logo_image: this.state.logo_image.concat(picture)
    });
  }

  handleChange = (propKey, event) => {
    this.setState(byPropKey(propKey, event));
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
                    <ImageUploader
                      withPreview={true}
                      id="logo_image"
                      withIcon={true}
                      buttonText="Upload Profile Photo…"
                      onChange={this.onDrop}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    />
                    <label htmlFor="file-1">
                      <figure className="main-image">
                        <img
                          src={images["upload-to-cloud-large.png"]}
                          className="img-responsive"
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
                      required="required"
                      type="text"
                      id="primary_contact"
                      onChange={event =>
                        this.setState(
                          byPropKey("primary_contact", event.target.value)
                        )
                      }
                      
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
              </div>

              {/* new section for dates */}
              <div className="row spacer">
                <label> Monday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_mon_on}
                  onChange={event =>
                    this.setState(byPropKey("is_mon_on", !this.state.is_mon_on))
                  }
                />
                <br />

                <div className="col-md-6 col-sm-12">
                  <label> Monday Work Start Time </label>
                  <SetDate
                    propKey="mon_work_start_time"
                    state={this.state.mon_work_start_time}
                    handleChange={e =>
                      this.handleChange("mon_work_start_time", e)
                    }
                  />
                </div>

                <div className="col-md-6 col-sm-12">
                  <label> Monday Work End Time </label>
                  <SetDate
                    propKey="mon_work_end_time"
                    state={this.state.mon_work_end_time}
                    handleChange={e =>
                      this.handleChange("mon_work_end_time", e)
                    }
                  />
                </div>

                <label> Monday Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_mon_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_mon_break_on", !this.state.is_mon_break_on)
                    )
                  }
                />
                <br />

                <div className="col-md-6 col-sm-12">
                  <label> Mon Break Start Time </label>
                  <SetDate
                    propKey="mon_break_start_time"
                    state={this.state.mon_break_start_time}
                    handleChange={e =>
                      this.handleChange("mon_break_start_time", e)
                    }
                  />
                </div>

                <div className="col-md-6 col-sm-12">
                  <label> Monday Break End Time </label>
                  <SetDate
                    propKey="mon_break_end_time"
                    state={this.state.mon_break_end_time}
                    handleChange={e =>
                      this.handleChange("mon_break_end_time", e)
                    }
                  />
                </div>
              </div>
              {/* Tuesday */}
              <div className="row spacer">
                <label> Tuesday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_tue_on}
                  onChange={event =>
                    this.setState(byPropKey("is_tue_on", !this.state.is_tue_on))
                  }
                />
                <br />

                <div className="col-md-6 col-sm-12">
                  <label> Tue Work Start Time </label>
                  <SetDate
                    propKey="tue_work_start_time"
                    state={this.state.tue_work_start_time}
                    handleChange={e =>
                      this.handleChange("tue_work_start_time", e)
                    }
                  />
                </div>

                <div className="col-md-6 col-sm-12">
                  <label> Tue Work End Time </label>
                  <SetDate
                    propKey="tue_work_end_time"
                    state={this.state.tue_work_end_time}
                    handleChange={e =>
                      this.handleChange("tue_work_end_time", e)
                    }
                  />
                </div>

                <label> Tuesday Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_tue_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_tue_break_on", !this.state.is_tue_break_on)
                    )
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Tue Break Start Time </label>
                  <SetDate
                    propKey="tue_break_start_time"
                    state={this.state.tue_break_start_time}
                    handleChange={e =>
                      this.handleChange("tue_break_start_time", e)
                    }
                  />
                </div>

                <div className="col-md-6 col-sm-12">
                  <label> Tue Break End Time </label>
                  <SetDate
                    propKey="tue_break_end_time"
                    state={this.state.tue_break_end_time}
                    handleChange={e =>
                      this.handleChange("tue_break_end_time", e)
                    }
                  />
                </div>
              </div>

              {/* Wednesday */}
              <div className="row spacer">
                <label> Wednesday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_wed_on}
                  onChange={event =>
                    this.setState(byPropKey("is_wed_on", !this.state.is_wed_on))
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Wed Work Start Time </label>
                  <SetDate
                    propKey="wed_work_start_time"
                    state={this.state.wed_work_start_time}
                    handleChange={e =>
                      this.handleChange("wed_work_start_time", e)
                    }
                  />
                </div>

                <div className="col-md-6 col-sm-12">
                  <label> Wed Work End Time </label>
                  <SetDate
                    propKey="wed_work_end_time"
                    state={this.state.wed_work_end_time}
                    handleChange={e =>
                      this.handleChange("wed_work_end_time", e)
                    }
                  />
                </div>

                <label> Wedesday Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_wed_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_wed_break_on", !this.state.is_wed_break_on)
                    )
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Wed Break Start Time </label>
                  <SetDate
                    propKey="wed_break_start_time"
                    state={this.state.wed_break_start_time}
                    handleChange={e =>
                      this.handleChange("wed_break_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Wed Break End Time </label>
                  <SetDate
                    propKey="wed_break_end_time"
                    state={this.state.wed_break_end_time}
                    handleChange={e =>
                      this.handleChange("wed_break_end_time", e)
                    }
                  />
                </div>
              </div>

              {/* Thursday */}
              <div className="row spacer">
                <label> Thursday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_thu_on}
                  onChange={event =>
                    this.setState(byPropKey("is_thu_on", !this.state.is_thu_on))
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Thu Work Start Time </label>
                  <SetDate
                    propKey="thu_work_start_time"
                    state={this.state.thu_work_start_time}
                    handleChange={e =>
                      this.handleChange("thu_work_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Thu Work End Time </label>
                  <SetDate
                    propKey="thu_work_end_time"
                    state={this.state.thu_work_end_time}
                    handleChange={e =>
                      this.handleChange("thu_work_end_time", e)
                    }
                  />
                </div>

                <label> Thursday Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_thu_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_thu_break_on", !this.state.is_thu_break_on)
                    )
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Thu Break Start Time </label>
                  <SetDate
                    propKey="thu_break_start_time"
                    state={this.state.thu_break_start_time}
                    handleChange={e =>
                      this.handleChange("thu_break_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Thu Break End Time </label>
                  <SetDate
                    propKey="thu_break_end_time"
                    state={this.state.thu_break_end_time}
                    handleChange={e =>
                      this.handleChange("thu_break_end_time", e)
                    }
                  />
                </div>
              </div>

              {/* Friday */}
              <div className="row spacer">
                <label> Friday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_fri_on}
                  onChange={event =>
                    this.setState(byPropKey("is_fri_on", !this.state.is_fri_on))
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Fri Work Start Time </label>
                  <SetDate
                    propKey="fri_work_start_time"
                    state={this.state.fri_work_start_time}
                    handleChange={e =>
                      this.handleChange("fri_work_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Fri Work End Time </label>
                  <SetDate
                    propKey="fri_work_end_time"
                    state={this.state.fri_work_end_time}
                    handleChange={e =>
                      this.handleChange("fri_work_end_time", e)
                    }
                  />
                </div>

                <label> Friday Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_fri_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_fri_break_on", !this.state.is_fri_break_on)
                    )
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Fri Break Start Time </label>
                  <SetDate
                    propKey="fri_break_start_time"
                    state={this.state.fri_break_start_time}
                    handleChange={e =>
                      this.handleChange("fri_break_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Fri Break End Time </label>
                  <SetDate
                    propKey="fri_break_end_time"
                    state={this.state.fri_break_end_time}
                    handleChange={e =>
                      this.handleChange("fri_break_end_time", e)
                    }
                  />
                </div>
              </div>

              {/* Sat */}
              <div className="row spacer">
                <label> Saturday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_sat_on}
                  onChange={event =>
                    this.setState(byPropKey("is_sat_on", !this.state.is_sat_on))
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Sat Work Start Time </label>
                  <SetDate
                    propKey="sat_work_start_time"
                    state={this.state.sat_work_start_time}
                    handleChange={e =>
                      this.handleChange("sat_work_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Sat Work End Time </label>
                  <SetDate
                    propKey="sat_work_end_time"
                    state={this.state.sat_work_end_time}
                    handleChange={e =>
                      this.handleChange("sat_work_end_time", e)
                    }
                  />
                </div>

                <label> Saturday Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_sat_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_sat_break_on", !this.state.is_sat_break_on)
                    )
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Sat Break Start Time </label>
                  <SetDate
                    propKey="sat_break_start_time"
                    state={this.state.sat_break_start_time}
                    handleChange={e =>
                      this.handleChange("sat_break_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Sat Break End Time </label>
                  <SetDate
                    propKey="sat_break_end_time"
                    state={this.state.sat_break_end_time}
                    handleChange={e =>
                      this.handleChange("sat_break_end_time", e)
                    }
                  />
                </div>
              </div>

              {/* Sun */}
              <div className="row spacer">
                <label> Sunday </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_sun_on}
                  onChange={event =>
                    this.setState(byPropKey("is_sun_on", !this.state.is_sun_on))
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Sun Work Start Time </label>
                  <SetDate
                    propKey="sun_work_start_time"
                    state={this.state.sun_work_start_time}
                    handleChange={e =>
                      this.handleChange("sun_work_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Sun Work End Time </label>
                  <SetDate
                    propKey="sun_work_end_time"
                    state={this.state.sun_work_end_time}
                    handleChange={e =>
                      this.handleChange("sun_work_end_time", e)
                    }
                  />
                </div>

                <label> Sun Break </label>

                <input
                  type="checkbox"
                  defaultChecked={this.state.is_sun_break_on}
                  onChange={event =>
                    this.setState(
                      byPropKey("is_sun_break_on", !this.state.is_sun_break_on)
                    )
                  }
                />
                <br />
                <div className="col-md-6 col-sm-12">
                  <label> Sun Break Start Time </label>
                  <SetDate
                    propKey="sun_break_start_time"
                    state={this.state.sun_break_start_time}
                    handleChange={e =>
                      this.handleChange("sun_break_start_time", e)
                    }
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label> Sun Break End Time </label>
                  <SetDate
                    propKey="sun_break_end_time"
                    state={this.state.sun_break_end_time}
                    handleChange={e =>
                      this.handleChange("sun_break_end_time", e)
                    }
                  />
                </div>
              </div>

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

function SetDate(props) {
  return (
    <DatePicker
      id={props.propKey}
      name={props.propKey}
      onChange={props.handleChange}
      selected={props.state}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="LT"
      timeCaption="Time"
    />
  );
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
