import * as mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: String,
    active: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

const brandSchema = new mongoose.Schema({
    name: String,
    image: String,
    active: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

const modelSchema = new mongoose.Schema({
    name: String,
    brand: Object,
    category: Object,
    image: String,
    active: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const categoryModel = mongoose.model('carcategories', categorySchema);
export const brandModel = mongoose.model('carbrands', brandSchema);
export const modelModel = mongoose.model('carmodels', modelSchema);
