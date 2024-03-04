<template lang="">
  <div class="relative z-0">
    <article
      class="flex max-w-xl flex-col items-start justify-between bg-emerald-100 p-4 rounded-md text-white"
    >
      <div class="w-1/2 h-1/2 rounded-full mx-auto">
        <img
          :src="getImageUrl(data.imageUrl)"
          alt="Image Description"
          class="w-full rounded-lg"
        />
      </div>
      <div class="group relative mt-4">
        <h3
          class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
        >
          <a href="#">
            <span class="absolute inset-0"></span>
            {{ data.title }}
          </a>
        </h3>
        <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {{ data.content }}
        </p>
      </div>
      <div class="relative mt-8 flex items-center gap-x-4">
        <div class="text-sm leading-6">
          <p class="font-semibold text-gray-900">
            <a href="#">
              <span class="absolute inset-0"></span>
              Author : {{ data.user.fullName }}
            </a>
          </p>
        </div>
      </div>
      <div v-if="edit" class="flex">
        <button
          @click="sendIdToParent(data.postId)"
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Edit
        </button>
        <button
        @click="submitDelete"
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import PostServices from "@/services/PostServices";
import { defineComponent, ref } from "vue";
import { modal } from "@/stores/modal";

const statusInput = ref(false);
const statusModal = modal();

const dataForInput = ref({});


export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
    },
    keyIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      childIndex:this.keyIndex,
      dataForInput,
      statusInput,
    };
  },
  methods: {
    getImageUrl(imageName: string) {
      return `http://localhost:3000/uploads/${imageName}`;
    },
    sendIdToParent(postId:number) {
      console.log()
      statusModal.setId(postId)
      statusModal.setStatus(true)
      
    },
    async submitDelete(){
      const userConfirmed = window.confirm('Are you sure you want to delete?');
      if (userConfirmed) {
        await PostServices.remove(Number(this.data.postId));
        location.reload()
      } else {
        // User canceled the delete action
        console.log('Delete canceled');
      }
    }
  },
  mounted() {
    
  },
});
</script>
<style lang=""></style>
