/*
 * Outlier
 * https://github.com/pablodenadai/Outlier
 *
 * Copyright (c) 2014 Pablo De Nadai
 * Licensed under the MIT license.
 */

'use strict';

var Stats = function(array) {
    if (!array || !(array instanceof Array)) {
        array = [];
    }

    array = array.slice(0);
    array.sort(function(a, b) {
        return a - b;
    });

    this.array = array;
};

// Clones the current stats object, providing a new stats object which
// can be changed without modifying the original object.
// Returns a new stats object.
Stats.prototype.clone = function() {
    return new Stats(this.array.slice(0));
};

// Finds the first quartile of the numbers.
// Returns the first quartile.
Stats.prototype.q1 = function() {
    var nums = this.clone();

    // The first quartile is the median of the lower half of the numbers
    return nums.slice(0, Math.floor(nums.size() / 2)).median();
};

// Finds the third quartile of the numbers.
// Returns the third quartile.
Stats.prototype.q3 = function() {
    var nums = this.clone();

    // The third quartile is the median of the upper half of the numbers
    return nums.slice(Math.ceil(nums.size() / 2)).median();
};

// Finds the interquartile range of the data set.
// Returns the IQR.
Stats.prototype.iqr = function() {
    return this.q3() - this.q1();
};

Stats.prototype.median = function() {
    var half = Math.floor(this.size() / 2);

    if (this.size() % 2) {
        return this.array[half];
    } else {
        // There are an even number of elements in the array; the median
        // is the average of the middle two
        return (this.array[half - 1] + this.array[half]) / 2;
    }
};

Stats.prototype.slice = function() {
    this.array = Array.prototype.slice.apply(this.array, arguments);
    return this;
};

Stats.prototype.each = function(fn) {
    for (var i = 0, l = this.size(); i < l; i++) {
        fn.call(this.array[i], this.array[i], i, this.array);
    }
    return this;
};

// Finds all outliers in the data set, using the 1.5 * IQR away from the median test.
// Returns a new stats object with the outliers.
Stats.prototype.findOutliers = function() {
    // Get the median and the range that the number must fall within
    var median = this.median(),
        range = this.iqr() * 1.5;

    // Create a new stats object to hold the outliers
    var outliers = [];

    // Go through each element in the data set and test to see if it
    // is an outlier
    this.each(function(num) {
        if (Math.abs(num - median) > range) {
            // The number is an outlier
            outliers.push(num);
        }
    });

    return outliers;
};

Stats.prototype.size = function() {
    return this.array.length;
};

// Tests if the given number would be an outlier in the data set.
// num - The number to test.
// Returns a boolean.
Stats.prototype.testOutlier = function(num) {
    return (Math.abs(num - this.median()) > this.iqr() * 1.5);
};

module.exports = function(array) {
    return new Stats(array);
};