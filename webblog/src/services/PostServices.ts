import Api from '@/services/Api'
import type PostType from '@/types/Post';

export default {
    index(){
        return Api().get('posts')
    },
    update(post:any){
        return Api().put(`post/${post.postId}`,post)
    },
    create(post:any){
        return Api().post('submit-post',post)
    },
    remove(postId:number){
        return Api().delete(`post/${postId}`)
    },
    getPostByUser(userId:number){
        return Api().get(`posts/by/${userId}`)
    },
    show(postId:number){
        return Api().get(`post/${postId}`)
    }
}