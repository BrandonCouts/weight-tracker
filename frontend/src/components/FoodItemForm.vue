<script setup>
import { ref } from 'vue';
import { useFoodItemStore } from '../store/foodItems';
const store = useFoodItemStore();
const form = ref({
  name: '',
  serving_size: '',
  serving_unit: '',
  calories: '',
  fat: '',
  saturated_fat: '',
  trans_fat: '',
  cholesterol: '',
  sodium: '',
  carbohydrates: '',
  fiber: '',
  sugar: '',
  protein: ''
});
async function submit() {
  await store.create(form.value);
  Object.keys(form.value).forEach(k => (form.value[k] = ''));
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.serving_size" type="number" step="0.01" placeholder="Serving Size" />
    <input v-model="form.serving_unit" placeholder="Unit" />
    <input v-model="form.calories" type="number" step="0.01" placeholder="Calories" />
    <input v-model="form.fat" type="number" step="0.01" placeholder="Fat" />
    <input v-model="form.saturated_fat" type="number" step="0.01" placeholder="Saturated Fat" />
    <input v-model="form.trans_fat" type="number" step="0.01" placeholder="Trans Fat" />
    <input v-model="form.cholesterol" type="number" step="0.01" placeholder="Cholesterol" />
    <input v-model="form.sodium" type="number" step="0.01" placeholder="Sodium" />
    <input v-model="form.carbohydrates" type="number" step="0.01" placeholder="Carbs" />
    <input v-model="form.fiber" type="number" step="0.01" placeholder="Fiber" />
    <input v-model="form.sugar" type="number" step="0.01" placeholder="Sugar" />
    <input v-model="form.protein" type="number" step="0.01" placeholder="Protein" />
    <button type="submit">Save</button>
  </form>
</template>
