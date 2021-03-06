(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Norman = require("./norman");

// AMD export
if(typeof define === "function" && define.amd) {
    define(function() {
        return Norman;
    });
} else {
    window.Norman = Norman;
}
},{"./norman":2}],2:[function(require,module,exports){
    "use strict";

    /**
     * @constructor
     */
    var Norman = function(config) {

        this.opts = {
            boundary: config.boundary || 0,
            safeZone: config.safeZone || 0
        };

        this.viewBox = new Subject(config.viewBox);

        return this;
    };


    /**
     * Link two subjects
     * @param dimensions
     * @returns {Norman}
     */
    Norman.prototype.mapTo = function (dimensions) {

        this.subject = new Subject(dimensions);

        return this;
    };

    /**
     * @returns {{x: boolean, y: boolean, inHitArea: boolean, inBoundary: boolean}}
     */
    Norman.prototype.map = function (x, y) {

        var newX = 0, newY = 0;
        var viewBox = this.viewBox;
        var subject = this.subject;

        var returnObj = {
            x: false,
            y: false,
            inHitArea: false,
            inBoundary: false
        };

        if (this.checkPosition(x, y)) {

            var offX = this.getRelativeOffset("x");
            var diffX = (subject.width - viewBox.width) / 2;

            var offY  = this.getRelativeOffset("y");
            var diffY = (subject.height - viewBox.height) / 2;

            if (this.canLerp("x", x)) {
                newX = lerp(offX + diffX, offX - diffX, this.getNormValue("x", x));
            } else {
                newX = this.getBoundary("x", x);
                returnObj.inBoundary = true;
            }

            if (this.canLerp("y", y)) {
                newY = lerp(offY + diffY, offY - diffY, this.getNormValue("y", y));
            } else {
                newY = this.getBoundary("y", y);
                returnObj.inBoundary = true;
            }

            returnObj.x = newX;
            returnObj.y = newY;
            returnObj.inHitArea  = true;

        }

        return returnObj;
    };

    /**
     * @param x
     * @param y
     * @returns {boolean}
     */
    Norman.prototype.checkPosition = function (x, y) {

        var safeZone = this.opts.safeZone;
        var viewBox  = this.viewBox;

        var safeX = x >= (viewBox.x - safeZone) && x <= (viewBox.x + viewBox.width  + safeZone);
        var safeY = y >= (viewBox.y - safeZone) && y <= (viewBox.y + viewBox.height + safeZone);

        return safeX && safeY;
    };

    /**
     * @param {string} axis
     * @param {number} value
     * @returns {number|boolean}
     */
    Norman.prototype.getBoundary = function (axis, value) {

        var attr      = "width";
        var viewBox   = this.viewBox;
        var subject   = this.subject;
        var hitGutter = this.opts.boundary;

        if (axis === "y") {
            attr = "height";
        }

        if (value <= viewBox[axis] + hitGutter) {
            return viewBox[axis];
        } else {
            if (value >= (viewBox[axis] + viewBox[attr]) - hitGutter) {
                return (viewBox[axis] + viewBox[attr]) - subject[attr];
            }
        }

        return false;
    };

    /**
     * @param {string} axis
     */
    Norman.prototype.getRelativeOffset = function (axis) {

        var attr    = "width";
        var viewBox = this.viewBox;
        var subject = this.subject;

        if (axis === "y") {
            attr = "height";
        }

        return viewBox[axis] - (subject[attr] - viewBox[attr]) / 2;
    };

    /**
     * Is the current value within boundaries?
     * @param {string} axis
     * @param {number} value
     */
    Norman.prototype.canLerp = function (axis, value) {

        var attr      = "width";
        var viewBox   = this.viewBox;
        var hitGutter = this.opts.boundary;

        if (axis === "y") {
            attr = "height";
        }

        var start = viewBox[axis] + hitGutter;
        var end   = viewBox[axis] + viewBox[attr] - hitGutter;

        return value > start && value < end;
    };

    /**
     * Get a normalised value on the hit area minus boundaries
     * @param axis
     * @param value
     */
    Norman.prototype.getNormValue = function (axis, value) {

        var attr      = "width";
        var viewBox   = this.viewBox;
        var hitGutter = this.opts.boundary;

        if (axis === "y") {
            attr = "height";
        }

        var start = viewBox[axis] + hitGutter;
        var end   = viewBox[axis] + viewBox[attr] - hitGutter;

        return norm(start, end, value);
    };

    function lerp (min, max, norm) {
        return (max - min) * norm + min;
    }

    function norm(min, max, value) {
        return (value - min) / (max - min);
    }

    /**
     * @param config
     * @returns {Subject}
     * @constructor
     */
    function Subject (config) {

        this.x      = config.x      || 0;
        this.y      = config.y      || 0;
        this.width  = config.width  || 0;
        this.height = config.height || 0;

        return this;
    }

    module.exports = Norman;
},{}]},{},[1])