<script setup>
import { ref } from 'vue';

const theme = ref(document.body.classList.contains('dark') ? 'dark' : 'light');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme.value);
  localStorage.setItem('theme', theme.value);
}
</script>

<template>
  <div>
    <nav>
      <router-link to="/dashboard">Weights</router-link>
      <router-link to="/foods">Foods</router-link>
      <router-link to="/food-items">Food Items</router-link>
      <router-link to="/settings">Settings</router-link>
      <button @click="toggleTheme">{{ theme === 'light' ? 'Dark' : 'Light' }} Mode</button>
    </nav>
    <router-view />
  </div>
</template>
