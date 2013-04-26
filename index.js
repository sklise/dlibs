#!/usr/bin/env node

var exec = require('child_process').exec;

var requested = process.argv.splice(2);

var libs = {
  "backbone" : "http://backbonejs.org/backbone.js",
  "underscore" : "http://underscorejs.org/underscore.js",
  "jquery" : "http://code.jquery.com/jquery-2.0.0.js"
}

var getLib = function (list) {
  if (list.length === 0) return;

  var val = list[0];

  console.log(val)

  if (!!libs[val]) {
    exec("curl " + libs[val] + " >> " + val+".js", function (err, stdout) {
      console.log(stdout);
      if (err) throw err

      getLib(list.splice(1));
    });
  } else {
    getLib(list.splice(1));
  }
}

console.log("requested: ", requested)
getLib(requested);