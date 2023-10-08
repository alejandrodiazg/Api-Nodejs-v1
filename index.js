require('dotenv').config()
require('./mongo')
const Note = require('./models/Note')
const express = require('express')
const cors = require('cors')
const logger = require('./LoggerMiddleware')
const handleErrors = require('./middlewares/handleErrors')
const notFound = require('./middlewares/notFound')
const app = express()
app.use(cors())

app.use(express.json())

app.use(logger)

app.get('/', (req, res) => {
  res.send('<h1>123135<h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

// config 1

// app.get('/api/notes/:id', (req, res) => {
//   const id = req.params.id

//   Note.findById(id).then(note => {
//     if (note) {
//       return res.json(note)
//     } else {
//       return res.json({ error: 'No se encontró ninguna nota con el ID proporcionado' })
//     }
//   }).catch(error => {
//     console.log(error)
//     res.status(400).json('bad id config').end()
//   })
// })

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findById(id).then(note => {
    if (note) {
      return res.json(note)
    } else {
      return res.json({ error: 'No se encontró ninguna nota con el ID proporcionado' })
    }
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id).then(note => {
    res.status(204).end()
  }).catch(error => {
    next(error)
  })
})

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  const note = req.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
    res.status(200).json(result)
  }).catch(error => {
    next(error)
  })
})

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
