require('./style.scss');
let $ = require('jquery');
let tools = require('public/js/tools.js');

if ($('#c-share').length == 0)
{
	let tpl = `<div id="c-share" class="u-invisible">
				</div>`;
	$('body').append(tpl);
}
let obj = $('#c-share');
let showShare = function()
{
	tools.animateCSS(obj, 'fadeInRight', function()
	{
		obj.one('click', function()
		{
			tools.animateCSS(obj, 'fadeOutRight', function()
			{
				obj.css('visibility', 'hidden');
			});
		});
	});
}

$('[data-trigger="share"]').on('click', function()
{
	showShare();
});