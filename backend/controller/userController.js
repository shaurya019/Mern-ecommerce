const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");


// Register a User

exports. registerUser = catchAsyncErrors(async (req,res,next) =>{
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: "this is a sample id",
          url: "profileURL",
        },
      });
      const token = user.getJWTToken();

      res.status(200).json({
        success:true,
        token, 
      });
});