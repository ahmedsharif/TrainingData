import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { addRecipe, removeFromCalendar } from "./actions";


class App extends Component {
  //   state = {
  //       calendar: null
  //   }

  //   componentDidMount() {
  //     const {store} = this.props

  //     store.subscribe(() => {
  //       this.setState(() => ({
  //         calendar: store.getState()
  //       }))
  //     })
  //   }

  // submitFood = () => {
  //   this.props.store.dispatch(addRecipe({
  //     day: 'monday',
  //     meal: 'breakfast',
  //     recipe: {
  //       label: this.input.value
  //     }
  //   }))

  //   this.input.value = ''
  // }

  render() {
    // doThing = () => {
    //   this.props.selectRecipe({})
    //   };

    console.log("props", this.props);
    return (
      <div>
        Hello World
        {/*       
      <input type="text" ref={(input) => this.input = input }
      placeholder="Monday's Breakfast" />
      <button onClick={this.submitFood}> Submit </button>

      <pre>
        Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast }
      </pre>
       */}
      </div>
    );
  }
}

function mapStateToProps(calendar) {
  const dayOrder = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  return {
    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? calendar[day][meal] : null;
        return meals;
      }, {})
    }))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
