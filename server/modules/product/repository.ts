import * as mongoose from 'mongoose';
import ProductSchema from './schema';

export default mongoose.model('Product', ProductSchema);