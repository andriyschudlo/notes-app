import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { collection, onSnapshot, doc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from '@/js/firebase.js'
// import { useStoreAuth } from "./storeAuth"

export const useNotesStore = defineStore("notesStore", () => {
let notes = ref([])
const loader = ref(false)
const notesCollectionRef = collection(db,  'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

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
  loader.value = true
  onSnapshot(notesCollectionQuery, (querySnapshot) => {
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
  notes.value.forEach(i => count += i.content.length)
  return count
})

return { notes, addNote, deleteNote, 
  getNoteContent, updateNote, totalNotesCount, totalCharactersCount, getNotes, loader }
})