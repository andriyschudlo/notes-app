import { createRouter, createWebHashHistory} from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: ViewNotes
    },
    {
      path: '/editNote/:id',
      name: 'editNote',
      component: ViewEditNote
    },
    {
      path: '/stats',
      name: 'stats',
      component: ViewStats
    },
    {
      path: '/auth',
      name: 'auth',
      component: ViewAuth

    },
  ]
})