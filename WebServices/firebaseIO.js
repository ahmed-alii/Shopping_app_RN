import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import {saveData} from "./Storage";

firebase.initializeApp(firebaseConfig);

export const FirebaseIO = {
    loginWithEmail: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            return firebase.firestore()
                .collection("users")
                .doc(res.user.uid)
                .get()
                .then((snapshot) => {
                    console.log("FROM FIREBASE, Saving user in storage.")
                    saveData(snapshot.data()).then()
                    return (snapshot.data())
                });
        });
    },
    signupWithEmail: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    },
    signOut: () => {
        return firebase.auth().signOut();
    },

    passwordReset: email => {
        return firebase.auth().sendPasswordResetEmail(email);
    },
    createNewUser: userData => {
        return firebase
            .firestore()
            .collection("users")
            .doc(`${userData.uid}`)
            .set(userData);
    },
};

export const Fetch = {
    getData: () => {
        const URL = "https://shop-open-close.herokuapp.com/api"
        return fetch(URL, {
            method: 'get',
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data;
        }).catch(r => {
            console.log(r)
        });
    }
}

