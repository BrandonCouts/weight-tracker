<script setup>
import { onMounted } from 'vue';
import { useFoodStore } from '../store/foods';
const store = useFoodStore();
onMounted(() => store.fetchFoods());
</script>

<template>
  <ul>
    <li v-for="item in store.foods" :key="item.id">
      {{ item.consumed_at }} - {{ item.name }} ({{ item.calories }} cal, {{ item.servings }} serving{{ item.servings > 1 ? 's' : '' }})
    </li>
  </ul>
</template>
