<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
const username = ref('');
const password = ref('');
const height = ref('');
const isMale = ref(1);
const router = useRouter();
async function register() {
  await api.post('/auth/register', {
    username: username.value,
    password: password.value,
    height_in: height.value,
    is_male: isMale.value
  });
  router.push('/login');
}
</script>

<template>
  <form @submit.prevent="register">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model.number="height" type="number" placeholder="Height (inches)" />
    <select v-model.number="isMale">
      <option :value="1">Male</option>
      <option :value="0">Female</option>
    </select>
    <button type="submit">Register</button>
  </form>
</template>
