const router = require("express").Router();
const { Comment } = require("../../models");

router.get('/', async (req, res) => {
    try {
        const comment = await Comment.findAll({});
        if (!comment) {
            res.status(400).send("Cannot find comment");
        }
        res.status(200).json(comment);
    } catch (err) {
        console.log('System error', err);
        res.status(500).send("Internal server error", err);
    }
});


module.exports = router;
