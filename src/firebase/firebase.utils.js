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

firebase.initializeApp(config);

//gia na treksei to parakatw prepei na yparxei userAuth. ayto ftiaxnete eite apo to signInWithGoogle
// eite apo to sign up + to displayName

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();


    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            // sto loginWithgoogle to auth exei displayName property, enw sto loginwithEmail oxi. gi ayto vazoume di
            // displayName value apo to input san additionalData ;)
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
    })

    return await batch.commit() // me to batch commit feygei to batch request. Epeidh omws gyrnaei promise tha kanoume thn function asynxroni kai to batch commit await(to be resolved)
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }

    })
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;  // pairnei ton titlo apo to kathe collection kai ton bazei san
                                                                    // key sto object, kai tou antistoixei to collection ayto
        return accumulator;
    }, {})

}

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