import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSFz9g1Xuwx7DB4HpOWuKnMaJwlGimJ84",
  authDomain: "slot-for-family.firebaseapp.com",
  projectId: "slot-for-family",
  storageBucket: "slot-for-family.appspot.com",
  messagingSenderId: "784281873289",
  appId: "1:784281873289:web:78730a0e32aecf4304cf58",
  measurementId: "G-QRFFVKTD6K"
};

firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const setLogin = () => {
  firebase.auth().signInWithEmailAndPassword('enric@enric.com', '123456')
    .then(userData => console.log('USER_DATA', userData))
    .catch(err => console.log('ERROR', err))
}
