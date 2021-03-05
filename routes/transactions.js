const 
    express = require("express"),
    router = express.Router(),

    protect = require("../auth/protect").protect,

    service = require("../services/transactionServise");


router.get("/", (request, response) =>
    protect(request.user)
        .then(
            async user => await service.get(user),
            err => response.status(403).send({message: err}))
);

router.post("/new", (request, response) => 
    protect(request.user)
        .then(
            sender => service.create(sender, request.body),
            err => response.status(403).send({message: err}))
);

module.exports = router;
