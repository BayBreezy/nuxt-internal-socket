<template>
  <div>
    <h1>Nuxt module playground!</h1>
    <button @click="sendMessage">Click Me To Send Message</button>
  </div>
</template>

<script setup>
const { $io } = useNuxtApp();

const sendMessage = () => {
  $io.emit("send message", "new message sent");
};

onMounted(() => {
  $io.on("connect", () => {
    console.log("connected", $io.id);
  });
  $io.on("user disconnected", function (data) {
    alert(`${data} got disconnected`);
  });

  $io.on("new message sent", (data) => {
    alert(data);
  });
});
</script>
