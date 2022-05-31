import * as mongoose from 'mongoose';

const customersSchema = new mongoose.Schema({
    name: String,
    role: Object,
    active: Boolean,
    created_when: String
});

const rolesSchema = new mongoose.Schema({
    name: String,
    level: Number
});

export const customerModel = mongoose.model('customers', customersSchema);
export const roleModel = mongoose.model('roles', rolesSchema);