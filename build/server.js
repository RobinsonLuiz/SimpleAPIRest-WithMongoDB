var server = require("./app");

server.default.app.listen(5000, () => console.log("Servidor rodando na 5000"));

process.once('SIGUSR2', () => {
    return server.default.closeDataBaseConnection('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
process.once('SIGINT', () => {
    return server.default.closeDataBaseConnection('conexão interrompida', () => {
        process.exit(0);
    });
});