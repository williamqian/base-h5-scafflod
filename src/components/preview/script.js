require('./style.scss');
let $ = require('jquery');
let PinchZoom = require('pinchzoom');
let tools = require('public/js/tools.js');
module.exports = function(content)
{
	let tpl = `<div id="c-preview" class="u-invisible">
							<div class="c-preview-box"><div class="c-preview-content u-center"></div></div>
							<div class="c-preview-close"></div>
						</div>`;
	$('body').append(tpl);
	let obj = $('#c-preview');
	new PinchZoom.default(obj.find('.c-preview-box').get(0));

	obj.find('.c-preview-content').html(content);
	tools.animateCSS(obj, 'fadeInRight', function()
	{
		obj.find('.c-preview-close').on('click', function()
		{
			tools.animateCSS(obj, 'fadeOutRight', function()
			{
				obj.remove();
			});
		});
	});
}