<script setup>
import { ref, watch } from 'vue';
import api from '../api';
import { useFoodItemStore } from '../store/foodItems';
const query = ref('');
const selected = ref(null);
const servings = ref(1);
const itemStore = useFoodItemStore();
const emit = defineEmits(['saved']);
watch(query, async q => {
  if (q.length > 1) {
    await itemStore.search(q);
  } else {
    itemStore.items = [];
  }
});
function selectItem(item) {
  selected.value = item;
  query.value = item.name;
  itemStore.items = [];
}
async function submit() {
  if (!selected.value) {
    return;
  }
  await api.post('/foods', { food_item_id: selected.value.id, servings: servings.value });
  query.value = '';
  selected.value = null;
  servings.value = 1;
  emit('saved');
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="query" placeholder="Search food" />
    <ul v-if="itemStore.items.length">
      <li v-for="item in itemStore.items" :key="item.id" @click="selectItem(item)">
        {{ item.name }} ({{ item.calories }} cal/{{ item.serving_size }}{{ item.serving_unit }})
      </li>
    </ul>
    <div v-if="selected">
      <input v-model="servings" type="number" step="0.01" min="0" />
      <button type="submit">Add</button>
    </div>
  </form>
</template>
