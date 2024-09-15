require("dotenv").config();
const Razorpay = require("razorpay");

const RzPay = new Razorpay({
    key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
    key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
});

export default RzPay;
