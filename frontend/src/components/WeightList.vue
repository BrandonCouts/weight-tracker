<script setup>
import { onMounted, computed } from 'vue';
import { useWeightStore } from '../store/weights';
import { useUserStore } from '../store/user';
const store = useWeightStore();
const userStore = useUserStore();
onMounted(() => {
  store.fetchWeights();
  if (!userStore.info) userStore.fetch();
});
const formatDate = d => new Date(d).toLocaleDateString();
const unitLabel = computed(() => (userStore.info?.units === 'imperial' ? 'lbs' : 'kg'));
const displayWeight = w =>
  userStore.info?.units === 'imperial' ? (w * 2.20462).toFixed(1) : w;

function edit(entry) {
  const input = prompt('Weight', displayWeight(entry.weight));
  if (input == null) return;
  const w =
    userStore.info?.units === 'imperial' ? parseFloat(input) / 2.20462 : Number(input);
  store.updateWeight(entry.id, w);
}

function remove(id) {
  if (confirm('Delete entry?')) {
    store.removeWeight(id);
  }
}
</script>

<template>
  <ul>
    <li v-for="entry in store.weights" :key="entry.id">
      {{ formatDate(entry.entry_date) }} - {{ displayWeight(entry.weight) }} {{ unitLabel }}
      <button @click="edit(entry)">Edit</button>
      <button @click="remove(entry.id)">Delete</button>
    </li>
  </ul>
</template>
