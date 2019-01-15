let moduleExports = {
    devtool: require('./base/devtool.config.js'),

    devServer: require('./base/devServer.config.js'),

    entry: require('./base/entry.config.js'),

    output: require('./base/output.config.js'),

    externals: require('./base/externals.config.js'),

    plugins: require('./base/plugins.config.js'),

    module: require('./base/module.config.js'),

    resolve: require('./base/resolve.config.js')
};

module.exports = moduleExports;