import UserController from './controller';
import * as httpStatus from 'http-status';
import { User } from './model';
import { Router } from 'express';

const sendResponse = function(res, statusCode, data) {
    res.status(statusCode).json({'result': data});
};

class UserRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getAll(req, res) {
        const response = await UserController.getAll();
        if (response) sendResponse(res, httpStatus.OK, response);
        else sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios`);
        // .then((users) => sendResponse(res, httpStatus.OK, users))
        // .catch((error) => sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios : ${error}`));
    }

    async getById(req, res) {
        const { id } = req.params
        if (!id) {
            sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
        } else {
            try {
                const response = await UserController.getById(id);
                if (response)
                    sendResponse(res, httpStatus.OK, response)
                else 
                    sendResponse(res, httpStatus.OK, "Usuário não encontrado");
            } catch (err) {
                sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar usuarios : ${err}`);
            }
            // UserController
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
                const response = await UserController.getByEmail(email);
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
        const user = req.body as User;
        UserController
        .create(user)
        .then(user => sendResponse(res, httpStatus.CREATED, "Usuario criado com sucesso"))
        .catch((error) => sendResponse(res, httpStatus.CONFLICT, `Problema ao inserir o usuario : ${error}`));
    }

    async update(req, res) {
        const { id } = req.params;
        const user = req.body as User;
        if (!(await UserController.getById(id))) {
            sendResponse(res, httpStatus.OK, 'Usuário não foi encontrado');
        } else {
            UserController
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
            UserController
            .delete(id)
            .then((result) => sendResponse(res, httpStatus.OK, result))
            .catch((error) => sendResponse(res, httpStatus.BAD_REQUEST, "Problema ao deletar o usuario"));
        }
    }

    public routes() {
       this.router.get('/' , this.getAll);
       this.router.get('/:id', this.getById);
       this.router.post('/', this.create);
       this.router.put('/:id', this.update);
       this.router.delete('/:id', this.delete);
    }
}

const userRoutes = new UserRoutes();
userRoutes.routes();

export default userRoutes.router;