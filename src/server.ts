import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import App from "./app";
import loggerMiddleware from "./middleware/logger";
import Connect from "./connect";
import mongoSession from "./middleware/session";
import auth from "./middleware/auth";
// import PostsController from "./controllers/posts/posts.controller";
import RegisterController from "./routes/register";
import LoginController from "./routes/login";
import LogoutController from "./routes/logout";
import UserController from "./routes/user";

const app = new App({
    port: 7000,
    controllers: [
        new LogoutController(),
        new UserController(),
        new LoginController(),
        new RegisterController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware,
        cookieParser(),
        mongoSession(),
        auth
    ]
});

const db = "mongodb://test:test@mongo:27017/nodeauth";
Connect({ db });

app.listen();
