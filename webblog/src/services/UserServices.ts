import Api from '@/services/Api'
import type UserType from '@/types/User';
import type { AxiosResponse } from 'axios';

export default {
    index(): Promise<AxiosResponse>{
        return Api().get('users')
    },
    show(userId:number): Promise<AxiosResponse>{
        return Api().get(`user/${userId}`)
    },
    update(userId:number): Promise<AxiosResponse>{
        return Api().put(`user/${userId}`)
    },
    create(user:UserType): Promise<AxiosResponse>{
        return Api().post('user',user)
    },
    remove(userId:number): Promise<AxiosResponse>{
        return Api().delete(`user/${userId}`)
    },
    login(user:any){
        return Api().post('api/login',user)
    }
}