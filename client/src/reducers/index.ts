import { combineReducers } from 'redux';

import posts from './posts';
import signUp from './signUp';
import categories from './categories';

export interface IRootSelector {
  posts: [PostData];
  signUp: {
    authData: UserData;
  };
  categories: [string]
}

export interface UserData {
  token: string,
  result: UserDataResult,
}

export interface UserDataResult {
  _id: string,
  email: string,
  firstName: string,
  lastName: string,
  nickname: string,
  city: string,
  street: string,
  phoneNumber: string,
}

export interface PostData {
  _id: string,
  title: string,
  description: string,
  prizeType: string,
  prize: string,
  creatorId: UserDataResult,
  categories: [string],
  createdAt: Date;
}

export default combineReducers({
  posts,
  signUp,
  categories,
});
