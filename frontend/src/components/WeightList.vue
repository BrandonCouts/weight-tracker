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
</script>

<template>
  <ul>
    <li v-for="entry in store.weights" :key="entry.id">
      {{ formatDate(entry.entry_date) }} - {{ displayWeight(entry.weight) }} {{ unitLabel }}
    </li>
  </ul>
</template>
