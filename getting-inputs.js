import yargsNPM from 'yargs';
import { hideBin } from 'yargs/helpers';

/*-----------------------------------------------------*/
/*-----------------------------------------------------*/
// const entrada = process.argv[2];

// console.log(process.argv);
// console.log(entrada);

// if (entrada === 'Jose') {
    //     console.log('Hola soy ' + entrada);
    // } else {
        //     console.log('No eres ' + entrada);
        // }
        
/*-----------------------------------------------------*/
/*-----------------------------------------------------*/

const yargs = yargsNPM(hideBin(process.argv));
// yargs.version('1.2.0');
// console.log(yargs.argv);
        
//Create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        titulo: {
            describe: 'Titulo de la nota',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Contenido del titulo',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function() {
        console.log('Titulo ', yargs.argv.titulo);
        console.log('Contenido ', yargs.argv.body);
    }
});

//Create remove command

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    handler: function() {
        console.log('Removing a note!');
    }
});

//Create list command

yargs.command({
    command: 'list',
    describe: 'List all the notes?',
    handler: function() {
        console.log('Listing a note!');
    }
});

//Create read command 

yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Reading a note!');
    }
});

yargs.parse();