require('dotenv').config()
const PROTO_PATH = './protos/suppliers.proto'
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const { v4: uuidv4 } = require('uuid')

const server_url = process.env.SERVER_URL || '127.0.0.1:3001';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const supplierProto = grpc.loadPackageDefinition(packageDefinition)


const suppliers = [
    {
        id: 'a68b823c-7ca6-44bc-b721-fb4d5312cafc',
        name: 'Tokopaedi',
        address: 'Jln. Merdeka barat No.2'
    },
    {
        id: '34415c7c-f82d-4e44-88ca-ae2a1aaa92b7',
        name: 'LupaBapak',
        address: 'Jln. Cendrawasih No.34'
    }
]

const getAll = (_, callback) => {
    callback(null, { suppliers })
}

const insert = (call, callback) => {
    let supplier = call.request

    supplier.id = uuidv4()
    suppliers.push(supplier)
    callback(null, supplier)
}

const update = (call, callback) => {
    let existingSupplier = suppliers.find(data => data.id == call.request.id)

    if (!existingSupplier) {
        callback({ code: grpc.status.NOT_FOUND, message: 'Supplier Not Found' })
    } else {
        existingSupplier.name = call.request.name || existingSupplier.name
        existingSupplier.address = call.request.address || existingSupplier.address
        callback(null, existingSupplier)
    }
}

const remove = (call, callback) => {
    let existingSupplierIndex = suppliers.findIndex(data => data.id == call.request.id)

    if (existingSupplierIndex == -1) {
        callback({ code: grpc.status.NOT_FOUND, details: 'Supplier Not Found' })
    } else {
        suppliers.splice(existingSupplierIndex, 1)
        callback(null, {})
    }
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const main = () => {
    const server = new grpc.Server()
    server.addService(supplierProto.SupplierService.service, { getAll, insert, update, remove })
    server.bindAsync(server_url, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Server running at ${server_url}`)
        server.start()
    })
}

main()