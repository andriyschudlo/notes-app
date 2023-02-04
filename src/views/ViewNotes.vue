<template>
  <div class='notes'>
    <AddEditNote
    @keydown.enter.prevent='addNote'
    v-model='noteText'
    ref='addEditNoteRef'
    :placeholder='`Max text length is: ${maxTextLength} characters`'
    >
      <template v-slot:buttons>
        <button
          :disabled='!noteText'
          @click='addNote'
          class='button is-success'
          
        >
          Add note
        </button>
      </template>
    </AddEditNote>

    <progress
      v-if='notesStore.loader'
      class='progress is-small is-primary'
      max='100'
    />

    <!--NOTES-->
    <template v-else>
    <Note
      v-for='note in notesStore.notes'
      :key='note.id'
      :note='note'
    />
    </template>

    <div
      v-if='!notesStore.notes.length'
      class='has-text-centered has-text-grey-light is-size-4 mt-6 pt-5 is-family-monospace'
    >
    No notes here yet...
    </div>
  </div>
</template>

<script setup>
import Note from '../components/notes/Note.vue'
import AddEditNote from '../components/notes/AddEditNote.vue'
import {useWatchCharacters } from '@/use/useWatchCharacters.js'
import { ref, onMounted} from 'vue'
import { useNotesStore } from '@/stores/storeNotes.js'
// import { useStoreAuth } from '../stores/storeAuth'

const notesStore = useNotesStore()
// const storeAuth = useStoreAuth()

onMounted(() => notesStore.getNotes())
const noteText = ref('')
const addEditNoteRef = ref(null)

const addNote = () => {
  if(noteText.value.length > 5){
  notesStore.addNote(noteText.value)
  noteText.value = ''
  addEditNoteRef.value.focusTexarea()  
  }}
  const maxTextLength = 100
  useWatchCharacters(noteText, maxTextLength)
 
</script>

<style scoped></style>
