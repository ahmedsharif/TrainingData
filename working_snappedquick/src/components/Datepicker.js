import DatePicker from "react-datepicker";
//  import "react-datepicker/dist/react-datepicker.css";
import { byPropKey } from "./Base.js";

function SetDate(propKey, state) {
  return (
    <DatePicker
      id={propKey}
      name={propKey}
      selected={state}
      onChange={event => this.setState(byPropKey(propKey, event))}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      dateFormat="LT"
      timeCaption="Time"
    />
  );
}

export default SetDate;
