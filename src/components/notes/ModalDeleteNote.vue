<template>
  <div class='modal is-active px-5'>
  <div class='modal-background '></div>
  <div class='modal-card' ref='modalRef'>
    <header class='modal-card-head'>
      <p class='modal-card-title'>Delete Note?</p>
      <button
        class='delete'
        aria-label='close'
        @click='closeModal'
      >
      </button>
    </header>
    <section class='modal-card-body'>
      <!-- Content ... -->
     <div class='is-size-5'>Are you shure you want to delete this note?</div> 
    </section>
    <footer class='modal-card-foot is-justify-content-flex-end'>
      <button
        class='button'
        @click='closeModal'
      >
      Cancel</button>
      <button
        class='button is-danger'
        @click='deleteNote'
      >
      Delete</button>
    </footer>
  </div>
</div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import { onClickOutside } from '@vueuse/core'
const notesStore = useNotesStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
const modalRef = ref(null)

const deleteNote = () => notesStore.deleteNote(props.noteId)
const closeModal = () => emit('update:modelValue', false)
onClickOutside(modalRef, closeModal)

const handleKeyPress = e => {
  if(e.key === 'Escape')
  closeModal()
}
onMounted(() => {
  document.addEventListener('keyup', handleKeyPress)
})
onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyPress)
})
</script>
