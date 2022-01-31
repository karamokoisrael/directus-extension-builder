
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');
const { exit } = require('process');

let extensionsPath;
const acceptedPaths = ["displays", "interfaces"]
const messages = {
    "wrongArgs": `wrong args given. accepted args are ${acceptedPaths.toString().replace("[", "").replace("]", "")}`,
    "unexpectedError":"we encoutered an unexpected error during the process"
}

const quit = (messageKey)=>{
    try {
        console.log(messages[messageKey]);
    } catch (error) {
        console.log(messages["unexpectedError"]);
    }
    exit()
}

try {
    extensionsPath = process.argv.slice(2)[0];
} catch (error) {
    quit("wrongArgs")
}finally{
    if(!acceptedPaths.includes(extensionsPath)){
        quit("wrongArgs")
    }
}



var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
const buildExtensions = (dir)=>{
    var results = [];
    fs.readdir(dir, function(err, list) {
            
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);

        for(currentDir of list){

            exec(`cd ${dir}/${currentDir} ${process.argv.slice(2).length > 2 ? "&& yarn install" : ""} && yarn build && cp dist/index.js ./`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error in ${currentDir}: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr in ${currentDir}: ${stderr}`);
                    return;
                }
                console.log(`stdout in ${currentDir}: ${stdout}`);
            })
        }
    
    //   list.forEach(function(file) {
    //     file = path.resolve(dir, file);
    //     fs.stat(file, function(err, stat) {
    //       if (stat && stat.isDirectory()) {
    //         walk(file, function(err, res) {
    //           results = results.concat(res);
    //           if (!--pending) done(null, results);
    //         });
    //       } else {
    //         results.push(file);
    //         if (!--pending) done(null, results);
    //       }
    //     });
    //   });
    });
}


buildExtensions(`extensions/${extensionsPath}`)
