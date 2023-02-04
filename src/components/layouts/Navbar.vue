<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <div class="navbar-item is-size-3 is-family-monospace"> Notes App </div>
        <small
          v-if="$route.path !== '/auth'"
          class="p-5"
        >
        signedin @{{ storeAuth.usr.email }}</small>
        <small
          v-else
          class="p-5"
        >
        signedOut</small>
        <a
          @click.prevent="showBurger = !showBurger"
          :class="['navbar-burger', {'is-active': showBurger}]"
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
          ref="burgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        :class="['navbar-menu', {'is-active': showBurger}]"
        @click="showBurger=false"
        ref="menuRef"
      >
        <div class="navbar-end">
          <RouterLink class="navbar-item" active-class="is-active" to="/">
            Notes</RouterLink
          >

          <RouterLink class="navbar-item" active-class="is-active" to="/stats">
            Stats</RouterLink
          >
          <RouterLink
            v-if="$route.path !== '/auth'"
            class="navbar-item"
            active-class="is-active"
            to="/auth"
          ><a 
            @click="storeAuth.logOut"
          >
          Logout</a>
            </RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import { onClickOutside } from '@vueuse/core'

const storeAuth = useStoreAuth()

const showBurger = ref(false),
menuRef = ref(null),
burgerRef = ref(null)

onClickOutside(menuRef, () => showBurger.value=false, { ignore: [burgerRef]} )
</script>

<style scoped>
@media (max-width: 1023px){
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
