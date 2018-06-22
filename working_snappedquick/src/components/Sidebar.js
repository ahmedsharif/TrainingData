import React from "react";
import { images } from "./Base.js";

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
            <a href={null} data-toggle="dropdown">
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

export default SideBar;
