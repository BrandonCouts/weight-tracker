<script setup>
import { ref } from 'vue';
import api from '../api';
const weight = ref('');
const note = ref('');
const emit = defineEmits(['saved']);
async function submit() {
  await api.post('/weights', { weight: weight.value, note: note.value });
  weight.value = '';
  note.value = '';
  emit('saved');
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="weight" placeholder="Weight" />
    <input v-model="note" placeholder="Note" />
    <button type="submit">Add</button>
  </form>
</template>
