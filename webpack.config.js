const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ account, autoupload }) => ({
    entry: './src/index.js',
    output: {
        filename: 'js/main.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HubSpotAutoUploadPlugin({
            account,
            autoupload,
            src: 'dist',
            dest: 'theme-with-webpack',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/images', to: 'images' },
                { from: 'src/modules', to: 'modules' },
                { from: 'src/templates', to: 'templates' },
                { from: 'src/theme.json', to: 'theme.json' },
                { from: 'src/fields.json', to: 'fields.json' },
            ],
        }),
    ],
})
