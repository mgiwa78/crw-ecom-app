import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  signOut,
  signInWithCredential,
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHS41gvS7XrqqptSG-63_8o89U7B7ahdo",
  authDomain: "crn-db-app.firebaseapp.com",
  projectId: "crn-db-app",
  storageBucket: "crn-db-app.appspot.com",
  messagingSenderId: "253952777132",
  appId: "1:253952777132:web:69a16c27a7b5f0c5e8b809",
  measurementId: "G-1VYDMRF2T1",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  console.log("collectionref", collectionRef);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    console.log("docref", docRef);

    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());

  // .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();

  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

export const signUserOut = () => signOut(auth);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  console.log(userAuth);
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);

  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating data", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const userRef = await createUserWithEmailAndPassword(auth, email, password);
  return userRef;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
