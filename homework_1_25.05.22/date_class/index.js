const yargs = require('yargs')



yargs.command({
    command:"current",
    builder:{
        year:{
            aliases:'y',
            demandOption:false,
        },
        month:{
            aliases:'m',
            demandOption:false,
        },
        date:{
            aliases:'d',
            demandOption:false,
        }
    },
    handler:function(argv){
        if (argv.year == true) console.log(new Date().getFullYear())
        if (argv.month == true) console.log(new Date().getMonth() + 1)
        if (argv.date == true) console.log(new Date().getDate()) 
        else console.log(new Date())
    }
})

yargs.command({
    command:"add",
    builder:{
        d:{
            type:"number",
            demandOption:true,
        },
    },
    handler:function(argv){
        var old = new Date();
        var newdate=new Date(old.getFullYear(),old.getMonth(),old.getDate()+argv.d);
        console.log(newdate)
    }
})

yargs.command({
    command:"sub",
    builder:{
        month:{
            type:"number",
            demandOption:true,
        },
    },
    handler:function(argv){
        var old = new Date();
        var newmonth=new Date(old.getFullYear(),old.getMonth()-argv.month,old.getDate());
        console.log(newmonth)
    }
})

yargs.parse()

//const argv = yargs(process.argv.slice(2)).argv
//console.log(argv)