import {
    FETCH_USER
} from "../actions/types";


export default function (state = null, action) {
    console.log(action);
    switch (action.type) {
        //cuz if user is logged out, the api return "" which equals false, 
        //so we return false
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }

}