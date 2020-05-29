import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import bcrypt from "bcryptjs";
import { setSession } from "../utils/auth";

import IControllerBase from "../interfaces/IControllerBase.interface";
import UserCredential from "../models/users.credentials";

class LoginController implements IControllerBase {
    public path = "/login";
    public router = express.Router(); // TODO: check how it works

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post(
            this.path,
            [
                check("username", "Please Enter a Valid Username")
                    .not()
                    .isEmpty(),
                check(
                    "password",
                    "Please enter a valid password. Min Length should be 6 digit"
                ).isLength({
                    min: 6
                })
            ],
            this.index
        );
    }

    index = async (req: Request, res: Response): Promise<any> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const user = await UserCredential.findOne({
            username: req.body.username
        });

        if (!user) {
            return res.status(400).json({
                msg: "Invalid Username or password"
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        }

        setSession(req, res, user.username);
    };
}

export default LoginController;
