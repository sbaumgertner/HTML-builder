const copy = require('../04-copy-directory/index');
const merge = require('../05-merge-styles/index');
const path = require('path');
const fs = require('fs');

async function buildPage(){
    let contents = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
    let tags = contents.match(/{{.+}}/g);
    for (let tag of tags){
        const component = await getComponent(tag);
        contents = contents.replace(tag, component);
    }

    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), contents);
    merge.mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
    copy.copyDirectory(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
}

async function getComponent(str){
    const fileName = str.replace(/{|}/g, '') + '.html';
    const contents = await fs.promises.readFile(path.join(__dirname, 'components', fileName), 'utf-8');
    return contents;
}

buildPage();