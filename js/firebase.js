/**
 * Created by mohsen on 8/23/2017.
 */
    // Initialize Firebase
import * as firebase from 'firebase'
var config = {
        apiKey: "AIzaSyD6ui0_bIIBDlklkHkSoiru7oZoFpHy_jI",
        authDomain: "chat-app-86085.firebaseapp.com",
        databaseURL: "https://chat-app-86085.firebaseio.com",
        projectId: "chat-app-86085",
        storageBucket: "",
        messagingSenderId: "402945701203"
    };
firebase.initializeApp(config);
export default firebase;
