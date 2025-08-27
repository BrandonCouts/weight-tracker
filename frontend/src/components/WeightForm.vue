<script setup>
import { ref, computed } from 'vue';
import api from '../api';
import { useUserStore } from '../store/user';
const weight = ref('');
const note = ref('');
const emit = defineEmits(['saved']);
const userStore = useUserStore();
const unitLabel = computed(() => (userStore.info?.units === 'imperial' ? 'lbs' : 'kg'));
async function submit() {
  const w = userStore.info?.units === 'imperial' ? weight.value / 2.20462 : weight.value;
  await api.post('/weights', { weight: w, note: note.value });
  weight.value = '';
  note.value = '';
  emit('saved');
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="weight" type="number" step="0.1" :placeholder="`Weight (${unitLabel})`" />
    <input v-model="note" placeholder="Note" />
    <button type="submit">Add</button>
  </form>
</template>
