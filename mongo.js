const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString).then(() => {
  console.log('Database connected')
}).catch(err => {
  console.error(err)
})

// const note = new Note({
//   content: 'New Note',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.log(err)
//     mongoose.connection.close()
//   })

// Note.find({}).then(result => console.log(result))
