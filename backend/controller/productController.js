const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError")


// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req,res,next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})


// Get all Products
exports.getAllProducts = catchAsyncError(async (req,res) =>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})


exports.getProductDetails = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler("Product not Found",404));
    }
    
    res.status(200).json({
        success:true,
        product 
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
})