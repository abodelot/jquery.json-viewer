# jQuery json-viewer

![npm](https://img.shields.io/npm/v/jquery.json-viewer.svg)
![npm](https://img.shields.io/npm/l/jquery.json-viewer.svg)
![npm](https://img.shields.io/npm/dt/jquery.json-viewer.svg)
![workflow](https://github.com/abodelot/jquery.json-viewer/actions/workflows/node.js.yml/badge.svg)

*json-viewer* is a jQuery plugin for easily displaying JSON objects by transforming them into HTML.

Features:
- Syntax highlighting
- Collapse and expand child nodes on click
- Clickable links
- Easily readable and minimal DOM structure
- Optional support for libraries supporting big numbers

Check out the [demo page](https://abodelot.github.io/jquery.json-viewer/demo.html)!

## Install

With npm:

```sh
npm install jquery.json-viewer
```

Make sure jQuery is already included. Then import `jquery.json-viewer.js` and `jquery.json-viewer.css` in your HTML document:

```html
<head>
  <script src="node_modules/jquery.json-viewer/json-viewer/jquery.json-viewer.js"></script>
  <link href="node_modules/jquery.json-viewer/json-viewer/jquery.json-viewer.css" type="text/css" rel="stylesheet">
</head>
```

You can also simply copy `json-viewer/jquery.json-viewer.js` and `json-viewer/jquery.json-viewer.css` files from this git repository into your project.

## Usage

Call the `jsonViewer()` method on target element and pass your JSON data in argument:

```html
<pre id="json-renderer"></pre>
```

```js
var data = {
  "foobar": "foobaz"
};
$('#json-renderer').jsonViewer(data);
```

## Options

The `jsonViewer` method accepts an optional config object as a second argument. The supported options are:

- `collapsed` (boolean, default: `false`): all nodes are collapsed at html generation.
- `rootCollapsable` (boolean, default: `true`): allow root element to be collasped.
- `withQuotes` (boolean, default: `false`): all JSON keys are surrounded with double quotation marks (`{"foobar": 1}` instead of `{foobar: 1}`).
- `withLinks` (boolean, default: `true`): all values that are valid links will be clickable, if `false` they will only be strings.
- `bigNumbers` (boolean, default: `false`): support different libraries for big numbers, if `true` display the real number only, `false` shows object containing big number with all fields instead of number only.

Example:

```js
$('#json-renderer').jsonViewer(data, {collapsed: true, withQuotes: true, withLinks: false});
```

#### Big number support

Enabling `bigNumbers` the json object visible will show the number stored inside the object only and does not display
all fields.

Example Object using Decimal.js - other libraries are similar:
```js
var Decimal = require('decimal.js');
var data = { "x": new Decimal(123) };

$('#json-renderer').jsonViewer(data, {bigNumbers: false});

// {
//   "x": {
//        "constructor": ,
//        "s": 1,
//        "e": 2,
//        "d": [
//          123
//        ]
//   }
// }

$('#json-renderer').jsonViewer(data, {bigNumbers: true});

// {
//   "x": 123
// }
```
The following libraries are supported:

- Decimal.js: https://github.com/MikeMcl/decimal.js/
- Decimal.js-light: https://github.com/MikeMcl/decimal.js-light/
- Big.js: https://github.com/MikeMcl/big.js/
- BigNumber.js: https://github.com/MikeMcl/bignumber.js/
- Lossless-JSON: https://github.com/josdejong/lossless-json

## About

- Author: [Alexandre Bodelot](https://github.com/abodelot)
- License: [MIT License](http://opensource.org/licenses/MIT)

