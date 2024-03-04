<template lang="">
  <form @submit.prevent="submitForm">
    <div class="border-b border-gray-900/10 pb-12 p-4">
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-4">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Title</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
            >
              <input
                v-model="Post.title"
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="topic"
                required
              />
            </div>
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="about"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Content</label
          >
          <div class="mt-2">
            <textarea
              v-model="Post.content"
              id="about"
              name="about"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2 h-1/2 rounded-full mx-auto">
      <img
        :src="urlImage"
        alt="Image Description"
        class="w-full rounded-lg"
      />
    </div>
    <div class="flex items-center justify-center">
      <!-- Upload button with Tailwind CSS classes -->
      <label
        for="fileInput"
        class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
      >
        Upload File
      </label>
      <!-- Actual file input (hidden) -->
      <input @change="handleImage" id="fileInput" type="file" class="hidden" />
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Submit
      </button>
      <button
        @click="statusModal.closeModal"
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Cancle
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import PostServices from "@/services/PostServices";
import { defineComponent, onMounted, ref, watch } from "vue";
import { modal } from "@/stores/modal";
import type {Post} from '@/types';



const Post = ref<Post>({})

const statusModal = modal();
const postId = ref<number>(statusModal.objId)
console.log(postId.value)

const urlImage = ref<File|string>();
let fileImage:File|null = null;

const emit = defineEmits({
  'data-update':null
});

// watch(postId, (newValue,oldValue) =>{
//   fetchData(Number(newValue));
// })

onMounted(async ()=>{
  console.log(postId)
  const getData = await PostServices.show(Number(postId.value));
  Post.value = getData.data
  ///// setup picture show
  urlImage.value = getImageUrl(Post.value.imageUrl)
  console.log(urlImage)
  console.log(Post.value)
})

function getImageUrl(nameImage:string){
  return `http://localhost:3000/uploads/${nameImage}`
}

function handleImage(event:any){
  const file = event.target?.files[0];
      fileImage = file;

      // Display preview
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          urlImage.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
}


async function submitForm(){
  const formData = new FormData();
  console.log(Post.value)

  try {
    formData.append('title',Post.value.title)
    formData.append('content',Post.value.content)
    formData.append('imageUrl',Post.value.imageUrl)
    formData.append('userUserId',Post.value.userUserId)
    // check image has upload 
    if (fileImage) formData.append('image',fileImage);
  ////// update 
  console.log(`Has send data : ${formData}`)
  
  await PostServices.update(formData,postId.value);

  emit('data-update');
  

  } catch (error) {
    console.log(error)
  }
   

}



</script>
<style lang=""></style>
