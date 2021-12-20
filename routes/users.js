const { validationResult } = require("express-validator");
var express = require("express");
var router = express.Router();
const {check} =require("express-validator")
const User = require("../models/user")

//user login 
router.get("/login", [
    
  check('email','email should be a valid one')
  .isEmail(),
  check('password','password is required')
  .isLength({ min: 1 }),

],(req, res) => {
    console.log("signin is working");
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({
        err: errors.array()[0].msg,
      });
    }
  
    User.findOne({ email }, (err, user) => {
      if (!user) {
        return res.status(400).json({
          err: "user not found in db",
        });
      }
      if (err) {
        res.status(400).json({
          err: "USER email does not exists",
        });
      }
      if (!user.authentication(password)) {
        return res.status(401).json({
          err: "Email does not match",
        });
      }
  
      const { _id, name, email } = user;
      return res.json({
       
        user: { _id, name, email },
      });
    })
  }
    )

// user signup
router.post(
  "/signup",
  [
      check("name","name shd be atleast 3 char").isLength({min:3}),
      check("email","email is required").isEmail(),
      check("password","passsword should be atleast of 5 characters").isLength({min:5}),
     
],(req, res) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  console.log("user", req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "cant save to the DB",
      });
    }
    res.json(user);
  });
}
);




module.exports = router;