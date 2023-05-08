const fs = require('fs');
const path = require('path');

async function filesInFolder(){
    const files = await fs.promises.readdir(path.join(__dirname, 'secret-folder'), 
        {withFileTypes: true});
    let filesInfo = [];
    for (const file of files){
        if (file.isFile()){
            const extName = path.extname(file.name);
            const baseName = path.basename(file.name, extName);
            const stats = await fs.promises.stat(path.join(__dirname, 'secret-folder', file.name));
            filesInfo.push({name: baseName, ext: extName.substring(1), size: stats.size/1000});
        }
    }
    for (let fileInfo of filesInfo){
        console.log(`${fileInfo.name} - ${fileInfo.ext} - ${fileInfo.size}kb`);
    }
    
}

filesInFolder();

    