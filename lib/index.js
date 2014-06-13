var Norman = require("./norman");

// AMD export
if(typeof define === "function" && define.amd) {
    define(function() {
        return Norman;
    });
} else {
    window.Norman = Norman;
}