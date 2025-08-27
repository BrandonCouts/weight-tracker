<script setup>
import { reactive, onMounted } from 'vue';
import api from '../api';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const form = reactive({
  height: 0,
  is_male: 0,
  calories_to_cut: 0,
  theme: 'light',
  units: 'scientific'
});

onMounted(async () => {
  if (!userStore.info) {
    await userStore.fetch();
  }
  const data = userStore.info;
  form.height = data.units === 'imperial' ? data.height_in : data.height_in * 2.54;
  form.is_male = data.is_male;
  form.calories_to_cut = data.calories_to_cut;
  form.theme = data.theme || 'light';
  form.units = data.units || 'scientific';
});

function toggleTheme() {
  form.theme = form.theme === 'light' ? 'dark' : 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(form.theme);
  localStorage.setItem('theme', form.theme);
}

async function save() {
  const payload = {
    height_in: form.units === 'imperial' ? form.height : form.height / 2.54,
    is_male: form.is_male,
    calories_to_cut: form.calories_to_cut,
    theme: form.theme,
    units: form.units
  };
  await api.put('/user', payload);
  userStore.setUnits(form.units);
}
</script>

<template>
  <div>
    <h2>User Settings</h2>
    <form @submit.prevent="save">
      <label>
        Units:
        <select v-model="form.units">
          <option value="imperial">Imperial</option>
          <option value="scientific">Scientific</option>
        </select>
      </label>
      <label>
        Height ({{ form.units === 'imperial' ? 'in' : 'cm' }}):
        <input type="number" v-model.number="form.height" />
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
