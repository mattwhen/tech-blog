const userRoutes = require('express').Router();
const {User} = require('../../models');


userRoutes.route('/create').post( async (req, res) => {
    // console.log(req.body);
    try {
        const newUser = await User.create(req.body)
        // console.log(newUser);
        res.status(200).json({message: "New user created", newUser});
    } catch (err) {
        // console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
});

userRoutes.route('/').get( async (req, res) => {
    console.log(req);
    try {
        const users = await User.findAll({});
        if (!users) {
            res.status(400).send("Cannot get users");
        }
        res.status(200).json({users});
    } catch (err) {
        res.status(500).send("Internal server error");
    }
});

module.exports = userRoutes;