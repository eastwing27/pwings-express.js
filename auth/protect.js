const User = require("../models/user");

module.exports.protect = (userToken) => 
    new Promise((resolve, reject) => {
        if (!userToken)
            return reject('Unauthorized');
        
        return User.findOne({email: userToken.email})
            .then(
                doc => resolve(doc),
                err => reject(`User ${userToken.email} not found`));
    });

module.exports.protectByEmail = (userToken, email) => 
    new Promise((resolve, reject) => this.protect(userToken)
        .then(
            doc => userToken.email != email && !doc.isAdmin
                ? reject(`User ${userToken.email} is not allowed to do that`)
                : resolve(doc),
            err => reject(err)));
