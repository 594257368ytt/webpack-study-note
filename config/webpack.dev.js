const path = require("path"); // nodejs模块，专门用来处理路径问题
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  //入口（相对路径）
  entry: "./src/main.js",
  //输出
  output: {
    //文件的输出路径（绝对路径）
    //__dirname是nodejs的变量代表当前文件（webpack.config.js）的文件夹(my-webpack)的目录
    path: undefined, //字符串拼接项目目录下的dist文件夹
    filename: "static/js/main.js",
    //自动清空path里的内容
    clean: true,
  },
  //加载器
  module: {
    rules: [
      //loader的配置
      {
        test: /\.css$/i,
        //执行顺序从右往左，从上往下
        use: [
          "style-loader", //将js中css通过创建style的形式添加到html中
          "css-loader", //将css文件编译成common.js模块到js中，css文件最终打包到js中
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // loader只能用一个，use能用多个
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片转base64
          },
        },
        generator: {
          //输出图片名字,hash是根据图片内容生成的唯一的名字，ext拓展名，query写url地址时携带的参数可以不写
          filename: "static/image/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi)$/,
        //resource会输出源文件大小，不需要压缩
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules文件不处理
        loader: "babel-loader",
        // options: {
        //   presets: ["@babel/preset-env"],
        // },
      },
    ],
  },
  //拓展
  plugins: [
    //plugins的配置
    //括号里传入选项,context表示那些文件要检查
    new ESLintPlugin({ context: path.resolve(__dirname, "../src") }),
    //引入html插件
    new HtmlWebpackPlugin({
      //模板，以public/index.html文件创建新的html文件
      //新的html文件特点：1、结构和原来一致，会自动打包输出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  //mode
  mode: "development",
};
