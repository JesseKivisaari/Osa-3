const express = require('express')
const { response } = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))
let persons = [
  
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]


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
  res.json(persons)
})
app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p> Phonebook has info for ${persons.length} people </p><p> ${date}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = (max) => {
  const newId = Math.floor(Math.random() * Math.floor(max))
  return newId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
      error: `${body.name} is already added to phonebook`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(100),
  }

  persons = persons.concat(person)

  response.json(person)
  console.log(request.body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})