const express = require("express");
const cors = require("cors");
const { userServiceProxy } = require("./configs/UserproxyConfig"); 
const { customerServiceProxy } = require("./configs/CustomerproxyConfig");
const { bookServiceProxy } = require("./configs/BookproxyConfig");
const { salebookServiceProxy } = require("./configs/SaleBookproxyConfig");
const { feedbackServiceProxy } = require("./configs/FeedbackproxyConfig");

const app = express();

app.use(cors());
app.use(express.json());

//User
app.use("/register", userServiceProxy); 
app.use("/login", userServiceProxy);
app.use("/getdetails", userServiceProxy);

//Customer
app.use("/customer/register", customerServiceProxy);
app.use("/customer/login", customerServiceProxy);
app.use("/customer/getlist", customerServiceProxy);
app.use("/customer/edit", customerServiceProxy);
app.use("/customer/destory", customerServiceProxy);
app.use("/customer/getdetails", customerServiceProxy);


//Book
app.use("/book/store", bookServiceProxy);
app.use("/book/getlist", bookServiceProxy);

//SaleBook
app.use("/salebook/store", salebookServiceProxy);
app.use("/salebook/getlist", salebookServiceProxy);

//FeedBack
app.use("/feedback/store", feedbackServiceProxy);
app.use("/feedback/getlist", feedbackServiceProxy);

app.listen(8000, () => {
    console.log("Gateway is Listening on Port 8000");
});
