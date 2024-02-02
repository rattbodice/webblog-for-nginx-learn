<template lang="">
  <div class="flex justify-center ">
    <div class="container ">
      <Navbar />
      <BoxInput class="w-2/3 mx-auto" />
      <div>
        <BoxBlog/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Navbar from "./Navbar.vue";
import BoxInput from "./Post/BoxInput.vue";
import BoxBlog from "./Post/BoxBlog.vue"
</script>
<style set lang="ts"></style>
