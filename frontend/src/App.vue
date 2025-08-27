<script setup>
import { ref, computed } from 'vue';

const theme = ref(document.body.classList.contains('dark') ? 'dark' : 'light');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme.value);
  localStorage.setItem('theme', theme.value);
}

const token = ref(localStorage.getItem('token'));

window.addEventListener('token-changed', () => {
  token.value = localStorage.getItem('token');
});

const isAdmin = computed(() => {
  if (!token.value) return false;
  try {
    const payload = JSON.parse(atob(token.value.split('.')[1]));
    return payload.role === 'admin';
  } catch (e) {
    return false;
  }
});
</script>

<template>
  <div>
    <nav>
      <router-link to="/dashboard">Weights</router-link>
      <router-link to="/foods">Foods</router-link>
      <router-link to="/food-items">Food Items</router-link>
      <router-link to="/settings">Settings</router-link>
      <router-link to="/errors" v-if="isAdmin">Error Log</router-link>
      <button @click="toggleTheme">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</button>
    </nav>
    <router-view />
  </div>
</template>
