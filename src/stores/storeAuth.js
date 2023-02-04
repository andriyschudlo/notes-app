import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/js/firebase.js'
import { useRouter } from 'vue-router'
import { useNotesStore } from './storeNotes';

export const useStoreAuth = defineStore('storeAuth', () => {
  const notesStore = useNotesStore()
  let usr = reactive({})
  let usrIn = ref(false)
  const router = useRouter()
  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
  .then((userCredential) => {
    const user = userCredential.user
  })
  .catch((error) => {
    console.log('error message: ', error.message)
  })
  }

  const init = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        usr.id = user.uid,
        usr.email = user.email
        console.log('init-signIn', user)
        router.push('/')
        usrIn.value = true
      } else {
        usr = {}
        router.replace('/auth')
        console.log('init-signOut', user)
        usrIn.value = false
      }
    })
  },
  loginUser = (credentials) => {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      const user = userCredential.user
      usrIn.value = true
      console.log('userIn: ', usrIn.value)
      // console.log('loginUser-signedIn')
      // console.log(user)
      // router.push('/')
    })
    .catch((error) => {
      // console.log('error.message', error.message)
    })
  },
  logoutUser = () => {
    signOut(auth).then(() => {
      // console.log('logOut-signout')
      usrIn.value = false
      console.log('userIn: ', usrIn.value)
    }).catch((error) => {
      // console.log('error message: ', error.message)
    })
  }

  return {
  registerUser, loginUser, logoutUser, init, usr, usrIn
  }
})