const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeatures  = require("../utils/apifeatures");

// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product,
    })
})


// Get all Products
exports.getAllProducts = catchAsyncError(async (req,res) =>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        products
    })
})

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

  

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req,res,next) => {
   
    req.body.user = req.user.id;

    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    
    res.status(200).json({
        success:true,
        product,
        productCount,
    })
})


// Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }
    
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    
    res.status(200).json({
        success:true,
        product
    })
})


// Delete Product -- Admin
exports.deleteProduct = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }
    await product.deleteOne();
    
    res.status(200).json({
        success:true,
        message:"Product Deleted"
    })
});


// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req,res,next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const  product = await Product.findById(req.productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()    
    );

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
              (rev.rating = rating), (rev.comment = comment);
          });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });

});



// Get All Reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });