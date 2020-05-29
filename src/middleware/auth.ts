import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

interface SessionObject {
    id: string;
    date: number;
}

const auth = (
    req: Request,
    res: Response,
    next: NextFunction
): Response<any> | void => {
    if (req.originalUrl === "/login" || req.originalUrl === "/register") {
        return next();
    }
    if (req.session && req.session.sessionId) {
        const token = req.header("token");
        if (token) {
            try {
                const decoded = <SessionObject>(
                    jwt.verify(token, "sadsds%asdhj&&22@sxfsdf")
                );

                const [userId, timeStamp] = req.session.sessionId.split("$$$");
                console.log("Token=============>", userId, timeStamp);
                console.log("JWT=============>", decoded);
                if (
                    decoded.id === userId &&
                    String(decoded.date) === timeStamp
                ) {
                    req.userId = decoded.id;
                    return next();
                }
            } catch (e) {
                console.error(e);
                res.status(401).send({ message: "Invalid Token" });
            }
        }
    }
    return res.status(401).json({ message: "Not Authorized" });
};

export default auth;
