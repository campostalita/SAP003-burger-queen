import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBpgpY8MjBfROljSFft4sD2yW3CnrpGDvw",
    authDomain: "burger-queen-61f7a.firebaseapp.com",
    databaseURL: "https://burger-queen-61f7a.firebaseio.com",
    projectId: "burger-queen-61f7a",
    storageBucket: "burger-queen-61f7a.appspot.com",
    messagingSenderId: "69746875154",
    appId: "1:69746875154:web:24c3a9143709cb9a6f31cb",
    measurementId: "G-L2TJE27MPN"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const fireStore = firebaseApp.firestore();

export default fireStore;