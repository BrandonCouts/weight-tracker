import { defineStore } from 'pinia';
import api from '../api';

export const useFoodItemStore = defineStore('foodItems', {
  state: () => ({ items: [] }),
  actions: {
    async search(q) {
      const res = await api.get('/food-items', { params: { q } });
      this.items = res.data;
    },
    async create(data) {
      await api.post('/food-items', data);
    }
  }
});
