import Repository from './repository';
import { Product } from './model';

class ProductController {

    constructor() {}

    getAll() {
        return Repository.find({});
    }

    getById(id) {
        return Repository.findById(id);
    }

    create(product) {
        return Repository.create(product);
    }

    update(id, product: Product) {
        return Repository.findByIdAndUpdate(id, product);
    }

    delete(id) {
        return Repository.remove(id);
    }

}

export default new ProductController();