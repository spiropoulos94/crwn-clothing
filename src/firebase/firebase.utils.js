import firebase from "firebase/app";  //apo edw epilegei to utility library
import 'firebase/firestore';          //apo edw dialegei poia utils tha parei apo to firebase
import 'firebase/auth';
import {onLog} from "firebase";               //(edw ekane import to.auth method)

const config = {
    apiKey: "AIzaSyCGmcpNZHHfeZ7NpyYvrVycp3oVzvelDf0",
    authDomain: "crwn-db-1f514.firebaseapp.com",
    databaseURL: "https://crwn-db-1f514.firebaseio.com",
    projectId: "crwn-db-1f514",
    storageBucket: "crwn-db-1f514.appspot.com",
    messagingSenderId: "802797109886",
    appId: "1:802797109886:web:6ed42fffe637ed87950e2f",
    measurementId: "G-V9LZPEG6ME"
}

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    //i compared the user i manually added with the user that signed in to spot differences in their snapshots

    //the folowing user ref variable finds the 'leather jacket' product inside cartItems collection of selected user
    //const userRef = firestore.doc(`users/5qz0QXJT2td01YL5OVFD/cartItems/hye2IT4WrVZn8tmX0PBQ`);

    const userRef = firestore.doc(`users/5qz0QXJT2td01YL5OVFD`);
    const userRef2 = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();
    const snapshot2 = await userRef2.get();

     console.log(snapshot,'yihua fake user')
    console.log(snapshot2,'signed in user')
}

firebase.initializeApp(config);

//gi ayto ekane import panw. gia na parei ta methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//orizei ton provider kai ton vazei na leitourgei me pop up otan zitithei na kanei sign in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => {
    //anti gia firebase.auth().signInWithPopup(provider) [thele na kanei method chaining mallon]
    auth.signInWithPopup(provider)
}


export default firebase;