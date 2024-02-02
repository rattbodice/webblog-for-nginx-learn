import Api from '@/services/Api'
import type PostType from '@/types/Post';

export default {
    index(){
        return Api().get('posts')
    },
    update(postId:number){
        return Api().put(`post/${postId}`)
    },
    create(post:PostType){
        return Api().post('post',post)
    },
    remove(postId:number){
        return Api().delete(`post/${postId}`)
    }
}