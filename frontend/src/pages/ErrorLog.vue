<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';

const log = ref('');

onMounted(async () => {
  const res = await api.get('/errors');
  log.value = res.data;
});
</script>

<template>
  <pre>{{ log }}</pre>
</template>
