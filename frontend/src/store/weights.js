import { defineStore } from 'pinia';
import api from '../api';

export const useWeightStore = defineStore('weights', {
  state: () => ({ weights: [] }),
  actions: {
    async fetchWeights() {
      const res = await api.get('/weights');
      this.weights = res.data;
    }
  }
});
