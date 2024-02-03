const  Post  = require("../models/Post");
const User = require("../models/User")
module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.findAll({
        include: [{ model: User}],
      });
      res.send(posts);
    } catch (err) {
      res.status(500).send({
        error: "The posts information was incorrect",
      });
    }
  },
 
  async create(req, res) {
    try {
      console.log('test')
      const { title, content , userId } = req.body;
      const imageUrl = req.file.filename;
      const objPost = {
        title:title,
        content:content,
        imageUrl:imageUrl,
        userUserId: userId
      }
      console.log(objPost)
      const post = await Post.create(objPost);
      console.log(post)
      res.send(post.toJSON());
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: "Create post incorrect",
      });
    }
  },

  // Edit post
  // res.send('แก้ไขข้อมูลผู้ใช้ ' + req.params.postId + ' : ' + JSON.stringify(req.body.name));
  async put(req, res) {
    try {
      await Post.update(req.body, {
        where: {
          postId: req.params.postId,
        },
      });
      res.send(req.body);
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: "Update post incorrect",
      });
    }
  },

  // Delete post
  // res.send('ทำการลบผู้ใช้งาน:' + req.params.postId + ' : ' + JSON.stringify(req.body));
  // delete post
  async remove(req, res) {
    try {
      const post = await Post.findOne({
        where: {
          postId: req.params.postId,
        },
      });
      if (!post) {
        return res.status(403).send({
          error: "The post information was incorrect",
        });
      }
      await post.destroy();
      res.send(post);
    } catch (err) {
      res.status(500).send({
        error: "The post information was incorrect",
      });
    }
  },

  // Show post by id
  async show(req, res) {
    try {
      console.log('get show')
      const post = await Post.findByPk(req.params.postId);
      res.send(post);
    } catch (err) {
      res.status(500).send({
        error: "The post information was incorrect",
      });
    }
  },

  async getPostByUser(req,res){
    try {
      const userId = req.params.userId
      const posts = await Post.findAll({
        include: [{ model: User}],
        where:{
          userUserId:userId
        }
      });

      res.send(posts)
    } catch (error) {
      
    }
  }
};
