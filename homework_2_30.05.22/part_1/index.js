const readline = require('readline')
const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

var filename
const min = 1
const max = 2
var questNumber 
var obj = {
    tables: []
 };


var argv = require('yargs/yargs')(process.argv.slice(2))
  .option('f', {
    alias: 'file',
    type:'string',
    default: true,
    global: false
  }).global('f')
  .argv
  


const input = readline.createInterface(process.stdin)

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter()


myEmitter.on('message', message => {
    console.log(`${message}`)
})

myEmitter.on('reset', message => {
    questNumber = Math.floor(Math.random() * ((max+1) - min) + min) 
    //myEmitter.emit('message', questNumber)
})

myEmitter.on('setfilename', message => {
    filename = path.join(__dirname,argv.f)
})

myEmitter.on('win', (data) => {
    console.log('Победа')    
    obj.tables.push({cpu: questNumber, user:data});
    myEmitter.emit('reset')
})

myEmitter.on('lose', (data) => {
    console.log('Проигрыш')  
    obj.tables.push({cpu: questNumber, user:data});
    myEmitter.emit('reset')  
})




input.on("line", (data) => {
    try {
        if (data == 'exit') process.exit(0)
         if (data == 1 || data == 2) {
        data == questNumber? myEmitter.emit('win',+data) : myEmitter.emit('lose',+data)
         } else { throw `Указать можно только ${min} или ${max}`}
    }
    catch(err) {
        myEmitter.emit('error',err)
    }
    
}
)

myEmitter.on('error', error => console.log(`неверный ввод: ${error}`))

myEmitter.emit('message', `Орел(${min}) или решка(${max}) - для выхода - exit`)
myEmitter.emit('reset')
myEmitter.emit('setfilename')

function writelogfile(options, err) {
    var json = JSON.stringify(obj);
    fs.writeFileSync(filename,json,(err) => {
        if (err) throw Error(err)
        console.log('log file saved')
    })
    process.exit(0)
}
process.on('exit', writelogfile.bind(null,{cleanup:true}));
process.on('SIGINT', writelogfile.bind(null, {exit:true}));
