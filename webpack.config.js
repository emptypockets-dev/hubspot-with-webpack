const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = ({ account, autoupload }) => ({
    entry: './src/index.js',
    output: {
        filename: 'js/main.js',
    },
    plugins: [
        new HubSpotAutoUploadPlugin({
            account,
            autoupload,
            src: 'dist',
            dest: 'theme-with-webpack',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/css', to: 'css' },
                { from: 'src/images', to: 'images' },
                { from: 'src/modules', to: 'modules' },
                { from: 'src/templates', to: 'templates' },
                { from: 'src/theme.json', to: 'theme.json' },
                { from: 'src/fields.json', to: 'fields.json' },
            ],
        }),
    ],
})
