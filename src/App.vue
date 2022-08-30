<template>
  <router-view />
</template>

<script setup>
import { useAuth } from "stores/auth";

// check auth
const authStore = useAuth()
authStore.checkAuth()
</script>
