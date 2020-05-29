import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import bcrypt from "bcryptjs";

import { setSession } from "../utils/auth";
import IControllerBase from "../interfaces/IControllerBase.interface";
import CreateUser from "../controllers/register.controller";
import UserCredential from "../models/users.credentials";
// import { IUserCredential } from "../models/users.credentials";

class RegisterController implements IControllerBase {
    public path = "/register";
    public router = express.Router();

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

        // console.log("useruseruser", user);
        const user = await UserCredential.findOne({
            username: req.body.username
        });
        // console.log("useruseruser", user);
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const newUser = await CreateUser({
            username: req.body.username,
            password
        });
        setSession(req, res, newUser.username);
    };
}

export default RegisterController;
