var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "bootstrap-webpack!./bootstrap.config.js",
        "webpack-hot-middleware/client?reload=true",
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
            { test: /\.(ts(x)?)(\?.*)?$/, loader: 'react-hot-loader!babel-loader?stage=0!ts-loader' },
            { test: /\.(css)(\?.*)?$/, loader: 'style-loader!css-loader' },
            { test: /\.(less)(\?.*)?$/, loader: 'style-loader!css-loader!less-loader' },
            { test: /\.(styl)(\?.*)?$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.(scss|sass)(\?.*)?$/, loader: 'style-loader!css-loader' },
            { test: /\.(json)(\?.*)?$/, loader: 'json-loader' },
            { test: /\.(coffee)(\?.*)?$/, loader: 'coffee-redux-loader' },
            { test: /\.(json5)(\?.*)?$/, loader: 'json5-loader' },
            { test: /\.(txt)(\?.*)?$/, loader: 'raw-loader' },
            { test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/, loader: 'url-loader?limit=10000' },
            { test: /\.(woff|woff2)(\?.*)?$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)(\?.*)?$/, loader: 'file-loader' },
            { test: /\.(wav|mp3)(\?.*)?$/, loader: 'file-loader' },
            { test: /\.(html)(\?.*)?$/, loader: 'html-loader' },
            { test: /\.(md|markdown)(\?.*)?$/, loader: 'html-loader!markdown-loader' },
             //**IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-webpack has access to the jQuery object
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
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
        //new StatsPlugin(path.join(__dirname, "dist", "stats.json"), {
        //    chunkModules: true,
        //    exclude: [
        //        /node_modules[\\\/]react(-router)?[\\\/]/,
        //        /node_modules[\\\/]items-store[\\\/]/
        //    ]
        //}),
        //new webpack.optimize.UglifyJsPlugin({
        //    compressor: {
        //        warnings: false
        //    }
        //}),
        //new webpack.optimize.DedupePlugin()
    ]
}