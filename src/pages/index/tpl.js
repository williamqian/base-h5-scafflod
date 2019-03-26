  const cdn = require('cdn');
  let data = require('./data.js');
  const content = require('./content');
  data = Object.assign(
  {},
  {
    data: data
  },
  {
    cdn
  });
  let renderData = {};
  const r = require.context('components', true, /^\.\/(header|footer|loading)\/content\.html$/);
  //const r = require.context('components', true, /.+\/content\.html$/);
  r.keys().forEach(function(key)
  {


    let componentName = key.substring(2, key.lastIndexOf('/'));

    renderData[componentName] = r(key)(data);
  });
  renderData = Object.assign(
  {}, data, renderData);
  module.exports = content(renderData);