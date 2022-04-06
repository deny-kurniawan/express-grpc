const grpc = require('@grpc/grpc-js')
const { Supplier } = require('../schema/supplier.schema');

const createSupplier = async (call, callback) => {
    const request = call.request;

    try {
        const suppliers = await Supplier.create(request);

        callback(null, JSON.parse(JSON.stringify(suppliers)));
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            details: JSON.stringify({
                message: error.message
            })
        });
    }
}

const getAll = async (_, callback) => {
    try {
        const suppliers = await Supplier.find({ is_deleted: false }).sort({ _id: -1 });

        callback(null, { suppliers });
    } catch (error) {
        console.log(error)
        callback({
            code: grpc.status.INTERNAL,
            details: JSON.stringify({
                message: error.message
            })
        });
    }
}

const update = async (call, callback) => {
    const req = call.request
    try {
        let existingSupplier = await Supplier.findById({ _id: req.id, is_deleted: false })

        if (!existingSupplier) {
            callback({ code: grpc.status.NOT_FOUND, details: JSON.stringify({ message: 'Supplier Not Found' }) })
        } else {
            let updatedSupplier = await Supplier.findOneAndUpdate({ _id: req.id }, req, { new: true })
            callback(null, updatedSupplier)
        }

    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            details: JSON.stringify({
                message: error.message
            })
        });
    }
}

const remove = async (call, callback) => {
    const req = call.request

    try {
        let existingSupplier = await Supplier.findById({ _id: req.id, is_deleted: false })

        if (!existingSupplier) {
            callback({ code: grpc.status.NOT_FOUND, details: 'Supplier Not Found' })
        } else {
            const deletedSupplier = await Supplier.findOneAndDelete({ _id: req.id })
            callback(null, deletedSupplier)
        }
    } catch (error) {
        callback({
            code: grpc.status.INTERNAL,
            details: JSON.stringify({
                message: error.message
            })
        });
    }
}

module.exports = {
    createSupplier,
    getAll,
    update,
    remove,
}