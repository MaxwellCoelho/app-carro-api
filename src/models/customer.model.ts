import * as mongoose from 'mongoose';

const customersSchema = new mongoose.Schema({
    name: String,
    role: Object,
    email: String,
    url: String,
    avatar: Object,
    password: String,
    password_reset_token: String,
    password_reset_expires: Date,
    active: Boolean,
    favorites: Array,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

const rolesSchema = new mongoose.Schema({
    name: String,
    level: Number,
    created_by: Object,
    created: String,
    modified_by: Object,
    modified: String
});

export const customerModel = mongoose.model('customers', customersSchema);
export const roleModel = mongoose.model('roles', rolesSchema);