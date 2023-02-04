<template>
  <div class="card mb-3">
      <div class="card-content">
        <div class="content">
         {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-5 ">
         <small class="column">{{ dateFormatted }}</small>
         <small class="column has-text-right">{{ characterLength }}</small>
         </div>
        </div>
      </div>
      <footer class="card-footer">
        <RouterLink :to="`/editNote/${note.id}`" class="card-footer-item">Edit</RouterLink>
        <a
          @click.prevent="modals.delete = true"
          class="card-footer-item"
        >
        Delete</a>
      </footer>
      <ModalDeleteNote 
      v-if="modals.delete"
      v-model="modals.delete"
      :noteId="note.id"
      />
    </div>
</template>

<script setup>
/* imports */
import ModalDeleteNote from './ModalDeleteNote.vue'
import {useNotesStore} from '@/stores/storeNotes.js'
import { useDateFormat } from '@vueuse/core'
import {computed, reactive } from 'vue'
const notesStore = useNotesStore()
/* props */
  const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })

  const modals = reactive({
    delete: false
  })

  /* computed */
  const characterLength = computed(() =>{
    let length = props.note.content.length
    let description = length > 1 ? 'characters' : 'character'
    return length + ' ' + description
  })

  const dateFormatted = computed(() => {
    let date = new Date(Number(props.note.date))
    let formattedDate = useDateFormat(date, 'HH:mm, DD.MM.YY')
    return formattedDate.value
  })
</script> 

<style scoped>

</style>