const router = require("express").Router();
const { User } = require("../../models");

router.route("/create").post(async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    console.log('new user data...', newUser);
    res.status(200).json({ message: "New user created", newUser });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/").get(async (req, res) => {
  console.log(req);
  try {
    const users = await User.findAll({});
    if (!users) {
      res.status(400).send("Cannot get users");
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
