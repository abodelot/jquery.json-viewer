/**
 * jQuery json-viewer
 * @author: Alexandre Bodelot <alexandre.bodelot@gmail.com>
 */
(function($){

	/**
	 * Check if arg is either an array with at least 1 element, or a dict with at least 1 key
	 * @return boolean
	 */
	function is_collapsable(arg)
	{
		return arg instanceof Object && Object.keys(arg).length > 0;
	}

	/**
	 * Transform json object into html representation
	 * @return string
	 */
	function json2html(json)
	{
		html = '';
		if (typeof json === 'string') {
			html += '<span class="json-string">"' + json + '"</span>';
		}
		else if (typeof json === 'number') {
			html += '<span class="json-literal">' + json + '</span>';
		}
		else if (typeof json === 'boolean') {
			html += '<span class="json-literal">' + json + '</span>';
		}
		else if (json === null) {
			html += '<span class="json-literal">null</span>';
		}
		else if (json instanceof Array) {
			if (json.length > 0) {
				html += '[<ol class="json-array">';
				for (var i in json) {
					html += '<li>'
					// Add toggle button if item is collapsable
					if (is_collapsable(json[i]))
						html += '<a href class="json-toggle"></a>';

					html += json2html(json[i]);
					// Add comma if item is not last
					if (i < json.length - 1)
						html += ',';
					html += '</li>';
				}
				html += '</ol>]';
			}
			else {
				html += '[]';
			}
		}
		else if (typeof json === 'object') {
			var key_count = Object.keys(json).length;
			if (key_count > 0) {
				html += '{<ul class="json-dict">';
				for (var i in json) {
					if (json.hasOwnProperty(i)) {
						html += '<li>';
						// Add toggle button if item is collapsable
						if (is_collapsable(json[i]))
							html += '<a href class="json-toggle"></a>';

						html += i + ': ' + json2html(json[i]);
						// Add comma if item is not last
						if (--key_count > 0)
							html += ',';
						html += '</li>';
					}
				}
				html += '</ul>}';
			}
			else {
				html += '{}';
			}
		}
		return html;
	}

	/**
	 * jQuery plugin method
	 */
	$.fn.json_viewer = function(json) {
		// jQuery chaining
		return this.each(function() {
			// Transform to HTML
			var html = json2html(json)
			if (is_collapsable(json))
				html = '<a href class="json-toggle"></a>' + html;

			$(this).unbind('click');

			// Insert HTML in target DOM element
			$.fn.html.call($(this), html);

			// Bind click on toggle buttons
			$(this).on('click', 'a.json-toggle', function() {
				var target = $(this).toggleClass('collapsed').siblings('ul.json-dict, ol.json-array');
				target.toggle();
				var count = target.children('li').length;
				if (target.is(':visible')) {
					target.siblings('.json-placeholder').remove();
				}
				else {
					var placeholder = count + (count > 1 ? ' items' : ' item');
					target.after('<span class="json-placeholder">' + placeholder + '</span>');
				}
				return false;
			});
		});
	};
})(jQuery);
