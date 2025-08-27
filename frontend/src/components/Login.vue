<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
const username = ref('');
const password = ref('');
const router = useRouter();
async function login() {
  const res = await api.post('/auth/login', { username: username.value, password: password.value });
  localStorage.setItem('token', res.data.token);
  window.dispatchEvent(new Event('token-changed'));
  try {
    const { data } = await api.get('/user');
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(data.theme || 'light');
    localStorage.setItem('theme', data.theme || 'light');
  } catch (e) {}
  router.push('/dashboard');
}
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
  <router-link to="/register">Register</router-link>
</template>
