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

        <div class="col-span-full">
          <label
            for="cover-photo"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Cover photo</label
          >
          <div
            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
          >
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Preview"
                style="max-width: 100%; max-height: 200px; margin-top: 10px"
              />
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    @change="handleImageChange"
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Post
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PostServices from "@/services/PostServices";
const Post = {
  title: "",
  content: "",
  imageUrl: "" as string,
};

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      Post,
      selectedImage: null,
      file: null as File | null,
      imageUrl: null as string | null,
    };
  },
  methods: {
    handleImageChange(event: any) {
      this.selectedImage = event.target.files[0];
      if (this.selectedImage) {
        this.file = this.selectedImage;
        this.previewImage();
      }
    },
    previewImage() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string;
      };

      if (this.file) {
        reader.readAsDataURL(this.file);
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("title", this.Post.title);
      formData.append("content", this.Post.content);
      formData.append("image", this.selectedImage as any);
      formData.append("userId", this.data.userId);
      console.log(formData);
      try {
        await PostServices.create(formData);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
<style lang=""></style>
