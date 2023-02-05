import { defineStore } from 'pinia'
import { reactive, ref } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase.js'
import { useRouter } from 'vue-router'
import { useNotesStore } from './notesStore';

export const useAuthStore = defineStore('authStore', () => {
  const notesStore = useNotesStore()
  
  let usr = ref({})
  const errorLogin = ref(false)
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
        usr.value.id = user.uid,
        usr.value.email = user.email
        console.log('init-signIn', user)
        notesStore.init()
        console.log('MY user :', usr.value)
        router.push('/')
        isUsrSignedin.value = true
      } else {
        usr.value = {}
        router.replace('/auth')
        console.log('init-signOut', user)
        isUsrSignedin.value = false
        notesStore.clearNotes()
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
      errorLogin.value = true
      setTimeout(() => {
        errorLogin.value = false
      }, 4000);
      console.log('error.message', error.message)

    })
  },
  logoutUser = () => {
    signOut(auth).then(() => {
      console.log('logOut-signeout')
      isUsrSignedin.value = false
      console.log('userIn: ', isUsrSignedin.value)
    }).catch((error) => {
      console.log('error message: ', error.message)
    })
  }

  return {
  registerUser, loginUser, errorLogin, logoutUser, init, usr, isUsrSignedin
  }
})