// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 8080;

// const schemaData = mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     mobile: String,
    
//   },
//   {
//     timestamps: true,
//   }
// );
// const userModel = mongoose.model("user", schemaData);

// //read
// app.get("/", async (req, res) => {
//   const data = await userModel.find({});
//   res.json({ success: true, data: data });
// });

// //create user

// app.post("/create", async (req, res) => {
//   console.log(req.body);
//   const data = new userModel(req.body);
//   await data.save();
//   res.send({ success: true, message: "data save successfully", data: data });
// });

// //update data

// app.put("/update", async (req, res) => {
//   // console.log(req.body);

//   const { _id, ...rest } = req.body;
//   console.log('value',req.body);
//   const data = await userModel.updateOne(
//     { _id: req.body.id },
//     { name:req.body.name },
//     { email:req.body.email }

//   );
//   res.send({
//     success: true,
//     message: " data  updated successfully  ",
//     data: data,
//   });
// });

// //delete

// app.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);

//   const data = await userModel.deleteOne({ _id: id });
//   res.send({
//     success: true,
//     message: " data deleted successfully  ",
//     data: data,
//   });
// });

// mongoose
//   .connect("mongodb://127.0.0.1:27017/crud")
//   .then(() => {
//     console.log("connected DB");
//     app.listen(PORT, () => console.log("sever is running", PORT));
//   })

//   .catch((err) => console.log(err));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWTs

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const JWT_SECRET = "your_jwt_secret"; // Use an environment variable in production

// Define user schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true }, 
    mobile: String,
    password: String,
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("user", schemaData);

// Read users (for testing, can restrict later)
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// Create user (sign-up)
// app.post("/signup", async (req, res) => {
//   const { name, email, mobile, password } = req.body;
  
//   // Check if user already exists
//   const existingUser = await userModel.findOne({ email });
//   if (existingUser) {
//     return res.status(400).send({ success: false, message: "User already exists." });
//   }

//   // Hash the password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);
  
//   const data = new userModel({
//     name,
//     email,
//     mobile,
//     password: hashedPassword, // Save hashed password
//   });

//   await data.save();
//   res.send({ success: true, message: "User registered successfully.", data: data });
// });

app.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !mobile || !password) {
      return res.status(400).send({ success: false, message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "User already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new userModel({
      name,
      email,
      mobile,
      password: hashedPassword, // Save hashed password
    });

    // Save the user in the database
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully.",
      data: newUser,
    });
  } catch (error) {
    // Handle errors (e.g., database errors)
    console.error("Error during user signup:", error);
    res.status(500).send({ success: false, message: "Internal server error." });
  }
});

// loh
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
      return res.status(400).send({ success: false, message: "Invalid email or password." });
  }

  // Check if the password matches
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: "Invalid email or password." });
  }

  // Create a JWT token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  
  res.send({ success: true, token }); // Send token on successful login
});


// Update user data
app.put("/update", async (req, res) => {
  const { id, ...rest } = req.body;
  // const hashedPassword = await bcrypt.hash(rest, 10);

  const data = await userModel.updateOne({ _id: id }, { ...rest });
  res.send({
    success: true,
    message: "Data updated successfully.",
    data: data,
  });
});

// Delete user
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await userModel.deleteOne({ _id: id });
  res.send({
    success: true,
    message: "Data deleted successfully.",
    data: data,
  });
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log("Server is running on port", PORT));
  })
  .catch((err) => console.log(err));

