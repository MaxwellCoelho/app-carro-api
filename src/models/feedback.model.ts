import * as mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    page: String,
    valuation: Number,
    comments: String,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const feedbackModel = mongoose.model('feedback', feedbackSchema);