<script setup></script>

<template>
  <div class="relative h-full w-full flex overflow-hidden transition-all-300">
    <div>2323</div>
    <main
      class="z-55 flex flex-1 flex-grow flex-col transition-all-200 items-center overflow-auto p-4"
    >
      <RouterView v-slot="{ Component, route }">
        <KeepAlive>
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>

<style scoped></style>
