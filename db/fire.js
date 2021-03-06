import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDluonuaPcLFWSjnA7h8EaRCKxZnUHJ19g',
  authDomain: 'foodber-65c10.firebaseapp.com',
  databaseURL: 'https://foodber-65c10.firebaseio.com',
  projectId: 'foodber-65c10',
  storageBucket: 'foodber-65c10.appspot.com',
  messagingSenderId: '669394895252',
};

firebase.initializeApp(config);
const db = firebase.firestore();

const allTrucks = db.collection('trucks');
const addUser = db.collection('users');
const truckOrders = db.collection('truckOrders');
const truckLocation = db.collection('truckLocation');

export { db, allTrucks, truckOrders, addUser, truckLocation };
