import { Request, NextFunction, Response } from "express";
import session from "express-session";
import mongoose from "mongoose";
import Store from "connect-mongo";

const MongoStore = Store(session);

export default (): unknown => {
    const sessionFun = session({
        secret: "eds@dsafds#$dsfs",
        saveUninitialized: false,
        resave: false,
        name: "sessionID",
        cookie: {
            maxAge: (Date.now() / 1000) * 60 * 60 * 2, // 2 hour
            httpOnly: true
            // secure: true // Requires https connection
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection
            // ttl: 14 * 24 * 60 * 60 // = 14 days. Default
        })
    });
    return sessionFun;
};
