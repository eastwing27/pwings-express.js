const moment = require('moment');

const { resolve } = require("path");

function resolveAndSave(transaction, reason, result) {
    transaction.success = result;
    transaction.resultMessage = reason;
    transaction.time = moment.utc(new Date());

    transaction.save((err, doc) =>{
        if (!!err)
            console.error(err);
    });
}

module.exports.prepare = (transaction, sender, reciever, amount) => {
    transaction.sender = sender;
    transaction.reciever = reciever;
    transaction.amount = amount;
}

module.exports.reject = (transaction, reason) => 
    resolveAndSave(transaction, reason, false);

module.exports.accept = (transaction) => 
    resolveAndSave(transaction, 'accepted', true);