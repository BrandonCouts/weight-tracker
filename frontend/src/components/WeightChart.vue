<script setup>
import { computed } from 'vue';
import { useWeightStore } from '../store/weights';
import { useUserStore } from '../store/user';

const weightStore = useWeightStore();
const userStore = useUserStore();
const width = 400;
const height = 200;

const points = computed(() => {
  const data = [...weightStore.weights].reverse();
  if (!data.length) return '';
  const values = data.map(w => (userStore.info?.units === 'imperial' ? w.weight * 2.20462 : w.weight));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1 || 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');
});
</script>

<template>
  <div v-if="weightStore.weights.length">
    <svg :width="width" :height="height">
      <polyline :points="points" fill="none" stroke="blue" stroke-width="2" />
    </svg>
  </div>
</template>
