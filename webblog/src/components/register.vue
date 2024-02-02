<script  lang="ts">
import { defineComponent, reactive, ref} from "vue";
import type UserType from '@/types/User'
import UserServices from "@/services/UserServices";

const user:UserType = {
    userName:'',
    passWord:'',
    fullName:''
}

export default defineComponent({
    props: {
    
  },
  data() {
    return {
        user,
        password1:'',
        password2:'',
        passwordsMatch: false
    }
  },
  methods: {
    async submitRegister(){
        this.passwordsMatch = this.password1 === this.password2
        if (this.passwordsMatch){
            this.user.passWord = this.password1
            await UserServices.create(this.user);
            this.$router.push({name:'login'})
        }else{
            alert("พาสเวิร์ดไม่ถูกต้องหรือไม่ Match")
        }
    }
  }
})

</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Icebook   
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign Up 
              </h1>
              <form v-on:submit.prevent="submitRegister" class="space-y-4 md:space-y-6" action="#">
                <div>
                      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fullname</label>
                      <input v-model="user.fullName" type="text" name="userName" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
                  </div>
                  <div>
                      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input v-model="user.userName" type="text" name="userName" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="password1" type="password" name="password" id="password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input @change="checkPasswordsMatch()" v-model="password2" type="password" name="password" id="password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                  </div>
                  
                  <button type="submit" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Do you have an account ? <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</router-link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
