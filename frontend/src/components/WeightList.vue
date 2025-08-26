<script setup>
import { onMounted } from 'vue';
import { useWeightStore } from '../store/weights';
const store = useWeightStore();
onMounted(() => store.fetchWeights());
</script>

<template>
  <ul>
    <li v-for="entry in store.weights" :key="entry.id">
      {{ entry.entry_date }} - {{ entry.weight }} kg
    </li>
  </ul>
</template>
