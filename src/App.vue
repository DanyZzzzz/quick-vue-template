<script setup>
import { dateZhCN, zhCN } from "naive-ui";
import NProvider from "./NProvider.vue";
</script>

<template>
  <NConfigProvider :date-locale="dateZhCN" :locale="zhCN" class="h-full">
    <NProvider>
      <RouterView />
    </NProvider>
  </NConfigProvider>
</template>
