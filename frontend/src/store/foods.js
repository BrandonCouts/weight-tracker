import { defineStore } from 'pinia';
import api from '../api';

export const useFoodStore = defineStore('foods', {
  state: () => ({ foods: [], totalCalories: 0, remainingCalories: 0, currentDate: null }),
  actions: {
    async fetchFoods(date) {
      const res = await api.get('/foods', { params: { date } });
      this.foods = res.data.foods;
      this.totalCalories = res.data.totalCalories;
      this.remainingCalories = res.data.remainingCalories;
      this.currentDate = date;
    },
    async updateFood(id, updates) {
      await api.put(`/foods/${id}`, updates);
      await this.fetchFoods(this.currentDate);
    },
    async removeFood(id) {
      await api.delete(`/foods/${id}`);
      await this.fetchFoods(this.currentDate);
    }
  }
});
