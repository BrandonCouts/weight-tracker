<script setup>
import { reactive, onMounted } from 'vue';
import api from '../api';

const form = reactive({
  height_in: 0,
  is_male: 0,
  calories_to_cut: 0
});

onMounted(async () => {
  const { data } = await api.get('/user');
  form.height_in = data.height_in;
  form.is_male = data.is_male;
  form.calories_to_cut = data.calories_to_cut;
});

async function save() {
  await api.put('/user', form);
}
</script>

<template>
  <div>
    <h2>User Settings</h2>
    <form @submit.prevent="save">
      <label>
        Height (in):
        <input type="number" v-model.number="form.height_in" />
      </label>
      <label>
        Gender:
        <select v-model.number="form.is_male">
          <option :value="1">Male</option>
          <option :value="0">Female</option>
        </select>
      </label>
      <label>
        Daily Calories to Cut:
        <input type="number" v-model.number="form.calories_to_cut" />
      </label>
      <button type="submit">Save</button>
    </form>
  </div>
</template>
