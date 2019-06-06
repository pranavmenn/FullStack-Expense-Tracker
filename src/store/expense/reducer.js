import initialState from '../../store/initialState';
import * as types from './types';

export default function blogReducer ( state = initialState,action) {
  console.log(state)
  switch(action.type){

    case types.LOGGED_IN:
    console.log("imma here");
    return{
      ...state,
      isLoggedin: action.status
    }
    default:
    return state
  }
}
