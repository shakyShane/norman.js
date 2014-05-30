(function (window, undefined) {

    'use strict';

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
     * @param coords
     * @returns {Norman}
     */
    Norman.prototype.map = function (coords) {
        return this;
    };

    /**
     * @param x
     * @param y
     * @returns {boolean}
     */
    Norman.prototype.checkPosition = function (x, y) {

        var safeZone = this.opts.safeZone;
        var viewBox  = this.viewBox;

        return x >= (viewBox.x - safeZone) && x <= (viewBox.x + viewBox.width  + safeZone)
            && y >= (viewBox.y - safeZone) && y <= (viewBox.y + viewBox.height + safeZone);
    };

    /**
     * @param axis
     * @param value
     * @returns {boolean}
     */
    Norman.prototype.checkBoundary = function (axis, value) {

        var attr      = "width";
        var subject   = this.viewBox;
        var hitGutter = this.opts.boundary;

        var results = {
            y: ["BOTTOM", "TOP"],
            x: ["RIGHT", "LEFT"]
        };

        if (axis === "y") {
            attr = "height";
        }

        if (value >= (subject[axis] + subject[attr]) - hitGutter) {
            return results[axis][0];
        } else {
            if (value <= subject[axis] + hitGutter) {
                return results[axis][1];
            }
        }

        return false;
    };

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


    // AMD export
    if(typeof define == 'function' && define.amd) {
        define(function() {
            return Norman;
        });
        // commonjs export
    } else if(typeof module !== 'undefined' && module.exports) {
        module.exports = Norman;
        // browser export
    } else {
        window.Norman = Norman;
    }

})(window);