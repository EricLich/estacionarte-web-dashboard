import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import firebase from 'firebase/compat/app'


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

createApp(App).use(router).mount('#app')
