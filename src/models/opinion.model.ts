import * as mongoose from 'mongoose';

const opinionSchema = new mongoose.Schema({
    customer: Object,
    model: Object,
    year_model: String,
    fuel: String,
    engine: String,
    year_bought: String,
    kept_period: Number,
    km_bought: Number,
    car_val_inside: String,
    car_val_outside: String,
    car_val_confort: String,
    car_val_safety: String,
    car_val_consumption: String,
    car_val_durability: String,
    car_val_worth: String,
    car_title: String,
    car_positive: String,
    car_negative: String,
    brand_val_services: String,
    brand_val_people: String,
    brand_val_prices: String,
    brand_val_credibility: String,
    brand_val_satisfaction: String,
    brand_title: String,
    brand_positive: String,
    brand_negative: String,
    active: Boolean,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const opinionModel = mongoose.model('opinioncar', opinionSchema);