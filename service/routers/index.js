const supplierController = require('../controller/supplier.controller');
module.exports = {
    getSupplierList: supplierController.getAll,
    createSupplier: supplierController.createSupplier,
    updateSupplier: supplierController.update,
    deleteSupplier: supplierController.remove,
}