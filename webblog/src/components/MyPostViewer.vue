<template lang="">
  <div class="flex justify-center">
    <div class="container ">
      <Navbar :data="objUser" />
      <PostModal>
        <EditBlog @data-update="refreshData" :postId="toPostId" />
      </PostModal>
      <div class="flex flex-wrap justify-center mt-4 mb-8 gap-4" >
        <BoxBlog ref="childComponent" @idToParent="handleIdFromChild" v-for="(item,index) in objData" :key="index" :keyIndex="index" :data="item" :edit="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./Navbar.vue";
import BoxBlog from "./Post/BoxBlog.vue"
import PostModal from "./Post/Modal/PostModal.vue";
import EditBlog from "./Post/EditBlog.vue";
import { onMounted, ref, watch } from "vue";
import PostServices from "@/services/PostServices";
import { useRouter } from "vue-router";
import { modal } from "@/stores/modal";

const router = useRouter();
const user = localStorage.getItem("token");
const objUser = JSON.parse(user as string);

const objData = ref([]);

const toPostId = ref<number|null>(null)

const statusModal = modal();
const modalActive = ref(statusModal.status);



onMounted(()=>{
    if (!user) {
      router.push("/");
    } else {
  
      statusModal.setStatus(false)
      fetchData();
    }
})



const fetchData = async ()=>{
    try {
        const response = await PostServices.getPostByUser(objUser.userId);
        objData.value = response.data
   
    } catch (error:any) {
        console.error('Error fetching data:', error.message);
    }
}

function refreshData(){
  statusModal.setStatus(false);
  fetchData();
}

const handleIdFromChild = (childId:number)=> {
      toPostId.value = childId;
      // openModal()
      console.log(toPostId.value+"Parent")
    }
</script>
<style lang=""></style>
