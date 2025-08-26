<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
const username = ref('');
const password = ref('');
const router = useRouter();
async function login() {
  await api.post('/auth/login', { username: username.value, password: password.value });
  router.push('/dashboard');
}
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>
