import * as mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: String
});

const brandSchema = new mongoose.Schema({
    name: String,
    image: String
});

const modelSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    image: String
});

export const categoryModel = mongoose.model('carcategories', categorySchema);
export const brandModel = mongoose.model('carbrands', brandSchema);
export const modelModel = mongoose.model('carmodels', modelSchema);
