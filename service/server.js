require('dotenv').config();
const PROTO_PATH = './protos/suppliers.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const routers = require('./routers');
const server_url = process.env.SERVER_URL || '127.0.0.1:3001';


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    // defaults: true,
    // objects: true
})

const supplierProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()
server.addService(
    supplierProto.Supplier.SupplierService.service,
    routers
)

// const suppliers = [
//     {
//         id: 'a68b823c-7ca6-44bc-b721-fb4d5312cafc',
//         name: 'Tokopaedi',
//         address: 'Jln. Merdeka barat No.2'
//     },
//     {
//         id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92b7',
//         name: 'LupaBapak',
//         address: 'Jln. Cendrawasih No.34'
//     }
// ]

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
server.bindAsync(
    server_url,
    grpc.ServerCredentials.createInsecure(),
    (err) => {
        if (err) return console.log(err);
        server.start();
        console.log(`Grpc server is running at ${server_url}`);
    }
);
// const main = () => {
//     const server = new grpc.Server()
//     server.addService(supplierProto.SupplierService.service, { getAll, createSupplier, update, remove })
//     server.bindAsync(server_url, grpc.ServerCredentials.createInsecure(), () => {
//         console.log(`Server running at ${server_url}`)
//         server.start()
//     })
// }

// main()