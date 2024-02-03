<script setup lang="ts">
import Navbar from "./Navbar.vue";
import BoxInput from "./Post/BoxInput.vue";
import BoxBlog from "./Post/BoxBlog.vue"
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import PostServices from "@/services/PostServices";

const user = localStorage.getItem('token');
const objUser = JSON.parse(user as string);
const router = useRouter();
console.log(user);

const dataBlog = ref([]);

const fetchData = async () => {
  try {
    const response = await PostServices.index();
    console.log(response)
    dataBlog.value = response.data;
  } catch (error:any) {
    console.error('Error fetching data:', error.message);
  }
};

onMounted(() => {
  if (!user){
    router.push('/')
  }else{
    console.log(objUser)
    fetchData();
  }
});

const getImageUrl = (imageName:string) => {
  // Replace 'http://localhost:3000' with the actual base URL of your Node.js server
  return `http://localhost:3000/uploads/${imageName}`;
};


</script>

<template lang="">
  <div class="flex justify-center">
    <div class="container ">
      <Navbar :data="objUser" />
      <BoxInput :data="objUser" class="w-2/3 mx-auto" />
      
      <div class="flex flex-wrap justify-center mt-4 mb-8 gap-4" >
        <BoxBlog v-for="(item,index) in dataBlog" :key="index"  :data="item" />
      </div>
      
    </div>
  </div>
</template>

<style set lang="ts"></style>



