import * as mongoose from 'mongoose';

const adsSchema = new mongoose.Schema({
    url: String,
    title: String,
    description: String,
    images: Array,
    keywords: Array,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const adsModel = mongoose.model('ads', adsSchema);