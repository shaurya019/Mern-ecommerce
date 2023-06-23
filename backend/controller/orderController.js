const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {


});






// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {


});




// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {


});




// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

});




// update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) =>  {

});





// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

});