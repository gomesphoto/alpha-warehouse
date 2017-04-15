import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA63syzbGPrNuVvzQTLPHTK6sIMWXCbNzY',
  authDomain: 'alpha-warehouse.firebaseapp.com',
  databaseURL: 'https://alpha-warehouse.firebaseio.com',
  projectId: 'alpha-warehouse',
  storageBucket: 'alpha-warehouse.appspot.com',
  messagingSenderId: '792228833800'
};

firebase.initializeApp(config);

export const database = firebase.database();
export const defaultAuth = firebase.auth();
