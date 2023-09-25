const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "index.tsx"),
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "../../../", "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../../"),
    },
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 8000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.USE_MOCK_DATA": "true",
    }),
  ],
};
