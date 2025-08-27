<script setup>
import FoodForm from '../components/FoodForm.vue';
import FoodList from '../components/FoodList.vue';
import { useFoodStore } from '../store/foods';
const store = useFoodStore();
function refresh() {
  store.fetchFoods();
}
</script>

<template>
  <div>
    <FoodForm @saved="refresh" />
    <FoodList />
  </div>
</template>
