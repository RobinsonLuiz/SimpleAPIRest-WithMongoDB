let { Router } = require('express');
let { User } = require('./model');
let httpStatus = require('http-status');
let UserController = require('./controller');

const sendResponse = function(res, statusCode, data) {
    res.status(statusCode).json({ 'result': data });
};

class UserRoutes {

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getAll(req, res) {
        const response = await UserController.default.getAll();
        if (response) sendResponse(res, httpStatus.OK, response);
        else sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios`);
        // .then((users) => sendResponse(res, httpStatus.OK, users))
        // .catch((error) => sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios : ${error}`));
    }

    async getById(req, res) {
        const { id } = req.params.id
        if (!id) {
            sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
        } else {
            try {
                let response = await UserController.default.getById(id);
                if (response)
                    sendResponse(res, httpStatus.OK, response)
                else
                    sendResponse(res, httpStatus.OK, "Usuário não encontrado");
            } catch (err) {
                sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios : ${err}`);
            }
            // UserController.default
            // .getById(id)
            // .then((user) => sendResponse(res, httpStatus.OK, user))
            // .catch((error) => console.log(`Erro: ${error}`));
        }
    }

    async getByEmail(req, res) {
        const { email } = req.params.email;
        if (!email) {
            sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
        } else {
            try {
                const response = await UserController.default.getByEmail(email);
                if (response)
                    sendResponse(res, httpStatus.OK, response)
                else
                    sendResponse(res, httpStatus.OK, "Usuário não encontrado");
            } catch (err) {
                sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios : ${err}`);
            }
        }
    }

    create(req, res) {
        const user = req.body;
        UserController.default
            .create(user)
            .then(user => sendResponse(res, httpStatus.CREATED, "Usuario criado com sucesso"))
            .catch((error) => sendResponse(res, httpStatus.CONFLICT, `Problema ao inserir o usuario : ${error}`));
    }

    async update(req, res) {
        const { id } = req.params;
        const user = req.body;
        if (!(await UserController.default.getById(id))) {
            sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
        } else {
            UserController.default
                .update(id, user)
                .then((user) => sendResponse(res, httpStatus.NO_CONTENT, "Usuário atualizado"))
                .catch((error) => sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao atualizar o usuario = ${error}`));
        }
    }

    delete(req, res) {
        const { id } = req.params;
        if (!id) {
            sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
        } else {
            UserController.default
                .delete(id)
                .then((result) => sendResponse(res, httpStatus.OK, result))
                .catch((error) => sendResponse(res, httpStatus.BAD_REQUEST, "Problema ao deletar o usuario"));
        }
    }

    routes() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

exports.default = userRoutes.router;