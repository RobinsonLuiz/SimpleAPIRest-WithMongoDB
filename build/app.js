let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let hateoasLinker = require("express-hateoas-links");
let mongoDB = require("./config/db");
let userRoutes = require("./modules/user/routes");
// let productRoutes = require("./modules/product/routes");

class App {
    constructor() {
        this._app = express();
        this.middleware();
        this.routes();
        this._database = new mongoDB.default();
        this.dataBaseConnection();
    }

    dataBaseConnection() {
        this._database.createConnection();
    };

    closeDataBaseConnection(message, callback) {
        this._database.closeConnection(message, callback);
    };

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(hateoasLinker);
    };

    routes() {
        this.app.use("/api/v1/user", userRoutes.default);
        // this.app.use("/api/v1/product", productRoutes.default);
    };

    get app() {
        return this._app;
    }
}

exports.default = new App();