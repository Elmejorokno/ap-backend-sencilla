// const http = require('http')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' })
//   res.end('Hello world')
// })

let notes = [
  {
    id: 1,
    description: 'Aprender Next JS',
    date: '2019-05-30T19:20:14.2982',
    important: true
  },
  {
    id: 2,
    description: 'Escuchar la versión deluxe de Montero',
    date: '2019-05-30T18:15:45.4582',
    important: false
  },
  {
    id: 3,
    description: 'Hacer más amigos',
    date: '2019-02-14T20:12:20.5478',
    important: true
  }
]

app.get('/', (req, res) => res.send('<h1>Hello world</h1>'))
app.get('/api/notes', (req, res) => res.json(notes))
app.get('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const note = notes.find((note) => note.id === id)

  if (note) return res.json(note)

  res.status(404).json({ error: { msg: "The note doesn't exists." } })
})
app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.send(204).end()
})
app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.description) {
    res.status(400).json({ error: { msg: 'note.description is missing!' } })
  }

  const ids = notes.map((note) => note.id)
  console.log(note, ids)

  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    description: note.description,
    important: !!note.important,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.use((req, res) => {
  res.status(404).json({ error: { msg: 'Page not found.' } })
})
const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
