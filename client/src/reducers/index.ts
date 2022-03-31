import { combineReducers } from 'redux';

import posts from './posts'

export interface IRootSelector {
  posts: any
}

export default combineReducers({
  posts,
})
