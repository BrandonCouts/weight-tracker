<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/user';

const token = ref(localStorage.getItem('token'));
const router = useRouter();
const userStore = useUserStore();

window.addEventListener('token-changed', () => {
  token.value = localStorage.getItem('token');
});

watch(
  token,
  async (newToken) => {
    if (newToken) {
      try {
        await userStore.fetch();
        const data = userStore.info;
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(data.theme || 'light');
        localStorage.setItem('theme', data.theme || 'light');
      } catch (e) {}
    }
  },
  { immediate: true }
);

function logout() {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('token-changed'));
  router.push('/login');
}

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
      <div class="container">
        <router-link to="/dashboard">Weights</router-link>
        <router-link to="/foods">Foods</router-link>
        <router-link to="/food-items">Food Items</router-link>
        <router-link to="/settings">Settings</router-link>
        <router-link to="/errors" v-if="isAdmin">Error Log</router-link>
        <button v-if="token" @click="logout">Logout</button>
      </div>
    </nav>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>
