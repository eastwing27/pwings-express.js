const 
    express = require("express"),
    router = express.Router(),

    User = require("../models/user"),
    Transaction = require("../models/transaction"),

    protect = require("../auth/protect").protect,

    prepare = require("../helpers/transactionHelper").prepare;
    reject = require("../helpers/transactionHelper").reject,
    accept = require("../helpers/transactionHelper").accept,

    transferPw = require("../helpers/userHelper").transferPw;

router.get("/", (request, response) =>
    protect(request.user)
        .then(
            user => Transaction.find({$or: [{sender: user.email}, {reciever: user.email}]}, (_, docs) =>
                response.status(200).send(docs)),
            err => response.status(403).send({message: err}))
);

router.post("/new", (request, response) => 
    protect(request.user)
        .then(
            sender => {
                let body = request.body;
                if (!body || !body.reciever || !body.amount)
                    return response.status(400).send({message: 'invalid data'});
                
                if (sender.email == body.reciever)
                    return response.status(400).send({message: "You can't send PW to yourself "});

                var transaction = new Transaction();
                prepare(transaction, sender.email, body.receiver, body.amount);
                
                if (!sender.balance || sender.balance < body.amount){
                    var message = 'Not enough Parrot Wings';
                    reject(transaction, message);
                    return response.status(400).send({message: message});
                }

                User.findOne({email: body.reciever})
                    .then(
                        reciever => {
                            transferPw(sender, reciever, transaction.amount);
                            accept(transaction);
                            return response.status(200).send(transaction);
                        },
                        err => {
                            reject(transaction, err);
                            return response.status(400).send({message: err});
                        });
            },
            err => response.status(403).send({message: err}))
);

module.exports = router;
