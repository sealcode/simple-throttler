var Throttler = require("./index.js");

var t = Throttler(1000);

t(()=>console.log("1"));
t(()=>console.log("2"));
t(()=>console.log("3"));
