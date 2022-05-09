/**
 * @jest-environment jsdom
 */
$ = jQuery = require('jquery');
require('../json-viewer/jquery.json-viewer.js');

document.body.innerHTML = '<div id="json"></div>';

test('withLinks option', () => {
  const data = {
    url: 'http://www.hello.com',
  };
  $('#json').jsonViewer(data, { withLinks: true });

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li>url: <a href="http://www.hello.com" class="json-string" target="_blank">http://www.hello.com</a></li></ul>}'
  );

  $('#json').jsonViewer(data, { withLinks: false });

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li>url: <span class="json-string">"http://www.hello.com"</span></li></ul>}'
  );
});

test('withLinks option, complex URL', () => {
  const data = {
    url: 'https://www.google.com/search?channel=fs&q=query+parameter+(no+regexp)',
  };
  $('#json').jsonViewer(data, { withLinks: true });

  expect($('#json a.json-string')[0].href).toEqual(data.url);
});

test('withQuotes option', () => {
  $('#json').jsonViewer({ 'hello': 'world' }, { withQuotes: false });

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li>hello: <span class="json-string">"world"</span></li></ul>}'
  );

  $('#json').jsonViewer({ 'hello': 'world' }, { withQuotes: true });

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li><span class="json-string">"hello"</span>: <span class="json-string">"world"</span></li></ul>}'
  );
});

/**
 * Tests for the presence of a script tag inside the 'json' id.
 * If none are found, the value was correctly escaped for XSS.
 */
function hasScripts(input) {
  $('#json').jsonViewer(input);
  const scriptsInJson = $('#json script');
  return scriptsInJson.length > 0;
}

test('XSS in object value', () => {
  const input = {
    'key_1': '<script>alert(1)</script>'
  };

  expect(hasScripts(input)).toEqual(false);
});

test('XSS in object key', () => {
  const input = {
    '<script>alert(1)</script>': 'val_1'
  };

  expect(hasScripts(input)).toEqual(false);
});

test('big integer in json displayed without rounding (implicit bigint)', () => {
  // Built-in datatype "bigint" differs from "number" and needs its own handling
  // javascript number type will display 66110734225681139 as 66110734225681140 due to lack of precision
  const data = {
    'big': 66110734225681139n,
  };
  $('#json').jsonViewer(data);

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li>big: <span class="json-literal">66110734225681139</span></li></ul>}'
  );
});

test('big integer in json as explicit BigInt', () => {
  const data = {
    'big': BigInt('66110734225681139'),
  };
  $('#json').jsonViewer(data);

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li>big: <span class="json-literal">66110734225681139</span></li></ul>}'
  );
});

test('big integer as number type gets rounded', () => {
  // javascript number type will display 66110734225681139 as 66110734225681140 due to lack of precision
  const data = {
    'big': 66110734225681139,
  };
  $('#json').jsonViewer(data);

  expect($('#json').html()).toEqual(
    '<a href="" class="json-toggle"></a>{<ul class="json-dict"><li>big: <span class="json-literal">66110734225681140</span></li></ul>}'
  );
});
