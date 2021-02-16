const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    balance: Number
});

// userSchema.methods.getShortDTO = function() {
//     return {
//         name: this.name,
//         email: this.email
//     };
// } 

// userSchema.methods.getDTO = function() {
//     return {
//         name: this.name,
//         email: this.email,
//         isAdmin: this.isAdmin,
//         balance: this.balance
//     };
// }

module.exports = mongoose.model("User", userSchema);