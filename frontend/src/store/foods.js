import { defineStore } from 'pinia';
import api from '../api';

export const useFoodStore = defineStore('foods', {
  state: () => ({ foods: [] }),
  actions: {
    async fetchFoods() {
      const res = await api.get('/foods');
      this.foods = res.data;
    }
  }
});
