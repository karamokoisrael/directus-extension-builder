

// const chalk = require('chalk');  
// const boxen = require('boxen');
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');
const { exit } = require('process');
const _ = require("lodash");

const acceptedExtensions = ["displays", "interfaces", "layouts", "modules", "panels"]

const messages = {
    "wrongExtensionTypeGiven": `wrong extension type given. extensions args are ${acceptedExtensions.toString().replace("[", "").replace("]", "")}`,
    "unexpectedError":"we encoutered an unexpected error during the process"
}

const returnMessage = (messageString, predefined = true, formatter=null)=>{
    try {
        let message =  predefined ? messages[messageString] : messageString;
        if(formatter!=null) message = formatter(message);
        console.log(message)
    } catch (error) {
        console.log(message)
    }   
}

const quit = (messageString="", predefined = true, formatter=null)=>{
    if(messageString!=""){
        returnMessage(messageString, predefined, formatter);
    }
    exit()
}


const buildExtensions = (extensionsType="*")=>{
    const execTask = fs.readdir(dir, function(err, list) {
        for(currentDir of list){
            exec(`cd ${dir}/${currentDir} ${process.argv.slice(2).length > 2 ? "&& yarn install" : ""} && yarn build && cp dist/index.js ./`, (error, stdout, stderr) => {
                if (error) {

                    returnMessage(
                        `error in ${currentDir}: ${error.message}`
                        , false)
                    return;
                }
                if (stderr) {
                    returnMessage(
                        `stderr in ${currentDir}: ${stderr}`
                        , false)
                    return;
                }
                returnMessage(
                    `stdout in ${currentDir}: ${stdout}`
                    , false)
            })
        }

    })

    if(extensionsType=="*"){
        for (const currentExtensionType of acceptedExtensions) {
            execTask(`extensions/${currentExtensionType}`)
        }
    }else{
        if(!acceptedExtensions.includes(extensionsType)) quit("wrongExtensionTypeGiven");
        execTask(`extensions/${extensionsType}`)
    }    
}  

module.exports = { buildExtensions :buildExtensions}
