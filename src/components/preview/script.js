require('./style.scss');
let $ = require('jquery');
let PinchZoom = require('pinchzoom');
let tools = require('public/js/tools.js');
let weui = require('weui');
let preview = function(content)
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

		let tips = weui.topTips('已进入预览模式，可双指缩放图片',
		{
			className: 'weui-toptips_success',
			duration: '2000'
		});
		obj.find('.c-preview-close').on('click', function()
		{
			tips.hide();
			tools.animateCSS(obj, 'fadeOutRight', function()
			{
				obj.remove();
			});
		});
	});
}
$(`[data-trigger="preview-img"]`).on('click', function()
{
	if ($('#c-preview').length == 0)
	{
		let loading = weui.loading('loading...');
		let src = $(this).attr('src') || $(this).attr('data-src');
		let img = new Image;
		img.onload = function()
		{
			loading.hide();
			preview(img);
		}
		img.onerror = function()
		{
			loading.hide();
			weui.alert('图片加载失败！');
		}
		img.src = src;
	}
});
module.exports = preview;