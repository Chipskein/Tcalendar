module.exports={
    DATABASE_URL:process.env.DATABASE_URL,
    DATABASE_CONFIG:{
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    }
}