const fs = require('fs');
const path = require('path');

exports.copyDirectory = copyDirectory;

async function copyDirectory(src, dist){
    await fs.promises.mkdir(dist, { recursive: true });
    const files = await fs.promises.readdir(src, {withFileTypes: true});

    for (const file of files){
        if (file.isFile()){
            await fs.promises.copyFile(path.join(src, file.name), path.join(dist, file.name));
        }
        else if (file.isDirectory()){
            copyDirectory(path.join(src, file.name), path.join(dist, file.name));
        }
    }
}

copyDirectory(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));