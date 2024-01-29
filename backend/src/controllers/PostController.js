const { Post } = require("../models");

module.exports = {
    async index(req, res) {
        try {
            const posts = await Post.findAll()
            res.send(posts)
        } catch (err) {
            res.status(500).send({
                error: 'The posts information was incorrect'
            })
        }
    },
    // Create post
    // res.send('ทำการสร้างผู้ใช้งาน' + JSON.stringify(req.body));
    async create(req, res) {
        try {
            const post = await Post.create(req.body)
            res.send(post.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create post incorrect'
            })
        }
    },

    // Edit post
    // res.send('แก้ไขข้อมูลผู้ใช้ ' + req.params.postId + ' : ' + JSON.stringify(req.body.name));
    async put(req, res) {
        try {
            await Post.update(req.body, {
                where: {
                    id: req.params.postId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update post incorrect'
            })
        }
    },

    // Delete post
    // res.send('ทำการลบผู้ใช้งาน:' + req.params.postId + ' : ' + JSON.stringify(req.body));
    // delete post
    async remove(req, res) {
        try {
            const post = await Post.findOne({
                where: {
                    id: req.params.postId
                }
            })
            if (!post) {
                return res.status(403).send({
                    error: 'The post information was incorrect'
                })
            }
            await post.destroy()
            res.send(post)
        } catch (err) {
            res.status(500).send({
                error: 'The post information was incorrect'
            })
        }
    },

    // Show post by id
    async show(req, res) {
        try {
            const post = await Post.findByPk(req.params.postId)
            res.send(post)
        } catch (err) {
            res.status(500).send({
                error: 'The post information was incorrect'
            })
        }
    }
}