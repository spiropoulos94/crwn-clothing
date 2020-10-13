import firebase from "firebase/app";  //apo edw epilegei to utility library
import 'firebase/firestore';          //apo edw dialegei poia utils tha parei apo to firebase
import 'firebase/auth';               //(edw ekane import to.auth method)

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

firebase.initializeApp(config);

//gi ayto ekane import panw. gia na parei ta methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//orizei ton provider kai ton vazei na leitourgei me pop up otan zitithei na kanei sign in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
}

export default firebase;