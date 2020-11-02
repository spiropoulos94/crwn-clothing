import firebase from "firebase/app"; //apo edw epilegei to utility library
import 'firebase/firestore'; //apo edw dialegei poia utils tha parei apo to firebase
import 'firebase/auth';

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
    //the folowing item ref variable finds the 'leather jacket' product inside cartItems collection of selected
    // user
    //const item ref  = firestore.doc(`users/5qz0QXJT2td01YL5OVFD/cartItems/hye2IT4WrVZn8tmX0PBQ`);

    //using ref we tell firebase either to save data on this location or get data from there. no actual data exist there
    //it has only properies that tell us details about it and the .get() method used to take the snapshot of it,
    // which contains the actual data

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    // me to .data() exeis prosvasi sta data tou snapshot
    // const data =  snapshot.data()

    // console.log(snapshot,'yihua fake user')
    //console.log('signed in user ref', userRef )
    //console.log('signed in user snapshot', snapshot )

    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({  //gia na prosthesoume/afairesoume/tropopoihsoume dedomena xrisimopoioume panta to
                                 // Ref kai oxi to snapshot! ekei yparxoun ta .get() , .set() klp
                displayName,
                email,
                createdAt,
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

//gi ayto ekane import panw. gia na parei ta methods
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//orizei ton provider kai ton vazei na leitourgei me pop up otan zitithei na kanei sign in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => {
    //anti gia firebase.auth().signInWithPopup(provider) [thelei na kanei method chaining mallon]
    auth.signInWithPopup(provider)
}


export default firebase;