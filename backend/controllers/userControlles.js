const Users = require("../models/userModel")
const jwt = require("jsonwebtoken");
const secretKey = "eoubouYBiycenauocbaonpicne";


// SIGN UP API creating new users
exports.signUp = (req, res) => {
    const { firstName, lastName, companyName, phoneNumber, password ,confirmPassword} = req.body;
    // Validate request
    if (!firstName || !lastName || !companyName || !phoneNumber || !password || !confirmPassword) {
      res.status(500).send({
        status: false,
        message: "Fields can not be empty!",
      });
    } else {
      // Save entry in user cred table
      const user_cred = new Users({ ...req.body });
  
      user_cred.save()
      .then((user) => {
        return res.status(200).send({
          status: true,
          message: "User registered successfully!",
          data: user_cred,
        });
      })
      .catch((err) => {
        if (err.code === 11000 && err.keyPattern.phoneNumber) {
          return res.status(400).send({
            status: false,
            message: "Phone number already exists in the database",
          });
        } else {
          return res.status(400).send({
            status: false,
            message: err.message,
          });
        }
      });  
    }
}

// Login API with username AS phone number and matching password from Database
exports.login = (req, res) => {
  const { phoneNumber, password } = req.body;
  
  Users.findOne({ phoneNumber })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          status: false,
          message: "User not found",
        });
      }
      
      if (user.password !== password) {
        return res.status(401).send({
          status: false,
          message: "Invalid password",
        });
      }
      
      // Generate and send JWT token
      const token = jwt.sign({ id: user._id ,companyName: user.companyName},secretKey, { expiresIn: '2h' });
      return res.status(200).send({
        status: true,
        message: "Login successful",
        data:{
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            companyName: user.companyName
        },
        token,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message,
      });
    });
};


