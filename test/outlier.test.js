'use strict';

var outlier = require('../lib/outlier.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
	test.expect(numAssertions)
	test.done()
  Test assertions:
	test.ok(value, [message])
	test.equal(actual, expected, [message])
	test.notEqual(actual, expected, [message])
	test.deepEqual(actual, expected, [message])
	test.notDeepEqual(actual, expected, [message])
	test.strictEqual(actual, expected, [message])
	test.notStrictEqual(actual, expected, [message])
	test.throws(block, [error], [message])
	test.doesNotThrow(block, [error], [message])
	test.ifError(value)
*/

exports.outlier = {
    setUp: function(done) {
        // setup here
        done();
    },

    'findOutliers()': {
      'no args': function(test) {
          test.expect(1);
          test.deepEqual(outlier().findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[0]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([0]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[1]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([1]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[1, 2]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([1, 2]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[1, 2, 3]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([1, 2, 3]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[2, 5, 6, 9, 12]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([2, 5, 6, 9, 12]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[0.001, 0.123, 0.431, 0.231, 0.652, 0.563, 0.325]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([0.001, 0.123, 0.431, 0.231, 0.652, 0.563, 0.325]).findOutliers(), [], 'should return an empty array.');
          test.done();
      },

      '[10, 12, 12, 14, 15, 16, 30]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([10, 12, 12, 14, 15, 16, 30]).findOutliers(), [30], 'should return `[30]`.');
          test.done();
      },

      '[2.14, 2.12, 2.15, 2.41, 2.12, 2.11, 2.10, 2.25]': function(test) {
          test.expect(1);
          test.deepEqual(outlier([2.14, 2.12, 2.15, 2.41, 2.12, 2.11, 2.10, 2.25]).findOutliers(), [2.41], 'should return `[30]`.');
          test.done();
      }
    },

    'testOutlier()': {
      'no args': function(test) {
          test.expect(1);
          test.equal(outlier().testOutlier(), false);
          test.done();
      },

      '[]': function(test) {
          test.expect(1);
          test.equal(outlier([]).testOutlier(), false);
          test.done();
      },

      '[0]': function(test) {
          test.expect(1);
          test.equal(outlier([0]).testOutlier(100), false);
          test.done();
      },

      '[1, 2, 3]': function(test) {
          test.expect(1);
          test.equal(outlier([1, 2, 3]).testOutlier(3), false);
          test.done();
      },

      '[10, 12, 12, 14, 15, 16, 30]': function(test) {
          test.expect(1);
          test.equal(outlier([10, 12, 12, 14, 15, 16, 30]).testOutlier(30), true);
          test.done();
      },

      '[2.14, 2.12, 2.15, 2.41, 2.12, 2.11, 2.10, 2.25]': function(test) {
          test.expect(1);
          test.equal(outlier([2.14, 2.12, 2.15, 2.41, 2.12, 2.11, 2.10, 2.25]).testOutlier(2.41), true);
          test.done();
      }
    }
};
