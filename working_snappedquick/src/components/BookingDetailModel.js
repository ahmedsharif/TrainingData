import React from "react";

class BookingDetailModel extends React.Component {
  render() {
    return (
      <div
        className="modal fade booking-detail"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="close-ico">
                <img
                  src="images/close-icon.png"
                  alt=""
                  data-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <h4 className="title">Booking Detail</h4>
              <div className="detail-holder">
                <div className="booking-col">
                  <h4>
                    <a href={null}>Wedding Photography</a>
                  </h4>
                  <h5>
                    -with{" "}
                    <span>
                      <img src="images/users/img-1.png" alt="" />
                    </span>{" "}
                    Client Name Here
                  </h5>
                  <ul>
                    <li>
                      <img src="images/clock.png" alt="" />
                      <strong>Time:</strong>
                      <span>10:00 AM - 2:00 PM</span>
                    </li>
                    <li>|</li>
                    <li>
                      <img src="images/location-icon.png" alt="" />
                      <strong>Location:</strong>
                      <span>Tampa Florida, USA</span>
                    </li>
                  </ul>
                  <div className="cost">
                    <span>Cost in USD</span>
                    <strong>8000.0</strong>
                  </div>
                </div>
                <div className="included">
                  <h4>What's Included?</h4>
                  <ul>
                    <li>
                      <i className="fa fa-circle" aria-hidden="true" /> 200
                      Highly professional pictures
                    </li>
                    <li>
                      <i className="fa fa-circle" aria-hidden="true" /> 80
                      Frames pictures
                    </li>
                    <li>
                      <i className="fa fa-circle" aria-hidden="true" /> Another
                      item detail go here....
                    </li>
                    <li>
                      <i className="fa fa-circle" aria-hidden="true" /> Lorem
                      Ipsum is simply dummy text of the printing.
                    </li>
                  </ul>
                </div>
                <div className="booking-actions">
                  <ul>
                    <li className="green">
                      <i className="fa fa-check" aria-hidden="true" />
                      <span>Complete</span>
                    </li>
                    <li className="red">
                      <i className="fa fa-times" aria-hidden="true" />
                      <span>Cancel</span>
                    </li>
                    <li className="blue">
                      <i className="fa fa-history" aria-hidden="true" />
                      <span>Reschedule</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingDetailModel;
