import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import RegisterUser from "./components/userRegistration.js";

import Login from "./components/Login.js";
// import { Route, Link } from "react-router-dom";

// class Main extends Component {
//   constructor() {
//     super();
//     this.registerUser = this.registerUser.bind(this);
//     this.setState = {
//         isUserRegistered: false,
//     }
//   }

//   componentDidMount() {
//       this.registerUser("");
//   }

//   register_user(){
//       this.setState({
//         isUserRegistered: true,
//       })
//   }

//   render() {
//       return (
//         <div className="Main">
//         <Route
//           path="/"
//           render={() => (
//             <div className="App-header">
//             </div>
//           )}
//         />
//         </div>
//       )
//   }


// }


ReactDOM.render(<RegisterUser />, document.getElementById("root"));
registerServiceWorker();
