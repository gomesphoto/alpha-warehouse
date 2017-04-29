/* eslint camelcase: 0 */
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
