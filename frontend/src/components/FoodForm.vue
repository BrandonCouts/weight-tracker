<script setup>
import { ref } from 'vue';
import api from '../api';
const name = ref('');
const calories = ref('');
const emit = defineEmits(['saved']);
async function submit() {
  await api.post('/foods', { name: name.value, calories: calories.value });
  name.value = '';
  calories.value = '';
  emit('saved');
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="name" placeholder="Food" />
    <input v-model="calories" type="number" placeholder="Calories" />
    <button type="submit">Add</button>
  </form>
</template>
