import { defineStore } from 'pinia';
import api from '../api';

export const useUserStore = defineStore('user', {
  state: () => ({ info: null }),
  actions: {
    async fetch() {
      const res = await api.get('/user');
      this.info = res.data;
    },
    setUnits(units) {
      if (this.info) {
        this.info.units = units;
      } else {
        this.info = { units };
      }
    }
  }
});
