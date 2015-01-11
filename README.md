# jQuery json-viewer

*json-viewer* is a jQuery plugin for easily displaying JSON objects by transforming them into HTML.

Features:
- Syntax highlighting
- Collapse and expand child nodes on click
- Clickable links
- Easily readable and minimal DOM structure

Check out the [demo page](http://rawgit.com/abodelot/jquery.json-viewer/master/demo.html)!

## Usage

Import `jquery.json-viewer.js` and `jquery.json-viewer.css` in your application.

Then just call the `jsonViewer()` method and pass your JSON data in argument:
```html
<pre id="json-renderer"></pre>
```

```js
var data = {
	// ...
};
$('#json-renderer').jsonViewer(data);
```

## About

- Author: [Alexandre Bodelot](https://github.com/abodelot)
- License: [MIT License](http://opensource.org/licenses/MIT)

