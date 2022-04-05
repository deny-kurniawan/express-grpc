require('dotenv').config();
const PROTO_PATH = './protos/suppliers.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PromisifyAll = require('./utils/promisifyAll');

const server_url = process.env.SERVER_URL || '127.0.0.1:3001';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const { Supplier } = grpc.loadPackageDefinition(packageDefinition);
// const client = new supplierService.SupplierService(
//     server_url,
//     grpc.credentials.createInsecure()
// )

module.exports = {
    SupplierService: PromisifyAll(new Supplier.SupplierService(server_url, grpc.credentials.createInsecure()))
}