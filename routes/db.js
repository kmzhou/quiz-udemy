
var firebase = require("firebase");
require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAjkeZHhE2bxB4_D7dgOBinZYdCFY61ncI",
    authDomain: "quiz-udemy.firebaseapp.com",
    projectId: "quiz-udemy",
    storageBucket: "quiz-udemy.appspot.com",
    messagingSenderId: "1025963328618",
    appId: "1:1025963328618:web:82cd9be9f443077376f613",
    measurementId: "G-F2THLY00JG"
};
//- Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

exports.db = db;