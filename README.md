# Outlier

In statistics, an outlier is a data point that significantly differs from the other data points in a sample. Often, outliers in a data set can alert statisticians to experimental abnormalities or errors in the measurements taken, which may cause them to omit the outliers from the data set.

![Outliner](http://i.imgur.com/GXlRL22.jpg)

## Getting Started

Install the module with: `npm install outlier`.

```javascript
var outlier = require('outlier');
outlier([12, 14, 51, 12, 10, 9, 16]).findOutliers(); // [51]
outlier([12, 14, 51, 12, 10, 9, 16]).testOutlier(51); // true
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
