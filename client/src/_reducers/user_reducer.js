import { 
    AUTH_USER,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER
} from "../_actions/types";

export default function foo(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register:action.payload}
        case LOGIN_USER:
            return {...state, loginSuccess:action.payload}
        case AUTH_USER:
            return {...state, userData:action.payload}
        case LOGOUT_USER:
                return {...state }
        default:
            return state;
    }
}