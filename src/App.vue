<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- النافبار فوق -->
    <Navbar />

    <!-- المحتوى الرئيسي في النص -->
    <main class="" >
      <router-view />
    </main>

    <!-- الفوتر تحت -->
    <Footer />
  </div>
</template>


<style scoped>
/* لو مش بتستخدم bootstrap classes زي min-vh-100 و flex-grow-1 */
#app {
  display: grid;
  min-height: 100%;
  padding: 0 2rem;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0; /* لو فيه padding مش محتاجه */
}


/* main {
  flex-grow: 1;
} */

</style>
