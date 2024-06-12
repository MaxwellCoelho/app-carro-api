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
    average: Number,
    val_length: Number,
    image: String,
    thumb: String,
    url: String,
    active: Boolean,
    review: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

const modelSchema = new mongoose.Schema({
    name: String,
    brand: Object,
    category: Object,
    generation: Object,
    yearStart: Number,
    yearEnd: Number,
    average: Number,
    val_length: Number,
    image: String,
    thumb: String,
    url: String,
    active: Boolean,
    review: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

const versionSchema = new mongoose.Schema({
    engine: Number,
    fuel: String,
    gearbox: String,
    years: Array,
    complement: String,
    model: Object,
    image: String,
    thumb: String,
    active: Boolean,
    review: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const categoryModel = mongoose.model('carcategories', categorySchema);
export const brandModel = mongoose.model('carbrands', brandSchema);
export const modelModel = mongoose.model('carmodels', modelSchema);
export const versionModel = mongoose.model('carversions', versionSchema);
