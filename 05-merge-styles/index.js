const fs = require('fs');
const path = require('path');

exports.mergeStyles = mergeStyles;

async function mergeStyles(src, dist){
    const files = await fs.promises.readdir(src, {withFileTypes: true});
    let dataArray = [];

    await fs.promises.writeFile(dist, '');

    for (const file of files){
        const extName = path.extname(file.name);
        if (file.isFile() && extName == '.css'){
            const contents = await fs.promises.readFile(path.resolve(src, file.name));
            dataArray.push(contents);
        }
    }
    dataArray.reverse();
    while (dataArray.length > 0){
        await fs.promises.appendFile(dist, dataArray.pop());
    }
}

mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'bundle.css'));