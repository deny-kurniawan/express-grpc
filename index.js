require('dotenv').config()
const express = require('express')

const client = require('./client')

const app = express()
const PORT = process.env.CLIENT_PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
    client.getAll(null, (err, data) => {
        if (!err) {
            res.send({ data: data.suppliers })
        } else {
            console.log('error GET:::', err)
        }
    })
})

app.post('/', (req, res) => {
    const rawData = req.body

    if (!rawData.name) return res.send({ message: 'Name required' })
    if (!rawData.address) return res.send({ message: 'Address required' })

    const newSupplier = {
        name: req.body.name,
        address: req.body.address
    }

    client.insert(newSupplier, (err, data) => {
        if (!err) {
            res.send({ data })
        } else {
            console.log('error POST:::', err)
        }
    })
})

app.put('/', (req, res) => {
    const rawData = req.body

    if (!rawData.id) return res.send({ message: 'ID required' })

    const newSupplier = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
    }

    client.update(newSupplier, (err, data) => {
        if (!err) {
            res.send({ data })
        } else {
            if (err.code == 5) res.send({ message: err.details })
            console.log('error PUT:::', err)
        }
    })
})

app.delete('/', (req, res) => {
    const { id } = req.body

    if (!id) return res.send({ message: 'ID required' })

    client.remove({ id }, (err) => {
        if (err) console.log('error DELETE:::', err)
        else res.send({ message: 'Delete Success' })
    })
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})