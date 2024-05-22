importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js');

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }

firebase.initializeApp({
    apiKey: "AIzaSyCW3TMn-NISgZtGww2WNm9gsFff_ibZO2M",
    authDomain: "fir-admin-5109b.firebaseapp.com",
    databaseURL: "https://fir-admin-5109b.firebaseio.com",
    projectId: "fir-admin-5109b",
    storageBucket: "fir-admin-5109b.appspot.com",
    messagingSenderId: "629433672624",
    appId: "1:629433672624:web:b7123315c2d50677456c75"
  })

const initMessaging = firebase.messaging()