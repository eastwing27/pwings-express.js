module.exports.transferPw = (sender, reciever, amount) =>
{
    if (!sender.balance)
        sender.balance = 0;

    if (!reciever.balance)
        reciever.balance = 0;

    sender.balance -= amount;
    reciever.balance += amount;

    sender.save();
    reciever.save();
}

module.exports.getShortDTO = user => {
    return {
        name: user.name,
        email: user.email
    };
} 

module.exports.getDTO = user => {
    return {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        balance: user.balance
    };
}

module.exports.refill = (user, amount) => 
    new Promise((resolve, reject) => {
        if (!user)
            return reject("User is not set!");

        if (!amount)
            return reject("Amount is not set!");

        const numAmount = parseInt(amount);
        if (!(Number.isInteger(numAmount) && amount > 0))
            return reject ("Invalid amount value! Please set positive integer value");

        if (!user.balance)
            user.balance = 0;
        user.balance += numAmount;

        return user.save()
            .then(
                _ => resolve(user.balance),
                err => { 
                    console.log(err);
                    return reject(err);
                });
    })