<script setup>
import { useLoginStore } from './stores/login'

useLoginStore()
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
