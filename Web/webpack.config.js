var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: [
        './app/entry.tsx'
    ],
    devtool: "source-map",
    debug: true,
    target: "web",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].js",
        sourceMapFilename: "debugging/[file].map",
        libraryTarget: undefined
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.jsx'],
        root: path.join(__dirname, "app"),
        moduleDirectories: ["web_modules", "node_modules"]
    },
    module: {
        loaders: [
            { test: /\.(ts(x)?)(\?.*)?$/, loader: 'react-hot-loader!babel?presets[]=react,presets[]=es2015!ts-loader' },
            { test: /\.(css)(\?.*)?$/, loader: 'style-loader!css-loader' },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.PrefetchPlugin("react"),
        new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
    ]
}