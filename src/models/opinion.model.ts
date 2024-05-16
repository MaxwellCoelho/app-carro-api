import * as mongoose from 'mongoose';

const opinionCarSchema = new mongoose.Schema({
    model: Object,
    version: Object,
    year_model: String,
    year_bought: String,
    kept_period: Number,
    km_bought: Number,
    car_val_inside: Number,
    car_val_outside: Number,
    car_val_confort: Number,
    car_val_safety: Number,
    car_val_consumption: Number,
    car_val_durability: Number,
    car_val_worth: Number,
    car_val_average: Number,
    car_title: String,
    car_positive: String,
    car_negative: String,
    active: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

const opinionBrandSchema = new mongoose.Schema({
    brand: Object,
    brand_val_services: Number,
    brand_val_people: Number,
    brand_val_prices: Number,
    brand_val_credibility: Number,
    brand_val_satisfaction: Number,
    brand_val_average: Number,
    brand_title: String,
    brand_positive: String,
    brand_negative: String,
    active: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const opinionCarModel = mongoose.model('opinioncar', opinionCarSchema);
export const opinionBrandModel = mongoose.model('opinionbrand', opinionBrandSchema);