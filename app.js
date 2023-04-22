import * as fs from 'node:fs';

// fs.writeFileSync('notes.txt', 'This file was created by Node.js!');

fs.appendFileSync('notes.txt', '\nInsertando una nueva línea sin borrar la anterior en el .txt');