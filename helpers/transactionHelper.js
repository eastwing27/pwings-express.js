const moment = require('moment');

async function resolveAndSave(transaction, reason, result) {
    transaction.success = result;
    transaction.resultMessage = reason;
    transaction.time = moment.utc(new Date());

    await transaction.save((err, doc) =>{
        if (!!err)
            console.error(err);
    });
}

module.exports.prepare = (transaction, sender, reciever, amount) => {
    transaction.sender = sender;
    transaction.reciever = reciever;
    transaction.amount = amount;
}

module.exports.reject = async (transaction, reason) => 
    await resolveAndSave(transaction, reason, false);

module.exports.accept = async (transaction) => 
    await resolveAndSave(transaction, 'accepted', true);