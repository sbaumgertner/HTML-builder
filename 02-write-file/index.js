const fs = require('fs');
const path = require('path');

const { stdin } = process;

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

console.log('Enter the text: ');

stdin.on('data', data => {
    const val = data.toString().replace('\r\n', '');
    if (val === 'exit'){
        process.exit();
    }
    else {
        stream.write(data);
    }
});

process.on('exit', () => console.log(' BYE!!! '));
process.on('SIGINT', () => process.exit());