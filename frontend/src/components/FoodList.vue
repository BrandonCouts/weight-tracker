<script setup>
import { useFoodStore } from '../store/foods';
const store = useFoodStore();

function edit(item) {
  const name = prompt('Name', item.name);
  if (name === null) return;
  const caloriesInput = prompt('Calories', item.calories);
  if (caloriesInput === null) return;
  const servingsInput = prompt('Servings', item.servings);
  if (servingsInput === null) return;
  store.updateFood(item.id, {
    name,
    calories: Number(caloriesInput),
    servings: Number(servingsInput)
  });
}

function remove(id) {
  if (confirm('Delete food?')) {
    store.removeFood(id);
  }
}
</script>

<template>
  <ul>
    <li v-for="item in store.foods" :key="item.id" class="list-item">
      <span>
        {{ item.name }} ({{ item.calories }} cal, {{ item.servings }} serving{{ item.servings > 1 ? 's' : '' }})
      </span>
      <span class="actions">
        <button @click="edit(item)">Edit</button>
        <button @click="remove(item.id)">Delete</button>
      </span>
    </li>
  </ul>
</template>
