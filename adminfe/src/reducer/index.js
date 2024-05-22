import {combineReducers} from 'redux'
import loginReducer from './loginReducer'
import alertReducer from './alertReducer'
import omsReducer from './omsReducer'
import pmsReducer from './pmsReducer'

export default combineReducers({
    login:loginReducer,
    alert:alertReducer,
    oms:omsReducer,
    pms:pmsReducer
});