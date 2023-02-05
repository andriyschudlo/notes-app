import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/js/firebase.js'
import { useRouter } from 'vue-router'
import { useNotesStore } from './notesStore';

export const useAuthStore = defineStore('authStore', () => {
  const notesStore = useNotesStore()
  let usr = reactive({})
  let isUsrSignedin = ref(false)
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
        isUsrSignedin.value = true
      } else {
        usr = {}
        router.replace('/auth')
        console.log('init-signOut', user)
        isUsrSignedin.value = false
      }
    })
  },
  loginUser = (credentials) => {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      const user = userCredential.user
      isUsrSignedin.value = true
      console.log('userIn: ', isUsrSignedin.value)
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
      isUsrSignedin.value = false
      console.log('userIn: ', isUsrSignedin.value)
    }).catch((error) => {
      // console.log('error message: ', error.message)
    })
  }

  return {
  registerUser, loginUser, logoutUser, init, usr, isUsrSignedin
  }
})