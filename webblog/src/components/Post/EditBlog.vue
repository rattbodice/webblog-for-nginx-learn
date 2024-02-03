<template lang="">
  <form @submit.prevent="submitForm">
    <div class="border-b border-gray-900/10 pb-12">
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
          :src="getImageUrl(Post.imageUrl)"
          alt="Image Description"
          class="w-full rounded-lg"
        />
      </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Submit
      </button>
      <button
      @click="cancle"
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Cancle
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import PostServices from "@/services/PostServices";
import { defineComponent,ref } from "vue";

const objPost =  ref({})


export default defineComponent({
  props: {},
  data() {
    return{
      Post:{
      }
    }
  },
  methods:{
    async fetchData(){
      try {
        const parameterValue: string | string[] = this.$route.params.postId;
        const objData = await PostServices.show(Number(parameterValue));
        this.Post = objData.data
    } catch (error:any) {
        console.error('Error fetching data:', error.message);
    }
    },
    getImageUrl(imageName: string) {
      return `http://localhost:3000/uploads/${imageName}`;
    },
    async submitForm(){
      try {
        await PostServices.update(this.Post)
        this.$router.push('/mypost');
      } catch (error) {
        
      }
    },
    cancle(){
      this.$router.push('/mypost')
    }
  },
  mounted() {
    this.fetchData()
  },
});
</script>
<style lang=""></style>
