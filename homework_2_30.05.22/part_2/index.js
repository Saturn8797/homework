const fs = require('fs')
const path = require('path')


var argv = require('yargs/yargs')(process.argv.slice(2))
  .option('f', {
    alias: 'file',
    type:'string',
    default: true,
    global: false
  }).global('f')
  .argv

const file = path.join(__dirname, argv.f)
var data = fs.readFileSync(file)
var data_obj = JSON.parse(data);
var table_all = data_obj.tables.length
var winned = data_obj.tables.filter(function (table) { return table.cpu == table.user} ); 
var win_count = winned.length
var lose_count = table_all - win_count
var win_avr = Math.floor(win_count / table_all * 100)

console.log(`Total: ${table_all}, win: ${win_count}, lose: ${lose_count}, avr: ${win_avr}%`)