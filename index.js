const express = require('express')
const cors = require('cors')
const logger = require('./LoggerMiddleware')
const app = express()
app.use(cors())

app.use(express.json())

app.use(logger)

let notes = [

  {

    id: 1,
    content: 'Dato numero 1@',
    date: '2023-30T17:30:31:098Z',
    important: true

  },

  {

    id: 2,
    content: 'Dato numero 2@',
    date: '2023-30T17:30:31:098Z',
    important: false

  },

  {

    id: 3,
    content: 'Dato numero 3@',
    date: '2023-30T17:30:31:098Z',
    important: true

  }

]

app.get('/', (req, res) => {
  res.send('<h1>123135<h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  res.json(notes[req.params.id])
})

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id != req.params.id)

  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  console.log(note)

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {

    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toString()

  }

  notes = notes.concat(newNote)

  res.json(notes)
})

app.use((req, res) => {
  console.log(req.path)
  res.status(404).json({
    error: 'Not Found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
