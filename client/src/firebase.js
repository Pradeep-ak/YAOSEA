import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyCW3TMn-NISgZtGww2WNm9gsFff_ibZO2M",
    authDomain: "fir-admin-5109b.firebaseapp.com",
    databaseURL: "https://fir-admin-5109b.firebaseio.com",
    projectId: "fir-admin-5109b",
    storageBucket: "fir-admin-5109b.appspot.com",
    messagingSenderId: "629433672624",
    appId: "1:629433672624:web:b7123315c2d50677456c75"
  };
  // Initialize Firebase
  if(firebase.messaging.isSupported){
    firebase.initializeApp(firebaseConfig);
  }
export default firebase