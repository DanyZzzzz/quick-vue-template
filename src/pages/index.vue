<template>
  this is index page
  <RouterView />
  <RouterLink to="/login">
    <NButton class="block"> to login </NButton>
  </RouterLink>
  <RouterLink to="/test"> <NButton class="mt-4">to test</NButton></RouterLink>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
