import React, { Component } from "react";
import { users } from "./Base.js";

class Header extends Component {
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

export default Header;
