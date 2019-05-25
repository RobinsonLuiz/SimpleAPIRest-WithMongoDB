let repository_1 = require("./repository");

class UserController {
    constructor() {}

    getAll() {
        return repository_1.default.find({});
    };

    getById(id) {
        return repository_1.default.findById(id);
    };

    getByEmail(email) {
        return repository_1.default.findOne({ email: email });
    };

    create(user) {
        return repository_1.default.create(user);
    };

    update(id, user) {
        return repository_1.default.findByIdAndUpdate(id, user);
    };

    delete(id) {
        return repository_1.default.remove({ _id: id });
    };
}

exports.default = new UserController();