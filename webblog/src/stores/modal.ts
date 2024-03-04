import { ref} from 'vue'
import { defineStore } from 'pinia'

export const modal = defineStore('modal', () => {
  const status = ref(false)
  const objId = ref(0)

  function openModal(){
    status.value = true
  }

  function closeModal(){
    status.value = false
  }

  function setStatus(newStatus:boolean){
    status.value = newStatus;
  }

  function setId(id:number){
    objId.value = id;
  }
  

  return { status,objId,openModal,closeModal,setStatus,setId}
})
