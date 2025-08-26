<script setup>
import WeightForm from '../components/WeightForm.vue';
import WeightList from '../components/WeightList.vue';
import { useWeightStore } from '../store/weights';
const store = useWeightStore();
function refresh() {
  store.fetchWeights();
}
</script>

<template>
  <div>
    <WeightForm @saved="refresh" />
    <WeightList />
  </div>
</template>
