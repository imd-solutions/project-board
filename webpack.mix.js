const mix = require("laravel-mix");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: "graphql-tag/loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".vue", ".json", ".ts"],
        alias: {
            "@mainStore": path.resolve(__dirname, "resources/js/store"),
            "@store": path.resolve(__dirname, "resources/js/store/modules"),
            "@queries": path.resolve(__dirname, "resources/js/apollo/queries"),
            "@mutations": path.resolve(__dirname, "resources/js/apollo/mutations"),
            "@components": path.resolve(__dirname, "resources/js/components"),
            "@partials": path.resolve(__dirname, "resources/js/partials"),
            "@templates": path.resolve(__dirname, "resources/js/templates"),
            "@plugins": path.resolve(__dirname, "resources/js/plugins"),
            "@mixins": path.resolve(__dirname, "resources/js/mixins"),
            "@includes": path.resolve(__dirname, "resources/js/includes"),
            '@application': path.resolve(__dirname, 'resources/js/app/application/components'),
        }
    }
}).styles(["resources/css/main.css"], "public/css/main.css")
    .ts("resources/js/app.ts", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .sass("resources/sass/bulkit/core_startup.scss", "public/css")
    .options({
        processCssUrls: false
    });
