const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(express.static('build'))
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// let persons = [
//     {
//       id: 1,
//       name: "Arto Hellas",
//       number: "040-123456"
//     },
//     {
//       id: 2,
//       name: "Ada Lovelace",
//       number: "39-44-5323523"
//     },
//     {
//       id: 3,
//       name: "Dan Abramov",
//       number: "12-43-234345"
//     },
//     {
//       id: 4,
//       name: "Mary Poppendieck",
//       number: "39-23-6423122"
//     }
// ]

// const generateId = () => {
//     const max = 5000
//     return Math.floor(Math.random() * max);
//   }

app.get('/api/persons', (request, response, next) => {
  // without db
  // response.json(persons)
  Person.find({})
    .then(people => response.json(people.map(person => person.toJSON())))
    .catch(error => next(error))
})

// const personsLength = persons.length
const dateTimeNow = new Date()

app.get('/api/info', (request, response) => {
  // response.send(
  //     `<p>Phonebook has info for ${personsLength} people</p> <p>${dateTimeNow}</p>`
  // )
  Person.find({}).then(people => {
    const length = people.length
    response.send(`Phonebook has info for ${length} people at ${dateTimeNow}`)
  })
})


app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)

  // if (person) {
  //   response.json(person)
  // } else {
  //   response.status(404).end()
  // }
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(
      // error => next(error)
      error => {
        console.log(error)
        // response.status(500).end()
        // response.status(400).send({ error: 'malformatted id' })
        next(error)
      }

    )
})

app.post('/api/persons', (request, response, next) => {
  // without db
  // const body = request.body
  // if (!body.name) {
  //   return response.status(400).json({
  //     error: 'name missing'
  //   })
  // }
  // if (!body.number) {
  //     return response.status(400).json({
  //       error: 'number missing'
  //     })
  // }
  // if(persons.find(person => person.name === body.name)){
  //     return response.status(400).json({
  //       error: 'name must be unique'
  //     })
  // }
  // const person = {
  //   id: generateId(),
  //   name: body.name,
  //   number: body.number,
  // }
  // persons = persons.concat(person)
  // response.json(person)
  const body = request.body
  console.log('body: ', body)
  if (body.name === '' || body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  } else if (body.number === '' || body.number === undefined) {
    return response.status(400).json({ error: 'number missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(formattedPerson => response.json(formattedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { gotName, gotNumber } = request.body
  Person.findByIdAndUpdate(
    request.params.id,
    { gotName, gotNumber },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((person) => {
      return response.json(person)
    })
    .catch((error) => next(error))



  // const body = request.body;
  // const person = {
  //   name: body.name,
  //   number: body.number
  // };

  // Person.findByIdAndUpdate(request.params.id, person, { new: true })
  //   .then(updatedPerson => response.json(updatedPerson.toJSON()))
  //   .catch(error => next(error));
})

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)
//     console.log(`deleting person with id ${id}`)
//     response.status(204).end()
// })
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001

app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})