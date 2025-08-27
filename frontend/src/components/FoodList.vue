<script setup>
import { ref, reactive } from 'vue';
import Modal from './Modal.vue';
import { useFoodStore } from '../store/foods';
const store = useFoodStore();

const editing = ref(null);
const form = reactive({ name: '', calories: 0, servings: 1 });

function startEdit(item) {
  editing.value = item;
  form.name = item.name;
  form.calories = item.calories;
  form.servings = item.servings;
}

function saveEdit() {
  if (!editing.value) return;
  store.updateFood(editing.value.id, {
    name: form.name,
    calories: Number(form.calories),
    servings: Number(form.servings)
  });
  editing.value = null;
}

function cancelEdit() {
  editing.value = null;
}

function remove(id) {
  if (confirm('Delete food?')) {
    store.removeFood(id);
  }
}
</script>

<template>
  <Modal v-if="editing" @close="cancelEdit">
    <form @submit.prevent="saveEdit">
      <h3>Edit Food</h3>
      <input v-model="form.name" placeholder="Name" />
      <input type="number" v-model.number="form.calories" placeholder="Calories" />
      <input type="number" v-model.number="form.servings" placeholder="Servings" />
      <div class="actions">
        <button type="submit">Save</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </Modal>
  <ul>
    <li v-for="item in store.foods" :key="item.id" class="list-item">
      <span>
        {{ item.name }} ({{ item.calories }} cal, {{ item.servings }} serving{{ item.servings > 1 ? 's' : '' }})
      </span>
      <span class="actions">
        <button @click="startEdit(item)">Edit</button>
        <button @click="remove(item.id)">Delete</button>
      </span>
    </li>
  </ul>
</template>
