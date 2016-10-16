# simple-throttler

## What it is

A simple function that ensures that another function does not run too often. Subsequent calls will be delayed so they meet the criteria.

## Usage

```
var Throttler = require("simple-throttler");

var t = Throttler(1000);

t(()=>console.log("1"));
t(()=>console.log("2")); // will run after 1s
t(()=>console.log("3")); // will run after 2s
```
