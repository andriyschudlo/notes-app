import { defineStore } from 'pinia'
import { reactive } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/js/firebase.js'
import { useRouter } from 'vue-router'
import { useNotesStore } from './storeNotes';

export const useStoreAuth = defineStore('storeAuth', () => {
  const notesStore = useNotesStore()
  let usr = reactive({})
  const router = useRouter()
  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    console.log('error message: ', error.message)
  })
  },

  init = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        usr.id = user.uid,
        usr.email = user.email
        router.push('/')
       console.log('Користувач: ', usr)
      } else {
        usr = {}
        router.replace('/auth')
        console.log('logout', usr)
      }
    })
  },
  loginUser = (credentials) => {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      const user = userCredential.user
      // console.log('user: ', user)
    })
    .catch((error) => {
      // console.log('error.message', error.message)
    })
  },
  logOut = () => {
    signOut(auth).then(() => {
      // console.log('sign-out successful')
    }).catch((error) => {
      // console.log('error message: ', error.message)
    })
  }

  return {
  registerUser, loginUser, logOut, init, usr
  }
})