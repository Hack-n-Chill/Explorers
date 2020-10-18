import firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyAhQhYhk4DGeGe-hvn_x4AGfVCaZNuXuPM",
    authDomain: "project-frontend-8f091.firebaseapp.com",
    databaseURL: "https://project-frontend-8f091.firebaseio.com",
    projectId: "project-frontend-8f091",
    storageBucket: "project-frontend-8f091.appspot.com",
    messagingSenderId: "261700665888",
    appId: "1:261700665888:web:28df15bb911c1f984e3245",
    measurementId: "G-W99W974LZL"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;