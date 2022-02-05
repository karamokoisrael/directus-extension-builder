#! /usr/bin/env node
const { exit } = require("yargs");
const { buildExtensions } = require('./utils.js');


const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command("build", "build all the extensions")
    .option("t", {alias:"extension-type", describe: "rSpecify extensions types", type: "string", demandOption: false })
    .example('$0 build -t displays', 'build all the displays')
    .option("i", {alias:"install", describe: "run npm install in each extenion directory", type: "boolean", demandOption: false }) 


    .help('h')
    .alias('h', 'help').argv

    console.log(argv);

    switch (argv._[0]) {
        case "build":   

            const installModules = argv.i == true ? true : false;
            const extensionTypes = argv.t != undefined ? argv.t : "*";
            buildExtensions(extensionTypes, installModules)
            break;
    
        default:
            break;
    }



// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };

    
//     //   list.forEach(function(file) {
//     //     file = path.resolve(dir, file);
//     //     fs.stat(file, function(err, stat) {
//     //       if (stat && stat.isDirectory()) {
//     //         walk(file, function(err, res) {
//     //           results = results.concat(res);
//     //           if (!--pending) done(null, results);
//     //         });
//     //       } else {
//     //         results.push(file);
//     //         if (!--pending) done(null, results);
//     //       }
//     //     });
//     //   });
//     });
// }


// buildExtensions(`extensions/${extensionsPath}`)
