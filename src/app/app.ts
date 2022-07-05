import express, {Application, NextFunction, Request, Response} from "express"
import {Constant} from "./constants";
import bodyParser from "body-parser";
import {registerRoutes} from "./routes";
import session from "express-session";


class App{
    app: Application;
    constructor() {
        this.app = express()
        this.middleware();
        this.setupApiRoutes();
    }

    /**
     * Add all middleware
     */
    private middleware(): void {
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit: 1000}));
        this.app.use(session({secret: Constant.secret_key, saveUninitialized: true, resave: true}));//Todo find saveUninitialized n resave on google
       
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, credentials, withCredentials");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            next();
        });
    }

    /**
     * Register all routes
     */
    private setupApiRoutes(): void {
        registerRoutes(this.app);
    }
}


export default new App().app;