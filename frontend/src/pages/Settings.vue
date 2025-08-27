<script setup>
import { reactive, onMounted } from 'vue';
import api from '../api';

const form = reactive({
  height_in: 0,
  is_male: 0,
  calories_to_cut: 0,
  theme: 'light'
});

onMounted(async () => {
  const { data } = await api.get('/user');
  form.height_in = data.height_in;
  form.is_male = data.is_male;
  form.calories_to_cut = data.calories_to_cut;
  form.theme = data.theme || 'light';
});

function toggleTheme() {
  form.theme = form.theme === 'light' ? 'dark' : 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(form.theme);
  localStorage.setItem('theme', form.theme);
}

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
      <div>
        <button type="button" @click="toggleTheme">{{ form.theme === 'light' ? 'Dark' : 'Light' }} Mode</button>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>
