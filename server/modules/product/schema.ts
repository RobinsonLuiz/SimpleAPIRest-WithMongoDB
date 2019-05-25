import * as mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    valor: {type: Number, required: true},
    descricao: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

export default ProductSchema;