<script setup lang="ts">
import Navbar from "./Navbar.vue";
import BoxInput from "./Post/BoxInput.vue";
import BoxBlog from "./Post/BoxBlog.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PostServices from "@/services/PostServices";
import PostModal from "./Post/Modal/PostModal.vue";
import { modal } from "@/stores/modal";

const user = localStorage.getItem("token");
const objUser = JSON.parse(user as string);
const router = useRouter();
console.log(user);

const storeModal = modal();

const dataBlog = ref([]);

async function fetchData() {
  try {
    const response = await PostServices.index();
    console.log(response);
    dataBlog.value = response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}

onMounted(() => {
  if (!user) {
    router.push("/");
  } else {
    console.log(objUser);
    fetchData();
  }
});

const getImageUrl = (imageName: string) => {
  // Replace 'http://localhost:3000' with the actual base URL of your Node.js server
  return `http://localhost:3000/uploads/${imageName}`;
};
</script>

<template lang="">
  <div class="">
    <Navbar :data="objUser" />
    <div class="flex justify-center mt-2">
      <div class="container flex justify-end ">
        <button
          @click="storeModal.setStatus(true)"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Post
        </button>
      </div>
    </div>

    <PostModal>
      <BoxInput :data="objUser" class="w-2/3 mx-auto" />
    </PostModal>

    <div class="flex flex-wrap justify-center mt-4 mb-8 gap-4">
      <BoxBlog v-for="(item, index) in dataBlog" :key="index" :data="item" />
    </div>
  </div>
</template>

<style set lang="ts"></style>
