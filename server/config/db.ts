import * as mongoose from 'mongoose';

class Database {
    private DB_URL = 'mongodb://127.0.0.1/ts-rest-api';
    private DB_CONNECTION;

    constructor() {}
    createConnection() {
        mongoose.set('useCreateIndex', true);
        mongoose.connect(this.DB_URL, { useNewUrlParser: true });
        this.logger(this.DB_URL);
    }

    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => {
            console.log(`Conectado ao banco de dados ${uri}`);
        });
        this.DB_CONNECTION.on('error', (error) => {
            console.log(`Erro na conexão para o banco de dados ${uri} - ${error}`);
        });
        this.DB_CONNECTION.on('disconnected', (error) => {
            console.log(`Desconectado ${uri}`);
        });
    }

    closeConnection(message, callback) {
        this.DB_CONNECTION.close(() => {
            console.log("Fechou a conexão");
            callback();
        });
    }
}


export default Database;