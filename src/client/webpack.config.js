const { resolve } = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin")

const implementation = require("sass")
const fiber = require("fibers")

module.exports = {
  entry: {
    app: resolve(__dirname, "main.ts")
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "../../built/client"),
    publicPath: "/assets/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".vue", ".vuex", ".styl", ".sass", ".scss"],
    modules: [resolve(process.cwd(), "node_modules")],
    alias: {
      vue: resolve(process.cwd(), "node_modules/vue/dist/vue.js"),
      "@": __dirname
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: "tsconfig.webpack.json"
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"]
          },
          {
            use: ["raw-loader", "pug-plain-loader"]
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation,
              sassOptions: {
                fiber,
                indentedSyntax: true
              }
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          "vue-style-loader",
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader"
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.svg$/,
        use: [
          "file-loader",
          "svgo-loader"
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin()
  ],
  mode: "production"
}
