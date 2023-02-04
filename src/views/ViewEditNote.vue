<template>
  <div class="edit-note">
    <AddEditNote
    placeholder="edit text"
    v-model="noteContent"
    bg-color="warning"
    label="Edit note"
    label-class="title is-5 has-text-warning-dark"
    >
      <template v-slot:buttons>
        <button
          @click="back"
          class="button has-text-warning has-background-warning-light"
        >
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button has-text-white has-background-warning-dark ml-2"
          :disabled="!noteContent"
        >
          Save note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
  import AddEditNote from '../components/notes/AddEditNote.vue';
  import { useNotesStore } from '@/stores/storeNotes'
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue';
  
  const route = useRoute()
  const router = useRouter()
  const back = () => {
    router.push('/')
  }
  const notesStore = useNotesStore()
  const noteContent = ref('')
  
  const handleSaveClicked = () => {
    notesStore.updateNote(route.params.id, noteContent.value)
    router.push('/')
  }
  noteContent.value = notesStore.getNoteContent(route.params.id)
</script>

<style scoped>

</style>