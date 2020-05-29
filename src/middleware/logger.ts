import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (
    req: Request,
    resp: Response,
    next: NextFunction
): void => {
    // eslint-disable-next-line no-console
    console.log("Request logged:", req.method, req.path);
    next();
};

export default loggerMiddleware;
