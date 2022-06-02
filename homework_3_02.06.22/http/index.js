const http = require('http')
const {url, myAPIKey} = require('./config')


var argv = require('yargs/yargs')(process.argv.slice(2))
  .option('c', {
    alias: 'city',
    type:'string',
    default: true,
    global: false
  }).global('c')
  .argv

const target =  url()+''+myAPIKey() +'&query='+argv.c

http.get(target, (res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => {
        rawData += chunk
    })
    res.on('end', () => {
        let parseData = JSON.parse(rawData)
        console.log(parseData)
    })
}).on('error', (err) => {console.log(err)})

