const User = require("../models/User");
const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.send(users);
    } catch (err) {
      res.status(500).send({
        error: "The users information was incorrect",
      });
    }
  },

  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(500).send({
        error: "Create user incorrect",
      });
    }
  },

  async put(req, res) {
    try {
      await User.update(req.body, {
        where: {
          id: req.params.userId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: "Update user incorrect",
      });
    }
  },

  // Delete user
  // res.send('ทำการลบผู้ใช้งาน:' + req.params.userId + ' : ' + JSON.stringify(req.body));
  // delete user
  async remove(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.userId,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: "The user information was incorrect",
        });
      }
      await user.destroy();
      res.send(user);
    } catch (err) {
      res.status(500).send({
        error: "The user information was incorrect",
      });
    }
  },

  // Show user by id
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.userId);
      res.send(user);
    } catch (err) {
      res.status(500).send({
        error: "The user information was incorrect",
      });
    }
  },
  async login(req, res) {
    const secretKey = '1123';
    const { userName, passWord } = req.body;
    const user = await User.findOne({
        where: { userName: userName, passWord: passWord },
      });
    

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // const token = jwt.sign(
    //   { userId: user.userId, userName: user.userName },
    //   secretKey,
    //   { expiresIn: "1h" }
    // );

    res.json({user});
  },
};
