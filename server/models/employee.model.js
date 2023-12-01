import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
    names: {
        type: String,
        required: true
    },
    surnames: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    tcontract: {
        type: String,
        required: true
    },
    user: { type: Schema.ObjectId, ref: 'user'},

    
});

export const EmployeeModel = model('employee', EmployeeSchema, 'employees');

