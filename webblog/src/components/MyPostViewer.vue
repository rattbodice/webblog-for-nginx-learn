<template lang="">
  <div class="flex justify-center">
    <div class="container ">
      <Navbar :data="objUser" />
      <EditModalVue/>
      <div class="flex flex-wrap justify-center mt-4 mb-8 gap-4" >
        <BoxBlog ref="childComponent" @idToParent="handleIdFromChild" v-for="(item,index) in objData" :key="index" :keyIndex="index" :data="item" :edit="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
import BoxBlog from "./Post/BoxBlog.vue"
import EditModalVue from "./Post/Modal/EditModal.vue";
import { defineComponent, onMounted, ref } from "vue";
import PostServices from "@/services/PostServices";
import { useRouter } from "vue-router";

const router = useRouter();
const user = localStorage.getItem("token");
const objUser = JSON.parse(user as string);

const objData = ref([]);

onMounted(()=>{
    if (!user) {
      router.push("/");
    } else {
      console.log(objUser);
      fetchData();
    }
})

const fetchData = async ()=>{
    try {
        const response = await PostServices.getPostByUser(objUser.userId);
        objData.value = response.data
    console.log(objData)
    } catch (error:any) {
        console.error('Error fetching data:', error.message);
    }
}

const handleIdFromChild = (childId:number)=> {
      // รับ ID จาก child
      console.log('ID from child:', childId);
      // ทำสิ่งที่คุณต้องการกับ ID ที่ได้รับ
    }
</script>
<style lang=""></style>
