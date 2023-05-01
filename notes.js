import fs from 'node:fs';
import chalk from 'chalk';

export const addNotes = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(n => n.title.toLowerCase() === title.toLowerCase());

    if (duplicateNotes.length === 0) {
        notes.push({
            title,
            body
        });
    
        saveNotes(notes);
        console.log('Nota agregada satisfactoriamente!');
    } else {
        console.log('Registro existente!')    
    }

}

export const removeNote = function(title) {
    const notes = loadNotes();

    const registersToKeep = notes.filter(n => {
        return n.title !== title;
    });

    if (notes.length > registersToKeep.length) {
        saveNotes(registersToKeep);
        console.log(chalk.bgGreen('Nota eliminada exitosamente!'));
    } else {
        console.log(chalk.bgRed('Esta nota no existe!'));
    }

    // const registerToDelete = notes.findIndex(n => {
    //     return n.title === title;
    // });

    // if (registerToDelete === -1) {
    //     console.log(chalk.bgRed('Esta nota no existe!'));
    // } else {
    //     notes.splice(registerToDelete,1);
    //     saveNotes(notes);

    //     console.log(chalk.bgGreen('Nota eliminada exitosamente!'));
    // }

}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function() {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (e) {
        return [];
    }
}