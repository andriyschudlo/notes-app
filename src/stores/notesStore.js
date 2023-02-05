import { defineStore } from "pinia"
import { useAuthStore } from "./authStore"
import { ref, computed, toRef } from "vue"
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from '@/js/firebase.js'


export const useNotesStore = defineStore("notesStore", () => {
  const authStore = useAuthStore()
  const loader = ref(false)
  let notesCollectionRef,
  notesCollectionQuery
  let notes = ref([])
  let getNotesSnapshot = ref(null)
  const clearNotes = () => notes.value = {}

  const init = () => {
    
    notesCollectionRef = collection(db, 'users', authStore.usr.id, 'notes')
    notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
    getNotes()
  }
const getNotes = async() => {
//   const querySnapshot = await getDocs(collection(db, "notes"))
// querySnapshot.forEach((doc) => {
//   // console.log(`${doc.id} => ${doc.data()}`)
//   let note = {
//     id: doc.id,
//     content: doc.data().content
//   }
//   notes.value.push(note)
// })
if(getNotesSnapshot.value) getNotesSnapshot()
loader.value = true
  getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
    let updNotes = []
    querySnapshot.forEach((doc) => {
      let note = {
        id: doc.id,
        content: doc.data().content,
        date: doc.data().date
      }
      updNotes.push(note)
  })
        notes.value = updNotes
        loader.value = false
})
}

const addNote = async(newContent) => {
//   notes.value.unshift({
//   id: Math.random(),
//   content: newContent
// })
const currentDate = new Date().getTime()
const date = String(currentDate)
await addDoc(notesCollectionRef, {
  content: newContent,
  date
})
}

const updateNote = async(id, content) => {
  // const ind = notes.value.findIndex(i => i.id === id)
  // notes.value[ind].content = content  
  await updateDoc(doc(notesCollectionRef, id), {
    content
  })
}

const deleteNote = async(noteId) => {
  // notes.value = notes.value.filter(i => i.id !== noteId)
  await deleteDoc(doc(notesCollectionRef, noteId))
}

const getNoteContent = computed(() => (id) => {
 return notes.value.filter(i => i.id == id)[0].content
})

const totalNotesCount = computed(() => notes.value.length)

const totalCharactersCount = computed(() => {
  let count = 0
  if(notes.value.length)
  notes.value.forEach(i => count += i.content.length)
  return count
})

return { notes, clearNotes, init, addNote, deleteNote, 
  getNoteContent, updateNote, totalNotesCount, totalCharactersCount, getNotes, loader }
})