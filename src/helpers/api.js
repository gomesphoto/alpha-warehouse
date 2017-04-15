/* eslint camelcase: 0 */
import axios from 'axios';
import { defaultAuth as auth } from './firebase';

/**
 * Configuration for api instance
 * @type axios instance
 */
const apiRequest = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    platform: 'web'
  }
});

/**
 * @desc validate and login user session
 * @param  {String} [email='']
 * @param  {String} [password='']
 * @return {Promise}
 */
export const apiLogin = (email = '', password = '') =>
  auth.signInWithEmailAndPassword(email, password);

/**
 * @desc create user auth
 * @param  {String} [email='']
 * @param  {String} [password='']
 * @return {Promise}
 */
export const apiSignup = (email = '', password = '') =>
  auth.createUserWithEmailAndPassword(email, password);

/**
 * @desc signout authenticated user session
 * @return {Promise}
 */
export const apiLogout = () =>
  auth.signOut();

/**
 * @desc find foods from mynetdiary database
 * @return {Promise}
 */
export const apiDatabaseSearch = () =>
  apiRequest.findFoods();
