import axios from 'axios';
import base from './base';

/**
 * @desc validate and login user session
 * @param  {String} [email='']
 * @param  {String} [password='']
 * @param  {Function} [callback=fn()]
 * @return {Promise}
 */
export const apiLogin = (email = '', password = '', callback = () => {}) =>
  base.authWithPassword({ email, password }, callback);

/**
 * @desc signout authenticated user session
 * @return {Promise}
 */
export const apiLogout = () =>
  base.unauth();

/**
 * @desc fetches from squarespace
 * @return {Promise}
 */
export const apiFetchSquarepsaceOrders = () =>
  axios({
    method: 'get',
    url: 'https://api.squarespace.com/0.1/commerce/orders',
    headers: 'Authorization: Bearer 678ef356-c7f5-431a-99bc-939c5740c010'
  });

// SQUARESPACE API KEY 678ef356-c7f5-431a-99bc-939c5740c010
