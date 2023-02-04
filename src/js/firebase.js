// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCN0B1FsRtBCJRNrcXP9d2HoUERU7dYDlU',
  authDomain: 'notes-app-b2669.firebaseapp.com',
  projectId: 'notes-app-b2669',
  storageBucket: 'notes-app-b2669.appspot.com',
  messagingSenderId: '526558902085',
  appId: '1:526558902085:web:aead79b2a32bb0141c302c'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}