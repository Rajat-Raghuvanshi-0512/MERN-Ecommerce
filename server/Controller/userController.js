const User = require("../Database/Models/userSchema");
const { saveToCookie } = require("../utils/SaveToCookie");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.signup = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) {
    return res
      .status(400)
      .json({ error: "User with this email already exists." });
  }
  const newUser = await User.create({
    name,
    email,
    password,
    profilePhoto: {
      public_id: "empty",
      url: "https://res.cloudinary.com/rajat0512/image/upload/v1642447946/E-commerce/avatar_gehm7u.jpg",
    },
  });
  if (!newUser) {
    return res.status(400).json({ error: "Error in creating new user" });
  }
  saveToCookie(newUser, 201, res);

  const MESSAGE = `Hello ${name}👤,
       Welcome to Shop Buddy.We’re thrilled to see you here!.\n
       We're a global lifestyle brand with a mission to create simple, beautiful products that help the world relax. \n
       You're now on the list and will be the first to know about our latest styles, exclusive offers, and much more.\n
       Take care!\n
        Shop Buddy Team
       `;

  const html = `
    <h1>Hello ${name}👤,</h1>
    <br>
    <h3>Welcome to Shop Buddy .We’re thrilled to see you here! </h3>
    <br>
    <p>We're a global lifestyle brand with a mission to create simple, beautiful products that help the world relax.</p>
    <br>
    <p>You're now on the list and will be the first to know about our latest styles, exclusive offers, and much more.</p>
    <br>
    <b>
        Take care!
        <br>
        The Shop Buddy Team
    </b>`;

  await sendEmail({
    email,
    subject: "Welcome to Shop Buddy",
    message: MESSAGE,
    html,
  });
});

exports.login = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Enter email and password." });
  }
  const UserFound = await User.findOne({ email });
  if (!UserFound) {
    return res.status(400).json({ error: "Invalid email or password." });
  }
  const matchPassword = await UserFound.matchPassword(password);
  if (!matchPassword) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  saveToCookie(UserFound, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({ message: "Successfully logged out!" });
});

exports.forgotPassword = catchAsyncErrors(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }
  // Generating password reset token
  const resetToken = await user.ResetPassword();
  //Saving user deatils with password token and password-expire time
  await user.save({ validateBeforeSave: false });

  try {
    // dummy url
    // const URL = `${process.env.FRONTEND_PORT}/password/reset/${resetToken}`

    //URL to reset password
    const URL = `${req.protocol}://${req.get(
      "host"
    )}/api/password/reset/${resetToken}`;
    const MESSAGE = `Your password reset token is \n\n${URL} \n\nPlease ignore if you have not requested this email.`;

    await sendEmail({
      email: user.email,
      subject: "E-commerce password recovery",
      message: MESSAGE,
    });

    return res.status(200).json({ message: `Email sent to ${user.email}` });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.passwordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ error: err.message });
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    passwordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Token is invalid or expired" });
  }

  if (req.body.password != req.body.cpassword) {
    return res.status(400).json({ error: "Password doesn't match" });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.passwordExpire = undefined;
  await user.save({ validateBeforeSave: false });
  saveToCookie(user, 200, res);
});

exports.getUserPhoto = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({ success: true, photo: user.profilePhoto.url });
});

// USER FUNCTIONALITIES

//Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

//Update user password
exports.updatePassword = catchAsyncErrors(async (req, res) => {
  const { oldPass, newPass, confirmPass } = req.body;
  if (!oldPass || !newPass || !confirmPass) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  const user = await User.findById(req.user.id);
  const isPasswordMatched = await user.matchPassword(oldPass);
  if (!isPasswordMatched) {
    return res.status(400).json({ error: "Old password is incorrect" });
  }
  if (newPass.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be atleast 6 characters" });
  }
  if (newPass !== confirmPass) {
    return res.status(400).json({ error: "Password doesn't match" });
  }
  user.password = newPass;
  await user.save({ validateBeforeSave: false });
  saveToCookie(user, 200, res);
});

//Update profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return next(new ErrorHandler(400, "Enter both email and name"));
  }
  let newData = { name, email };
  if (req.body.profilePhoto !== "") {
    const user = await User.findById(req.user.id);
    const image_id = user.profilePhoto.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.profilePhoto, {
      folder: "E-commerce",
      width: 700,
      crop: "scale",
    });
    newData.profilePhoto = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { ...newData },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res
    .status(200)
    .json({ message: "Profile updated successfully!", user: updatedUser });
});

//Admin routes

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const userDetails = await User.find();

  return res.status(200).json({ userDetails });
});

exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }

  return res.status(200).json({ success: true, user });
});

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.body;
  if (!role) {
    return next(new ErrorHandler(400, "Please enter user role."));
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role });

  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }
  return res
    .status(200)
    .json({ success: true, message: `${user.name} is ${role} now.` });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }

  return res
    .status(200)
    .json({ success: true, message: `User deleted successully!` });
});
