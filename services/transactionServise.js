const
    prepare = require("../helpers/transactionHelper").prepare;
    rejectTransaction = require("../helpers/transactionHelper").reject,
    acceptTransaction = require("../helpers/transactionHelper").accept,

    Transaction = require("../models/transaction");

module.exports.get = async user => 
    await Transaction.find({$or: [{sender: user.email}, {reciever: user.email}]});

module.exports.create = (user, dto) => 
    new Promise(async (resolve, reject) => {
        if (!dto || !dto.reciever || !dto.amount)
            return reject('invalid data');
        
        if (user.email === dto.reciever)
            return reject("You can't send PW to yourself ");

        const transaction = new Transaction();
        prepare(transaction, user.email, dto.receiver, dto.amount);
        
        if (!user.balance || user.balance < dto.amount){
            const message = 'Not enough Parrot Wings';
            await rejectTransaction(transaction, message);
            return reject(message);
        }

        await User.findOne({email: dto.reciever})
            .then(
                async reciever => {
                    transferPw(user, reciever, transaction.amount);
                    await acceptTransaction(transaction);
                    return resolve(transaction);
                },
                async err => {
                    await rejectTransaction(transaction, err);
                    return reject(err);
                });
    })