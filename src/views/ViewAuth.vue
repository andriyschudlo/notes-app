<template>
  <div class='tabs is-centered'>
    <ul>
      <li @click='register = false' :class="{ 'is-active': !register }">
        <a>Login</a>
      </li>
      <li @click='register = true' :class="{ 'is-active': register }">
        <a>Register</a>
      </li>
    </ul>
  </div>
  <div class='card auth'>
    <div class='card-content'>
      <div class='title has-text-centered'>{{ authTitle }}</div>
      <form @submit='onSubmit'>
        <div class='field'>
          <label class='lagel'>Email</label>
          <div class='control'>
            <input v-model='credentials.email' class='input' type='email' />
          </div>
        </div>
        <div class='field'>
          <label class='lagel'>Password</label>
          <div class='control'>
            <input v-model='credentials.password' class='input' type='password' />
          </div>
        </div>

        <div class='field is-grouped is-flex is-justify-content-space-between'>
        <div class='control'>
          <a
          v-show='!register'
          @click.prevent='register=true'
            class='is-size-6'
          >
          Haven't account yet? Register!</a>
        </div>
          <div class='control'>
            <button class='button is-primary'>{{ authTitle }}</button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useStoreAuth } from '../stores/storeAuth'

const storeAuth = useStoreAuth()
const register = ref(false);
const authTitle = computed(() => (register.value ? 'Register' : 'Login'));
const onSubmit = () => {
  if (!credentials.email || !credentials.password)
    alert('To Login you must provide your credentials!')
  else {
    if (register.value) {
      storeAuth.registerUser(credentials)
    } else {
      storeAuth.loginUser(credentials)
    }
  }
  // credentials.email = ''
  // credentials.password = ''
};
const credentials = reactive({
  email: '',
  password: ''
});
</script>

<style scoped>
.auth {
  max-width: 30em;
  margin: 0 auto;
}
</style>
