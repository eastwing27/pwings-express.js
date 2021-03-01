const
    express = require('express'),
    session = require("express-session"),
    MongoStore = require("connect-mongo")(session),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    yargs = require('yargs/yargs'),
    { hideBin } = require('yargs/helpers');

const 
    auth = require('./routes/auth'),
    users = require('./routes/users');
    transactions = require('./routes/transactions');

const argv = yargs(hideBin(process.argv)).argv;
    
const passport = require('./auth/setup');

const app = express();

const 
    host = argv.host || '127.0.0.1',
    port = argv.port || 3000;

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));

 app.use(
    session({
        secret: "very secret this is",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

 app.use((request, response, next) => {
    console.log(`${request.socket.remoteAddress} -> ${request.method} ${request.originalUrl}`);
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => res.send('hi!'));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/transactions", transactions);

app.use((request, response, next) => {
    console.error(`Not found URL: ${request.url}`);
    response.status(404).send({ error: 'Not found' });
});

mongoose.connect("mongodb://localhost:27017/pwdb", { useUnifiedTopology: true }, err => {
    if (err)
        return console.error(err);

    app.listen(port, host, () => console.log(`Listening ${host}:${port}...`));
});