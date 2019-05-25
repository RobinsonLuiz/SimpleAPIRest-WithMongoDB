import ProductController from './controller';
import * as httpStatus from 'http-status';
import { Router } from 'express';
import { Product } from './model';

const sendResponse = function(res, statusCode, data) {
    res.status(statusCode).json({'result': data});
};


class ProductRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getAll(req, res) {
        try {
            const response = await ProductController.getAll();
            if (response) sendResponse(res, httpStatus.OK, response);
            else sendResponse(res, httpStatus.OK, `Nenhum Produto encontrado`);
        } catch (err) {
            sendResponse(res, httpStatus.OK, `Problema ao buscar produtos`);
        }
    }

    async getById(req, res) {
        const { id }  = req.params;
        if (!id) {
            sendResponse(res, httpStatus.OK, 'Produto não foi encontrado');
        } else {
            try {
                const response = await ProductController.getById(id);
                if (response)
                    sendResponse(res, httpStatus.OK, response)
                else 
                    sendResponse(res, httpStatus.OK, "Produto não encontrado");
            } catch (err) {
                sendResponse(res, httpStatus.BAD_REQUEST, `Problema ao buscar produtos : ${err}`);
            }
        }
    }

    async create(req, res) {
        try {
            const user = req.body;
            const created = await ProductController.create(user);
            if (created)
                sendResponse(res, httpStatus.CREATED, "Produto criado com sucesso");
        } catch (err) {
            sendResponse(res, httpStatus.BAD_REQUEST, "Problema ao criar o produto");
        }
    }

    async update(req, res) {
        const { id }  = req.params;
        const product = req.body as Product;
        if (!id) {
            sendResponse(res, httpStatus.OK, 'Produto não foi encontrado');
        } else {
            try {
                const updated = await ProductController.update(id, product);
                if (updated)
                    sendResponse(res, httpStatus.OK, "Produto atualizado");
            } catch (err) {
                sendResponse(res, httpStatus.BAD_REQUEST, "Problema ao atualizar o produto");
            }
        }
    }

    async delete(req, res) {
        const { id }  = req.params;
        if (!id) {
            sendResponse(res, httpStatus.OK, 'Produto não foi encontrado');
        } else {
            try {
                const deleted = await ProductController.delete(id)
                if (deleted)
                    sendResponse(res, httpStatus.OK, "Produto deletado com sucesso");
            } catch (err) {
                sendResponse(res, httpStatus.BAD_REQUEST, "Problema ao excluir o produto");
            }
        }
    }

    public routes() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const productRoutes = new ProductRoutes();
productRoutes.routes();

export default productRoutes.router; 