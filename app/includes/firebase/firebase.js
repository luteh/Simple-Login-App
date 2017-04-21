
import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyAb0eWD4d4IKD_4xw6cEAnMq5t30z5QOME",
            authDomain: "tutorial1-3a27f.firebaseapp.com",
            databaseURL: "https://tutorial1-3a27f.firebaseio.com",
            storageBucket: "tutorial1-3a27f.appspot.com"
        });
    }

}

module.exports = Firebase;
