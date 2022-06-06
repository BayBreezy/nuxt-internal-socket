<template>
  <div>Nuxt module playground!</div>
</template>

<script setup>
const { $io } = useNuxtApp();

onMounted(() => {
  $io.on("connect", () => {
    console.log("connected", $io.id);
  });
  $io.on("user disconnected", function (data) {
    alert(`${data} got disconnected`);
  });
});
</script>
