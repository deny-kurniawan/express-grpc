require('dotenv').config()
const express = require('express')

const { SupplierService } = require('./client')

const app = express()
const PORT = process.env.CLIENT_PORT || 3000

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const supplier = await SupplierService.getSupplierList({})
        res.send({
            message: 'success',
            data: supplier.suppliers
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            data: null
        })
    }
})

app.post('/', async (req, res) => {
    const rawData = req.body

    if (!rawData.name) return res.send({ message: 'Name required' })
    if (!rawData.address) return res.send({ message: 'Address required' })

    const newSupplier = {
        name: req.body.name,
        address: req.body.address
    }

    try {
        const data = await SupplierService.createSupplier(newSupplier)
        res.send({
            message: 'success',
            data
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            data: null
        })
    }
})

app.put('/:id', async (req, res) => {
    const rawData = Object.assign(req.body, req.params)

    try {
        const data = await SupplierService.updateSupplier(rawData)
        res.send({
            message: 'success',
            data
        })
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            data: null
        })
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const data = await SupplierService.deleteSupplier({ id })
        res.send({
            message: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Internal server error',
            data: null
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})