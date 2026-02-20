<script setup>
import { getDashboardData } from '@/api/dashboard';
import { onMounted } from 'vue';
onMounted(()=>{
  getDashboardData()
})
</script>
<template>
  <div>Dashboard</div>
</template>