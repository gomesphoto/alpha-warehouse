import Rebase from 're-base';

const config = {
  apiKey: 'AIzaSyA63syzbGPrNuVvzQTLPHTK6sIMWXCbNzY',
  authDomain: 'alpha-warehouse.firebaseapp.com',
  databaseURL: 'https://alpha-warehouse.firebaseio.com',
  projectId: 'alpha-warehouse',
  storageBucket: 'alpha-warehouse.appspot.com',
  messagingSenderId: '792228833800'
};

const base = Rebase.createClass(config, 'alpha-warehouse');

export default base;
