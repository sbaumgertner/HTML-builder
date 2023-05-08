const path = require('path');
const fs = require('fs');

let stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

stream.on('data', data => console.log(data));