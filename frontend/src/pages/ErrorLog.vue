<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';

const log = ref('');

const fetchLog = async () => {
  const res = await api.get('/errors');
  log.value = res.data;
};

const clearLog = async () => {
  await api.delete('/errors');
  await fetchLog();
};

onMounted(fetchLog);
</script>

<template>
  <div>
    <button @click="clearLog">Clear Log</button>
    <pre>{{ log }}</pre>
  </div>
</template>
