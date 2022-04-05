const mongoose = require('../config/db.mongo');
const type = mongoose.Schema.Types;

const transformValue = (doc, ret) => {
    ret.id = ret._id;
}

const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: type.String
        },
        address: {
            type: type.String
        },
        is_deleted: {
            type: type.Boolean,
            default: false
        }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        toObject: {
            virtuals: true,
            versionKey: false,
            transform: transformValue,
        },
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: transformValue,
        },
    }
)

const Supplier = mongoose.model('Supplier', supplierSchema, 'Suppliers');
module.exports = {
    Supplier
}