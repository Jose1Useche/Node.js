import fs from 'node:fs';

export const addNotes =  function(title, body) {
    const notes = loadNotes();

    const duplicateNotes = notes.filter(n => {
        return n.title.toLowerCase() === title.toLowerCase();
    });

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