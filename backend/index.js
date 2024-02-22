const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())


let persons = [
    {         
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
// app.use(morgan('tiny'))
morgan.token('body',function(req,res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons',(request,response)=> {
    response.json(persons)
})

app.get('/info/',(request,response)=>{
    const listValue = persons.length
    const fecha = new Date()
    response.send(`<div>Phonebook has info for ${listValue} people</div><div>${fecha}</div>`)
})
app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }

})
app.delete('/api/person/:id',(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
const generateId = () => {
    const newId = Math.floor(Math.random() * (1000 -1) + 1)
    console.log(newId)
    return newId
}
app.post('/api/persons',(request,response)=>{
    const body = request.body
    console.log(body.name)
    console.log(body.number)
    if(!body.name){
        return response.status(400).json({
            error:'name missing'
        })
    }
    if(!body.number)
    {
        return response.status(400).json({
            error:'number missing'
        })
    }
    
    const existperson = persons.find(person => person.name === body.name)
    if(typeof existperson !== 'undefined'){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
     const person = {
        id:generateId(),
        name:body.name,
        number:body.number
     }
     console.log(person)
     persons = persons.concat(person)
     response.json(person)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)