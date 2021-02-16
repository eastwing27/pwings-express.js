const express = require("express");
const router = express.Router();
const User = require("../models/user");

const 
    protect = require("../auth/protect").protect,
    protectByEmail = require("../auth/protect").protectByEmail,

    refill = require("../helpers/userHelper").refill,
    getDTO = require("../helpers/userHelper").getDTO,
    getShortDTO = require("../helpers/userHelper").getShortDTO;

router.get("", (request, response) => 
    protect(request.user)
        .then(() => User.find((_, docs) => 
            response
                .status(200)
                .send(docs.map(d => getShortDTO(d)))),
            err => response.status(403).send({message: err}))
);

router.get("/search/:searchString", (request, response) => 
    protect(request.user)
        .then(() => User.find({$or:[
            {email: {$regex: request.params["searchString"], $options: "i"}},
            {name: {$regex: request.params["searchString"], $options: "i"}}
        ]})
        .then(
            docs => response.status(200).send(docs.map(d => getShortDTO(d))),
            err => response.status(500).send({message: err})))
);

router.get("/:email", (request, response) => 
    protectByEmail(request.user, request.params["email"])
        .then(
            () => {
                var searchedEmail = request.params["email"];
                User.findOne({"email": searchedEmail})
                .then(  
                    doc => response.status(200).send(getDTO(doc)),
                    err => response.status(404).send({message: err}));
            },
            err => response.status(403).send({message: err}))
);

router.put("/refill/:amount", (request, response) =>
    protect(request.user)
        .then(
            user => 
                refill(user, request.params["amount"])
                    .then(
                        balance => response.status(200).send({balance: balance}),
                        err => response.status(500).send({message: err})
                    ),
            err => response.status(403).send({message: err}))
);
    
module.exports = router;