<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
const username = ref('');
const password = ref('');
const router = useRouter();
async function register() {
  await api.post('/auth/register', { username: username.value, password: password.value });
  router.push('/login');
}
</script>

<template>
  <form @submit.prevent="register">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
</template>
