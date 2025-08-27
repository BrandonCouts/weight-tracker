<script setup>
import { useFoodStore } from '../store/foods';
const store = useFoodStore();
</script>

<template>
  <ul>
    <li v-for="item in store.foods" :key="item.id">
      {{ item.name }} ({{ item.calories }} cal, {{ item.servings }} serving{{ item.servings > 1 ? 's' : '' }})
    </li>
  </ul>
</template>
