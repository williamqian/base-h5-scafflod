require('./style.scss');
const $ = require('jquery');
let imgAry = [];
//获取页面图片资源，预加载

const r = require.context('../../pages/index/img', true, /^.*\.(jpg|jpeg|png|gif|svg)$/);
r.keys().forEach(function(key)
{
  //console.log(key);
  imgAry.push(r(key));
});
//console.log(imgAry);
let loadingObj = $('#c-loading');
let percentObj = loadingObj.find('span');
let totalAmount = imgAry.length;
let successAmount = 0;
let failAmount = 0;
if (totalAmount == 0)
{
  percentObj.html('100');
  loadingObj.fadeOut();
}
else
{
  let render = function()
  {
    let loadedAmount = successAmount + failAmount;
    percentObj.html(Math.floor(loadedAmount / totalAmount * 100));
    if (loadedAmount == totalAmount)
    {
      loadingObj.fadeOut();
    }
  }
  for (let i = 0; i < totalAmount; i++)
  {
    let img = new Image;
    img.onload = function()
    {
      successAmount++;
      render();
    }
    img.onerror = function()
    {
      failAmount++;
      render();
    }
    img.src = imgAry[i];
  }
}