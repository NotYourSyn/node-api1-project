// BUILD YOUR SERVER HERE

const express = require('express')
const db = require('./users/model')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.json({message:'notYourSyn'})
})

server.get('/users',(req,res) => {
    //get a list of user from the fake database
    const users = db.getUsers()
    res.json(users)
})

server.get('/users/:id', (req,res) => {
    const user = db.getUserById(req.params.id)
        if(user) {
            res.json(user)
        }else{
            res.status(404).json({
                message: 'User not Found'
            })
    }
})

server.post('/users',(req,res) => {
    const newUser = db.createUser({
        name: req.body.name
    })
    res.status(201).json(newUser)
})

server.put('/users/:id', (req,res) =>{
    const user = db.getUserById(req.params.id)

    if(user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name
        })
        res.json(updatedUser)
    }else{
        res.status(404).json({
            message: 'User not Found'
        })
    }
})

server.remove('/:id/name/bio', (req,res) =>{
    const user = db.findById(req.params.id)

    if(user) {
        db.deleteUser(user.id)
        })
        res.status(204).end()
    }else{
        res.status(404).json({
            message: 'User not Found'
        })
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
