const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config();
const Person = require('./models/person')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})
app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p> Phonebook has info for ${persons.length} people </p><p> ${date}</p>`)
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  
  // const id = Number(request.params.id)
  // persons = persons.filter(person => person.id !== id)
  
  // response.status(204).end()
})

const generateId = (max) => {
  const newId = Math.floor(Math.random() * Math.floor(max))
  return newId
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (body.number === undefined) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  // if (Person.some(Person => Person.name === body.name)) {
  //   return response.status(400).json({
  //     error: `${body.name} is already added to phonebook`
  //   })
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(100),
  })
  person.save(function (err) {
    console.log(err);
  });
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
  // persons = persons.concat(person)
  // response.json(person)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})