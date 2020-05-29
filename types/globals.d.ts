import { Request, Session as ISession } from "express";

interface Session extends ISession {
    sessionId: strig;
    destroy: () => void;
}

declare module "express" {
    export interface Request extends Request {
        // session?: {
        //     // replace with express.session
        //     sessionId: strig;
        //     destroy: () => void;
        // };
        Session?: Session;
        userId?: string;
    }
}
