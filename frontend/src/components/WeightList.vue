<script setup>
import { onMounted, computed, ref } from 'vue';
import Modal from './Modal.vue';
import { useWeightStore } from '../store/weights';
import { useUserStore } from '../store/user';
const store = useWeightStore();
const userStore = useUserStore();
onMounted(() => {
  store.fetchWeights();
  if (!userStore.info) userStore.fetch();
});
const formatDate = d => new Date(d).toLocaleDateString();
const unitLabel = computed(() => (userStore.info?.units === 'imperial' ? 'lbs' : 'kg'));
const displayWeight = w =>
  userStore.info?.units === 'imperial' ? (w * 2.20462).toFixed(1) : w;

function arrowFor(index) {
  const prev = store.weights[index + 1];
  if (!prev) return '';
  const diff = store.weights[index].weight - prev.weight;
  if (diff > 0) return '↑';
  if (diff < 0) return '↓';
  return '→';
}

const editing = ref(null);
const editWeight = ref('');

function startEdit(entry) {
  editing.value = entry;
  editWeight.value = displayWeight(entry.weight);
}

function saveEdit() {
  if (!editing.value) return;
  const w =
    userStore.info?.units === 'imperial' ? parseFloat(editWeight.value) / 2.20462 : Number(editWeight.value);
  store.updateWeight(editing.value.id, w);
  editing.value = null;
}

function cancelEdit() {
  editing.value = null;
}

function remove(id) {
  if (confirm('Delete entry?')) {
    store.removeWeight(id);
  }
}
</script>

<template>
  <Modal v-if="editing" @close="cancelEdit">
    <form @submit.prevent="saveEdit">
      <h3>Edit Weight</h3>
      <input type="number" step="0.1" v-model="editWeight" :placeholder="unitLabel" />
      <div class="actions">
        <button type="submit">Save</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </div>
    </form>
  </Modal>
  <ul>
    <li v-for="(entry, index) in store.weights" :key="entry.id" class="list-item">
      <span>
        {{ formatDate(entry.entry_date) }} - {{ displayWeight(entry.weight) }} {{ unitLabel }}
        <span v-if="arrowFor(index)" class="trend">{{ arrowFor(index) }}</span>
      </span>
      <span class="actions">
        <button @click="startEdit(entry)">Edit</button>
        <button @click="remove(entry.id)">Delete</button>
      </span>
    </li>
  </ul>
</template>
