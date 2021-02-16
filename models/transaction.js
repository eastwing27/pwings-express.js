const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    time: Date,
    sender: String,
    reciever: String,
    amount: Number,
    success: Boolean,
    resultMessage: String
});

transactionSchema.methods.create = (sender, reciever, amount) => {
    this.sender = sender;
    this.reciever = reciever;
    this.amount = amount;
}

transactionSchema.methods.accept = () => {
    this.success = true;
    this.resultMessage = 'Accepted';
}

transactionSchema.methods.reject = (reason) => {
    this.success = false;
    this.resultMessage = reason;
}

module.exports = mongoose.model("Transaction", transactionSchema);