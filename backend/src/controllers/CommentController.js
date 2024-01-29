const {Comment} = require('../models')

module.exports = {
    async index(req, res) {
        try {
            const comments = await Comment.findAll()
            res.send(comments)
        } catch (err) {
            res.status(500).send({
                error: 'The comments information was incorrect'
            })
        }
    },
    // Create comment
    // res.send('ทำการสร้างผู้ใช้งาน' + JSON.stringify(req.body));
    async create(req, res) {
        try {
            const comment = await Comment.create(req.body)
            res.send(comment.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create comment incorrect'
            })
        }
    },

    // Edit comment
    // res.send('แก้ไขข้อมูลผู้ใช้ ' + req.params.commentId + ' : ' + JSON.stringify(req.body.name));
    async put(req, res) {
        try {
            await Comment.update(req.body, {
                where: {
                    id: req.params.commentId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update comment incorrect'
            })
        }
    },

    // Delete comment
    // res.send('ทำการลบผู้ใช้งาน:' + req.params.commentId + ' : ' + JSON.stringify(req.body));
    // delete comment
    async remove(req, res) {
        try {
            const comment = await Comment.findOne({
                where: {
                    id: req.params.commentId
                }
            })
            if (!comment) {
                return res.status(403).send({
                    error: 'The comment information was incorrect'
                })
            }
            await comment.destroy()
            res.send(comment)
        } catch (err) {
            res.status(500).send({
                error: 'The comment information was incorrect'
            })
        }
    },

    // Show comment by id
    async show(req, res) {
        try {
            const comment = await Comment.findByPk(req.params.commentId)
            res.send(comment)
        } catch (err) {
            res.status(500).send({
                error: 'The comment information was incorrect'
            })
        }
    }
}