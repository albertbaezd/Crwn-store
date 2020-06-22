import firebase from 'firebase/app';
import 'firebase/firestore'; //db
import 'firebase/auth'; //db


const config =
{
    apiKey: "AIzaSyCRNttM6mp0G-g9kaM_yaNmUqxboH69Png",
    authDomain: "crwn-db-ad496.firebaseapp.com",
    databaseURL: "https://crwn-db-ad496.firebaseio.com",
    projectId: "crwn-db-ad496",
    storageBucket: "crwn-db-ad496.appspot.com",
    messagingSenderId: "434617177544",
    appId: "1:434617177544:web:54cb68a33ce19072705cfd",
    measurementId: "G-WKFL35VKZB"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`) //esto me devuelve la referencia

    const snapShot = await userRef.get(); //con esto extraigo el objeto SnapshotObject de la ref.

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {

        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    
    return userRef;
  };

  


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;