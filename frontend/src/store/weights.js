import { defineStore } from 'pinia';
import api from '../api';

export const useWeightStore = defineStore('weights', {
  state: () => ({ weights: [] }),
  actions: {
    async fetchWeights() {
      const res = await api.get('/weights');
      this.weights = res.data;
    },
    async updateWeight(id, weight) {
      await api.put(`/weights/${id}`, { weight });
      await this.fetchWeights();
    },
    async removeWeight(id) {
      await api.delete(`/weights/${id}`);
      await this.fetchWeights();
    }
  }
});
