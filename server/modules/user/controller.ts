import Repository from './repository';
import { User } from './model';

class UserController {

    constructor() {}

    getAll(): any {
        return Repository.find({});
    }

    getById(id: string): any {
        return Repository.findById(id);
    }

    getByEmail(email): any {
        return Repository.findOne({ email });
    }

    create(user): Promise<any> {
        return Repository.create(user);
    }

    update(id, user: any) {
        return Repository.findByIdAndUpdate(id, user);
    }

    delete(id) {
        return Repository.remove({_id: id });
    }

}

export default new UserController();