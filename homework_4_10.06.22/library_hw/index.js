const express = require('express')
const { v4: uuid } = require('uuid')

class Library {
    constructor(title="", desc="", authors="", favorite="", fileCover="",fileName ="", id = uuid()){
        this.title = title
        this.description = desc
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = id
    }
}

/*
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string"
}

*/ 

const stor = {
    lib: [
        new Library(),
        new Library()
    ]
}

console.log(stor.lib)

const app = express();
app.use(express.json())

app.get('/api/user/login', (req,res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/lib', (req,res) => {
    const {lib} = stor
    res.json(lib)
})
app.get('/api/lib/:id', (req,res) => {
    const {lib} = stor
    const{id} = req.params
    const idx = lib.findIndex(el => el.id === id)
    if (idx !== -1) {
        res.json(lib[idx])
    }
    else {
        res.status(404)
        res.json('404 | record not found')
    }
})
app.post('/api/lib/', (req,res) => {
    const {lib} = stor
    const {title, description,authors,favorite,fileCover,fileName} = req.body
    const newlib = new Library(title, description,authors,favorite,fileCover,fileName)
    lib.push(newlib)
    res.status(201)
    res.json(newlib)

})
app.put('/api/lib/:id', (req,res) => {
    const {lib} = stor
    const {id} = req.params
    const {title, description,authors,favorite,fileCover,fileName} = req.body
    const idx = lib.findIndex(el => el.id === id)
    if (idx !== -1){
        lib[idx] = {
            ...lib[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.json(lib[idx])
    }
    else {
        res.status(404)
        res.json('404 | record not found')
    }

})
app.delete('/api/lib/:id', (req,res) => {

    const  {lib} = stor
    const {id} = req.params
    const idx = lib.findIndex(el => el.id !== id)

    if (idx !== -1) {
        lib.splice(idx,1)
    } else {
        res.status(404)
        res.json('404 | record not found')
    }

})






const PORT = process.env.PORT || 3000
app.listen(3000);

