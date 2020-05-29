import express, { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase.interface";

class UserController implements IControllerBase {
    public path = "/logout";
    public router = express.Router(); // TODO: check how it works

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post(this.path, this.index);
    }

    index = async (req: Request, res: Response): Promise<any> => {
        if (req.session) {
            req.session.destroy(() => null);
        }
        res.status(200).json({
            msg: "Logout successfully"
        });
    };
}

export default UserController;
