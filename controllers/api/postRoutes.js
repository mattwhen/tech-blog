const router = require("express").Router();
const { Post } = require("../../models");

router.get('/', async (req, res) => {
    console.log(req);
    try {
        const posts = await Post.findAll({});
        if (!posts) {
            res.status(400).send("Cannot find posts...");
        }
        res.status(200).json({posts});
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error", err);
    }
});

router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;