import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const setSession = (
    req: Request,
    res: Response,
    username: string
): Response<any> | void => {
    const date = Date.now();
    if (req.session) {
        req.session.sessionId = username + "$$$" + date;
    }
    const payload = {
        id: username,
        date
    };
    try {
        const token = jwt.sign(payload, "sadsds%asdhj&&22@sxfsdf", {
            expiresIn: 60 * 60 * 2
        });
        req.userId = username;
        console.log(
            "Token Created=============>",
            req.session ? req.session.sessionId : "Missing"
        );
        console.log("JWT Created=============>", token);
        return res.status(200).json({
            token
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Error in creating session");
    }
};
