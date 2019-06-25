import * as types from './types';

const loggedIn = (status) => {
  return { type: types.LOGGED_IN,status}
}

export default loggedIn;
