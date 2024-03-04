<template lang="">
  <div
    v-show="storeModal.status"
    class=" fixed top-0 z-20 left-0 w-full flex items-center justify-center bg-black bg-opacity-50 md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div v-if="storeModal.status" class="absolute p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Post
          </h3>
          <button
            @click="storeModal.closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <slot></slot>
        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 border-t mt-4 border-gray-200 rounded-b dark:border-gray-600"
        >
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { modal } from "@/stores/modal";
export default defineComponent({
  props: {
    
  },
  data() {
    const storeModal = modal();
    return {storeModal};
  },
  emits: ['closeModal']
  ,
  methods:{
    closeModal() {
        console.log('emit')
      this.$emit('closeModal'); // Emit the 'closeModal' event
    }
  }
});
</script>
<style lang="scoped"></style>
