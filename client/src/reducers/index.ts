import { combineReducers } from 'redux';

import posts from './posts'
import signUp from './signUp'

export interface IRootSelector {
  posts: any
  signUp: any
}

export default combineReducers({
  posts,
  signUp
})
