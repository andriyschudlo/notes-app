<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stats</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ notesStore.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ notesStore.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>
    <div class="control">
    <label for="inp">Tell us about your expressions (Max {{ maxTextLength }} characters)</label>
      <input
        class="input"
        name="inp"
        placeholder="Do you like Notes App?"
        v-autofocus
        v-model="reviewText"
        type="text"
      />
    </div>
  </div>
</template>

<script setup>
import { useNotesStore } from "@/stores/storeNotes.js";
import { ref } from 'vue'
import { vAutofocus } from "../directives/vAutofocus";
import {useWatchCharacters } from '@/use/useWatchCharacters.js'

const reviewText = ref('')
const notesStore = useNotesStore();
const maxTextLength = 30
useWatchCharacters(reviewText, maxTextLength)
</script>

<style scoped></style>
