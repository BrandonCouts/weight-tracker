<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
const username = ref('');
const password = ref('');
const height = ref('');
const isMale = ref(1);
const units = ref('scientific');
const router = useRouter();
const heightLabel = computed(() => (units.value === 'imperial' ? 'inches' : 'cm'));
async function register() {
  const heightIn = units.value === 'imperial' ? height.value : height.value / 2.54;
  await api.post('/auth/register', {
    username: username.value,
    password: password.value,
    height_in: heightIn,
    is_male: isMale.value,
    units: units.value
  });
  router.push('/login');
}
</script>

<template>
  <form @submit.prevent="register">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <select v-model="units">
      <option value="imperial">Imperial</option>
      <option value="scientific">Scientific</option>
    </select>
    <input v-model.number="height" type="number" :placeholder="`Height (${heightLabel})`" />
    <select v-model.number="isMale">
      <option :value="1">Male</option>
      <option :value="0">Female</option>
    </select>
    <button type="submit">Register</button>
  </form>
  <div class="auth-note">
    Are you already a member? Click here to <router-link to="/login">login</router-link>?
  </div>
</template>
