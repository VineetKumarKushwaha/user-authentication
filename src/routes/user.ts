import express, { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase.interface";

class UserController implements IControllerBase {
    public path = "/user";
    public router = express.Router(); // TODO: check how it works

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post(this.path, this.index);
    }

    index = async (req: Request, res: Response): Promise<any> => {
        if (req.session) {
            return res.status(200).json({
                msg: `You username is ${req.userId}`
            });
        }
        return res.status(401).json({
            msg: "Session expired."
        });
    };
}

export default UserController;
