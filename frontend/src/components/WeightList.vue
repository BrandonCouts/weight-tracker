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

function arrowFor(index) {
  const prev = store.weights[index + 1];
  if (!prev) return '';
  const diff = store.weights[index].weight - prev.weight;
  if (diff > 0) return '↑';
  if (diff < 0) return '↓';
  return '→';
}

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
    <li v-for="(entry, index) in store.weights" :key="entry.id" class="list-item">
      <span>
        {{ formatDate(entry.entry_date) }} - {{ displayWeight(entry.weight) }} {{ unitLabel }}
        <span v-if="arrowFor(index)" class="trend">{{ arrowFor(index) }}</span>
      </span>
      <span class="actions">
        <button @click="edit(entry)">Edit</button>
        <button @click="remove(entry.id)">Delete</button>
      </span>
    </li>
  </ul>
</template>
