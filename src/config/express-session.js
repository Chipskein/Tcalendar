const sessionSecret=process.env.EXPRESS_SESSION_SECRET;
module.exports={
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}