const router = require("express").Router();
const { Post } = require("../../models");

router.get("/", async (req, res) => {
  console.log(req);
  try {
    const postData = await Post.findAll({});
    if (!postData) {
      res.status(400).send("Cannot find posts...");
    }
    res.status(200).json({ postData });

    // serialize data so the template can read it
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
        projects,
        logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error", err);
  }
});

router.post("/", async (req, res) => {
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
