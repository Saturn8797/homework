const readline = require('readline')
const EventEmitter = require('events')
const input = readline.createInterface(process.stdin)

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter()

const min = 0
const max = 100
const questNumber = Math.floor(Math.random() * (max - min) + min)
myEmitter.on('message', message => {
    console.log(`${message}`)
})

myEmitter.on('win', () => {
    console.log(`отгадано число ${questNumber}`)
    process.exit(0)
})

myEmitter.on('error', error => console.log(`неверный ввод: ${error}`))
//myEmitter.emit('message', questNumber)
myEmitter.emit('message', `Загадано число в диапазоне от ${min} до ${max}`)

input.on("line", (data) => {
    try {
         if (!isNaN(parseFloat(data)) && isFinite(data)) {
        data == questNumber? myEmitter.emit('win','отгадано число') :
        data < questNumber? myEmitter.emit('message','больше'):myEmitter.emit('message','меньше')
         } else { throw `угадываем число от ${min} до ${max}`}
    }
    catch(err) {
        myEmitter.emit('error',err)
    }
    
}
)

input.on("close", () => console.log('end of line'))