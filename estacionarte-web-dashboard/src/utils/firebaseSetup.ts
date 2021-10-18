import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBIkOurCGgF67k-BiDcyqQ20PUHSRy1rlo",
    authDomain: "estacionartest-adef0.firebaseapp.com",
    projectId: "estacionartest-adef0",
    storageBucket: "estacionartest-adef0.appspot.com",
    messagingSenderId: "366591321757",
    appId: "1:366591321757:web:13d57361549b6a87fa5674",
    measurementId: "G-L6EQLMXE58"
};

const fbApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(fbApp);

export{
    fbApp,
    db
};

