import {
    ADD_RECIPE,
    REMOVE_FROM_CALENDAR,
  } from '../actions'


const initialCalendarState = {
    sunday: {
        breakfast: null,
        meal: null,
        dinner: null,
    },
    monday: {
        breakfast: null,
        meal: null,
        dinner: null,
    },
    tuesday: {
        breakfast: null,
        meal: null,
        dinner: null,
    },
    wednesday: {
        breakfast: null,
        meal: null,
        dinner: null,
    },
    thursday: {
        breakfast: null,
        meal: null,
        dinner: null,
    },
    friday: {
        breakfast: null,
        meal: null,
        dinner: null,
    },
    saturday: {
        breakfast: null,
        meal: null,
        dinner: null,
    }
} 

function calendar(state=initialCalendarState, action) {
    const { day, recipe, meal} = action 

    switch(action.type) {
        case ADD_RECIPE:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: recipe.label,

                }
            }
        case REMOVE_FROM_CALENDAR :
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: null,
                }
            }
        default:
            return state
    }
}
        
export default calendar 