import * as mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: String,
    created_by: String,
    created_when: String,
    active: Boolean
});

const brandSchema = new mongoose.Schema({
    name: String,
    image: String,
    created_by: String,
    created_when: String,
    active: Boolean
});

const modelSchema = new mongoose.Schema({
    name: String,
    brand: String,
    category: String,
    fab_year: Number,
    image: String,
    created_by: String,
    created_when: String,
    active: Boolean
});

export const categoryModel = mongoose.model('carcategories', categorySchema);
export const brandModel = mongoose.model('carbrands', brandSchema);
export const modelModel = mongoose.model('carmodels', modelSchema);
