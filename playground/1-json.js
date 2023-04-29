import * as fs from 'node:fs';

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
}

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// console.log(dataBuffer);
// const dataJSON = dataBuffer.toString();
// console.log(dataJSON);
// const data = JSON.parse(dataJSON);
// console.log('Title: ', data.title);
/*----------------------------------------------------*/
/*----------------------------------------------------*/
let data2 = JSON.parse(fs.readFileSync('1-json-exercise.json').toString());
console.log(data2); 
data2 = { ...data2, name: 'Jose', age: 36 };
fs.writeFileSync('1-json-exercise.json', JSON.stringify(data2));
console.log(data2); 