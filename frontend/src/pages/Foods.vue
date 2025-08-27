<script setup>
import { ref, computed, onMounted } from 'vue';
import FoodForm from '../components/FoodForm.vue';
import FoodList from '../components/FoodList.vue';
import { useFoodStore } from '../store/foods';

const store = useFoodStore();
const selectedDate = ref(new Date().toISOString().split('T')[0]);
function refresh() {
  store.fetchFoods(selectedDate.value);
}
function changeDay(delta) {
  const d = new Date(selectedDate.value);
  d.setDate(d.getDate() + delta);
  selectedDate.value = d.toISOString().split('T')[0];
  refresh();
}
const isToday = computed(() => selectedDate.value === new Date().toISOString().split('T')[0]);
const formattedDate = computed(() => new Date(selectedDate.value).toLocaleDateString());
onMounted(refresh);
</script>

<template>
  <div>
    <div class="date-nav">
      <button @click="changeDay(-1)">Prev</button>
      <span>{{ formattedDate }}</span>
      <button @click="changeDay(1)" :disabled="isToday">Next</button>
    </div>
    <div>Total: {{ store.totalCalories }} cal</div>
    <div>Remaining: {{ store.remainingCalories }} cal</div>
    <FoodForm @saved="refresh" />
    <FoodList />
  </div>
</template>
