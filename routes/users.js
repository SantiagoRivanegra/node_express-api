import express from "express"
import { v4 as uuidv4 } from 'uuid';

const router = express.Router()

let users = []

//Get All Users
router.get('/', (req, res) => {
  res.send(users)
})

//Post Users
router.post('/', (req, res) => {
  const newUser = req.body

  users.push({ ...newUser, id: uuidv4() })

  res.send(`User with the name ${newUser.firstName} added to the database!`)
})

//Get Users By ID
router.get('/:id', (req, res) => {
  const { id } = req.params

  const userId = users.find((user) => user.id === id)

  res.send(userId)
})

//Delete Users
router.delete('/:id', (req, res) => {
  const { id } = req.params

  users = users.filter((user) => user.id !== id)

  res.send(`User with the id ${id} deletd from the database.`)
})

//Update Users
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { firstName, lastName, age } = req.body

  const user = users.find((user) => user.id === id)

  if(firstName){user.firstName = firstName}
  if(lastName){user.lastName = lastName}
  if(age){user.age = age}

  res.send(`User with the id ${id} has been updated.`)
})

export default router