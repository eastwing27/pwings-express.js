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