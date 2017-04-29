/**
 * @desc create authenticated user session
 * @param  {String} [uid='']
 * @param  {String} [email='']
 * @param  {String} [profile='']
 * @param  {Date} [expires=Date.now()]
 * @return {Session}
 */
export const setSession = (
  uid = '',
  email = '',
  displayName = '',
  expires = Date.now(),
  ) => {
  const session = {
    uid,
    email,
    displayName,
    expires,
  };
  localStorage.setItem('ALPHA_SESSION', JSON.stringify(session));
};

/**
 * @desc get session as an object
 * @return {Object}
 */
export const getSession = () => {
  const session = localStorage.getItem('ALPHA_SESSION');
  return JSON.parse(session);
};

/**
 * @desc update profile in session
 * @param  {Array}  [profile=[]]
 * @return {Session}
 */
export const updateProfile = (profile = []) => {
  const newSession = { ...getSession(), profile };
  return localStorage.setItem('ALPHA_SESSION', JSON.stringify(newSession));
};

/**
 * @desc delete session
 * @return {Void}
 */
export const deleteSession = () => {
  localStorage.removeItem('ALPHA_SESSION');
};

/**
 * @desc get session status
 * @return {String}
 */
export const getSessionStatus = () => {
  const auth = getSession();
  if (auth && auth.expires > Date.now()) return 'LOGIN';
  return 'LOGOUT';
};

/**
 * @desc set and clear timeout for Session Expire Warning
 */
let timeout = null;
const refreshTimeout = (refreshTime) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.error('TIMEOUT');
  }, refreshTime);
};
export const clearSessionExpireWarning = () => {
  clearTimeout(timeout);
};

/**
 * @desc refresh sesion tokens
 * @return {Void}
 */
export const refreshSession = () => {
  const auth = getSession();

  const getRefreshedSession = (sessionObject, refreshTime) => {
    const newExpires = Date.now() + refreshTime;
    if (sessionObject.maxAge - newExpires > refreshTime) {
      sessionObject.expires = newExpires;
    } else sessionObject.expires = sessionObject.maxAge;
    return JSON.stringify(sessionObject);
  };

  if (auth) {
    localStorage.setItem('ALPHA_SESSION', getRefreshedSession(auth, 300000)); // 5 min
    return refreshTimeout(240000); // 4 min
  }
};

/**
 * @desc returns order status
 * @param {Object} order
 * @return {String}
 */
export const getOrderStatus = (order) => {
  if (order.fulfillmentStatus === 'FULFILLED') {
    return 'Fulfilled';
  } else if (order.financialStatus === 'PAID') {
    return 'Paid';
  }
  return 'Incomplete';
};

/**
 * @desc detects mobile devices
 * @return {Boolean}
 */
export const isMobile = () => {
  if ('ontouchstart' in window && Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 800) return true;
  return false;
};

/**
 * @desc returns currency symbol
 * @param {String} currency
 * @return {String}
 */
export const getCurrencySymbol = (currency) => {
  switch (currency.toUpperCase()) {
    case 'GBP':
      return '£';
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    default:
      return '£';
  }
};

/**
 * @desc parse customer names
 * @param {String} name
 * @return {String}
 */
export const parseName = (name) => {
  const holder = name.split(' ');
  const result = holder.map((x, idx, arr) =>
    (idx === 0 || idx === arr.length - 1)
    ? x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()
    : ''
  );
  const string = result.join(' ');
  return string;
};

/**
 * @desc return ellipsed text
 * @param  {String} [text='']
 * @param  {String} [maxLength=text.length]
 * @return {String}
 */
export const ellipseText = (text = '', maxLength = false, noEllipse = false) =>
  (maxLength && text.length > maxLength) ? `${text.substring(0, maxLength)}${(noEllipse) ? '' : '...'}` : text;

/**
 * @desc turns any string into camelcase
 * @param {string} str
 * @return {string}
 */
export const camelize = str =>
  str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  ).replace(/\s+/g, '');
