const express = require('express');
const router = express.Router();
const userSchema=require("../model/userCredentialModel")
const secretKey ='secret007'
const jwt = require ("jsonwebtoken")
const bcrypt = require ('bcrypt')



router.get("/",(req,res)=>{
    res.send("hi")
})

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validate user input here

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userSchema({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send('success')
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});


router.post("/checkuser", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  let userExist = await userSchema.findOne({ email: email });
  console.log("user===", userExist);

  if (userExist) {
    console.log("user exists");
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      console.log("valid password");
    
      const token = jwt.sign({ userId: userExist._id }, secretKey, {
        expiresIn: "1h",
      });
      
      res.json({ token });
    
    } else {
      res.status(401).json({ message: "Wrong password" });
      console.log("wrong password");
    }
  } else {
    console.log("user doesn't exist");
    res.status(404).json({ message: "User not found" });
  }
});
     




function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "secret007", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Token is valid; you can access the decoded data (e.g., userId) in your route handlers
    req.userId = decoded.userId;
    next();
  });
}


router.get("/profile", verifyToken, async (req, res) => {
  try {
    // req.userId contains the user's ID from the JWT token
    const userId = req.userId;

    // Retrieve the user data from your database using the userId
    const user = await userSchema.findById(userId);

    if (user) {
      // User data found; send it as a JSON response
      res.json(user);
    } else {
      // User not found (unlikely if the token is valid, but it's a good practice to handle this)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that may occur during the database query
    res.status(500).json({ message: "Internal Server Error" });
  }
});

    
  

module.exports = router;