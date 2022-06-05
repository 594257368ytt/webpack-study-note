# 基本使用

## 作用

### 编译成浏览器能识别的代码

这样的代码要想在浏览器运行必须经过编译成浏览器能识别的 JS、Css 等语法，才能运行。（当直接运行项目中的index.html是无法识别main.js中引入的js文件的，但是npm run serve可以运行不报错）

![image-20220527091020510](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527091020510.png)

### 压缩代码

### 做兼容性处理

### 提升代码性能

## 常见打包工具

### webpack

### Vite

## 项目结构

### index.html+main.js+App.vue关系

浏览器访问的第一个文件是index.html，里面有一个id为app的挂载点，之后vue的根实例挂载在上面。

main.js主要用来把app.vue挂载到index.html 的 id='app'的地方。

main.js作为项目入口文件，运行中找到需要挂载的位置，就是index.html，先显示index.html挂载点处的内容，随后会被实例中的组件模板中的内容代替。

```js
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

- 项目名
  - src
    - main.js（打包入口文件）
    - js
    - css
  - public（长久不变的静态资源）
    - index.html（静态页面，也可以在里面写个id='app'的div，在main.js中把id 为app的节点挂载到vue中）

### webpack引入

### 初始化package.json

用`npm init -y`就可以初始化一个最基本的package.json文件。

```json
{
    "name": "my-webpack",//包名，不能叫webpack，只有这个影响程序运行，其他都不影响
    "version": "0.1.0",//包版本
    "description":"",//包描述
    "main":"./src/main.js"//主文件
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    }, //运行指令
}
```

### 安装webpack、webpack-cli依赖

npm i webpack webpack-cli -D

### 运行webpack指令

npx指令将node_modules里的bin临时添加为环境变量，即可访问环境变量的程序。下面的指令的意思是，运行webpack包作为指令，webpack指令的用法是，告诉他从那个文件入口，在指定一下开发模式，回车就开始打包文件了。production是生产模式。

npx webpack ./src/main.js --mode=development

![image-20220527094703568](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527094703568.png)

### 再次运行打包后的文件

打包的文件在dist中，那么直接在index.html添加打包后的js文件。在浏览器中打开就可以不报错了。

```html
<script src="../dist/main.js"></script>
```

![image-20220527095319346](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527095319346.png)

### 小结

webpack本身功能比较少，只能处理js，遇到css会报错，所以接下来学习如何处理其他资源

# 配置

## 核心概念

### entry（入口）

 从哪个文件开始打包

### output（输出）

打包完的文件输出到哪里去，如何命名等

### loader(加载器)

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

### plugins（插件）

扩展 Webpack 的功能

### mode（模式）

开发模式：development，开发的时候代码能运行

生产模式：production，对代码做优化

## 基本配置

配置文件定要在项目根目录

配置文件的名字一定要是webpack,config.js

```js
const path = require('path') // nodejs模块，专门用来处理路径问题
module.exports = {
  //入口（相对路径）
  entry: './src.main.js',
  //输出
  output: {
    //文件的输出路径（绝对路径）
    //__dirname是nodejs的变量代表当前文件（webpack.config.js）的文件夹(my-webpack)的目录
    path: path.resolve(__dirname, 'dist'), //字符串拼接项目目录下的dist文件夹
    filename: 'main.js',
  },
  //加载器
  module: {
    rules: [
      //loader的配置
    ],
  },
  //拓展
  plugins: [
    //plugins的配置
  ],
  //mode
  mode: 'development',
}
```

上面这段配置等价于上面的webpack基本功能npx语句。

所以现在运行不用那么长了，只要`npx webpack`就可以，会直接去红笔标注的目录下寻找webpack,config.js文件，根据它的配置执行打包操作。

![image-20220527102857484](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527102857484.png)

![image-20220527102552787](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527102552787.png)

# 开发者模式

开发代码时使用的模式

这个模式下我们主要做两件事：

## 编译代码，使浏览器能识别运行

开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源

## 代码质量检查，树立代码规范

提前检查代码的一些隐患。

提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。

# 处理样式资源

处理css、less、sass、scss、styl

loader官方文档loader号https://webpack.docschina.org/loaders/

## css

### 写css文件

在src新建css文件夹新建index.css

### 引入文件

将css文件引入main.js，要引入才能打包

```
import './css/index.js'
```

直接打包error，提示模块解析失败，需要loader

![image-20220527110017090](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527110017090.png)



根据官方文档配置

![image-20220527110142387](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527110142387.png)

### 安装css loader依赖

```
npm install --save-dev css-loader
```

### 在webpack.config.js配置

```js
 rules: [
  //loader的配置
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
],
```

但直接打包会报错，这个style-loader没有下载，官网让下载的包不全，要多下一个包。所以要注意`rules里用了多少loader就下载多少个loader`

![image-20220527111051979](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527111051979.png)

`npm i style-loader -D`

### 结果

css直接打包到js里面，dist/main.js，所以打开浏览器直接可以看到

![image-20220527111618202](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527111618202.png)

![image-20220527111734256](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527111734256.png)

这时给index.html添加一个box就可以显示

![image-20220527111906174](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527111906174.png)

## less

### 新建less文件

src/less/index.less

### main.js引入

```js
import './less/index.less'
```

### 安装 less和`less-loader

```
npm install less less-loader --save-dev
```

### webpack.config.js配置

官网文档use这里用的是loader，loader只能用一个，use能用多个

```js
{
    test: /\.less$/i,
    use: [
      // loader只能用一个，use能用多个
      'style-loader',
      'css-loader',
      'less-loader',
    ],
},
```

### npx webpack

![image-20220527113115162](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527113115162.png)

![image-20220527113232827](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220527113232827.png)

# web开发者助手

https://www.baidufe.com/fehelper/index/index.html下载拓展

chrome-extension://pkgccpejnmalmdinmhkkfafefagiiiad/options/index.html安装拓展

![image-20220529044206119](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529044206119.png)

# 处理图片资源

采用`file-loader`和 `url-loader`

```js
{
    test: /\.(png|jpe?g|gif|webp)$/,
    type: "asset",
},
```

type:"asset"相当于使用url-loader，对图片进行处理。

直接打包是可以将图片原封不动打包到dist文件夹下。

小于10kb的图片转化为base64格式，好处是把图片转化成字符串，可以下载fehelper里的图片转base64就可以拖拽图片转换。浏览器可以直接识别为图片，优势是字符串不需要额外发起请求，减少图片请求数量，服务器压力小，缺点是体积会变大。

在官方文档搜索asset找到资源模块，转换base64编程data URI的形式，配置方式：

![image-20220529045944098](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529045944098.png)

```JS
 {
    test: /\.(png|jpe?g|gif|webp|svg)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024, // 小于10kb的图片转base64
      },
    },
},
```

由于之前打包了一次直接生成图片，为了看到效果需要把dist文件删除在打包，可以看到小于等于10kb的文件没有转化为图片，但在网页中有显示，大于10kb的文件被转为图片了。

![image-20220529052515719](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529052515719.png)

点击元素可以看到是base64形式

![image-20220529052652950](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529052652950.png)

# 修改输出文件目录

## path属性后跟的文件名是所有文件的路径

```js
output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js',
},
```

## filename属性后跟的文件名是js文件的路径

```
output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'static/js/main.js',
},
```

## 图片文件输出路径

![image-20220529053617799](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529053617799.png)

```js
  {
    test: /\.(png|jpe?g|gif|webp|svg)$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024, // 小于10kb的图片转base64
      },
    },
    generator: {
      //输出图片名字,hash是根据图片内容生成的唯一的名字,如果觉得名字台城可以hash:10只取前10位，ext拓展名，query写url地址时携带的参数可以不写
      filename: 'static/image/[hash][ext][query]',
    },
  },
```

最终的dist结构

![image-20220529054145982](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529054145982.png)

文件名变短之后

![image-20220529054421585](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529054421585.png)

# 自动清空上次打包内容

在output中加一句

```js
output: {
    //自动清空path里的内容
    clean: true,
},
```

之前：

![image-20220529111057965](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529111057965.png)

打包后：

![image-20220529111129297](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529111129297.png)

# 处理字体图标资源

## 官网下载

下载字体图标库https://www.iconfont.cn/

点击素材库-官方图标库

![image-20220529202937969](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529202937969.png)

点击图标加入购物车

![image-20220529202909766](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529202909766.png)

把购物车中的图标添加至项目

![image-20220529203028762](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529203028762.png)

取项目名

![image-20220529203059304](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529203059304.png)

下载到本地

![image-20220529203155368](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529203155368.png)

下载后解压打开到html文件

![image-20220529203503314](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529203503314.png)

选择最简单的font class引用，unicode是ie6以上能用，font class ie8 以上，symbol ie9以上，unicode兼容性最好。选择最简单的font class

![image-20220529203548512](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529203548512.png)

首先将iconfont.css，worf，ttf文件复制到项目中

![image-20220529205021549](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529205021549.png)

## 修改css路径

将iconfont.css中的url路径改成现在的

![image-20220529205124149](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529205124149.png)

## main.js中引入

```js
import './css/iconfont.css'
```

打包后dist会有字体文件

![image-20220529205420588](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529205420588.png)

## 配置打包到指定目录

```js
{
    test: /\.(ttf|woff2?)$/,
    //resource会输出源文件大小，不需要压缩
    type: 'asset/resource',
    generator: {
      filename: 'static/media/[hash:10][ext][query]',
    },
},
```

![image-20220529213317031](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529213317031.png)

## 显示图标

```html
<span class="iconfont icon-WIFI"></span>
<span class="iconfont icon-gift"></span>
<span class="iconfont icon-chart-line"></span>
<span class="iconfont icon-headset-fill"></span>
<span class="iconfont icon-wind-cry"></span>
```

![image-20220529213754330](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220529213754330.png)

# 处理其他资源

如果有媒体资源，就和字体配置写一起

```js
  {
    test: /\.(ttf|woff2?|map3|map4|avi)$/,
    //resource会输出源文件大小，不需要压缩
    type: 'asset/resource',
    generator: {
      filename: 'static/media/[hash:10][ext][query]',
    },
  },
```

# 处理js资源

Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。

先用Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理。

## eslint

用来检测 js 和 jsx 语法

### 配置文件

- 新建文件在项目根目录：
  - `.eslintrc`
  - `.eslintrc.js`
  - `.eslintrc.json`

  区别在于配置格式不一样

- `package.json` 中 `eslintConfig`：不需要创建文件，在原有文件基础上写

### 具体配置

.eslintrc.js

```js
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
```

#### parserOptions 解析选项

指示eslint检查语法的版本

```js
parserOptions: {
  ecmaVersion: 6, // 用的什么ES 语法版本
  sourceType: "module", // 用的什么ES 模块化
  ecmaFeatures: { // 有没有新的ES 其他特性
    jsx: true // 如果是 React 项目，就需要开启 jsx 语法
  }
}
```

#### rules 具体规则

##### 关闭规则

`"off"` 或 `0`

##### 开启规则

`"warn"` 或 `1` - 发生错误就警告 (不会导致程序退出)

##### 开启规则

`"error"` 或 `2` - 发生错误就报错 (当被触发的时候，程序会退出)

```js
rules: {
  semi: "error", // 禁止使用分号
  'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
  'default-case': [
    'warn', // 要求 switch 语句中有 default 分支，否则警告
    { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
  ],
  eqeqeq: [
    'warn', // 强制使用 === 和 !==，否则警告
    'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
  ],
}
```

##### 官方规则文档

https://eslint.bootcss.com/docs/rules/

#### extends 继承

比较有名的规则

##### Eslint 官方的规则

https://eslint.bootcss.com/docs/rules/：`eslint:recommended`

##### Vue Cli 官方的规则

https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`

##### React Cli 官方的规则

https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

打钩的都是eslint推荐的官方规则：

![image-20220530151641446](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220530151641446.png)

```js
// 例如在React项目中，我们可以这样写配置
module.exports = {
  extends: ["react-app"],  //规则名，规则需要下载，官方规则不用下载
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    eqeqeq: ["warn", "smart"],
  },
};
```

### 案例

webpack4时eslint在loader里配置，webpack5在plugins里配置

![image-20220530154813509](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220530154813509.png)

#### 安装eslint-webpack-plugin、eslint依赖

```
npm install eslint-webpack-plugin eslint --save-dev
```

#### 插件引入

插件需要引入才能使用

```js
const ESLintPlugin = require('eslint-webpack-plugin');
plugins: [
    //plugins的配置
    //括号里传入选项,context表示那些文件要检查
    new ESLintPlugin({ context: path.resolve(__dirname, 'src') }),
],
```

#### eslint配置文件

根目录创建.eslintrc.js

```js
module.exports = {
  // 继承 Eslint 规则
  extends: ['eslint:recommended'],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量,如console.log
  },
  parserOptions: {
    ecmaVersion: 6, //es6
    sourceType: 'module', //es module
  },
  rules: {
    'no-var': 2, // 不能使用 var 定义变量
  },
}
```

#### 运行

程序没问题可以直接npx webpack运行，当定义一个var变量就会报错了。

![image-20220530162637154](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220530162637154.png)

如果想在运行之前就有提醒，可以安装eslint和vetur插件，如果还没有提醒，就要看下这里有没有禁用

![image-20220531153612400](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220531153612400.png)

注意：

1. eslint的配置文件只会对src下面的文件进行校验修正，不会对src外部的文件进行修正，比如index.html。

2. 如果只自动修复eslint不修复Prettier的话要注意，可能是因为安装了 Prettier，请禁用 或 卸载它,否则 会 影响 eslint 和 vetur 扩展的功能！

   更多关于 eslint 和 vetur 的内容在https://blog.csdn.net/jameszou707/article/details/122161445，也下载为pdf在文件《eslint+prettier检查和修复代码》。

修改后运行就不会报错了。

3. dist下的js也会报错（但不回修正），需要让eslint不要检查src外的文件。

#### eslint忽视哪些文件校验

新建.eslintignore，在里面写dist文件夹名

![image-20220601173512409](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601173512409.png)

就会不检查了dist下面的语法错误。

## babel

将ES6 语法编写的代码转换为更低级的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

### 配置文件

- `babel.config.*`：新建文件，位于项目根目录
  - `babel.config.js`
  - `babel.config.json`
- `.babelrc.*`：新建文件，位于项目根目录
  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`
- `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写

### 具体配置

```javascript
module.exports = {
  // 预设
  presets: [],
};
```

#### presets 预设

就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，把es6的语法变异成es5（重点）
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

### 案例

![image-20220601181013929](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601181013929.png)

#### 安装依赖

webpack 4.x | babel-loader 8.x | babel 7.x

```
npm install -D babel-loader @babel/core @babel/preset-env
```

babel核心包，babel预设

#### 配置

webpack.config.js中这样配置

```js
  {
    test: /\.js$/,
    exclude: /node_modules/, //排除node_modules文件不处理
    loader: "babel-loader",
    // options: {
    //   presets: ["@babel/preset-env"],
    // },
  },
```

options可以写在webpack里面也可以写在另外的配置文件babel.config.js，写在外面比较好修改所以就写在外面。

```js
module.exports = {
  // 智能预设，能编译es6语法
  presets: ["@babel/preset-env"],
};
```

#### 打包

可以看到打包前箭头函数被打包成箭头函数

![image-20220601182511110](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601182511110.png)

打包之后变成了for遍历

![image-20220601182909647](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601182909647.png)

# 处理html资源

把手动引入取消，避免引入很多的文件，都要手动添加的麻烦，还有路径写错的麻烦。

![image-20220601183358558](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601183358558.png)

## 官方文档

在插件里找html相关插件

![image-20220601183820131](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601183820131.png)

## 安装

```
npm install --save-dev html-webpack-plugin
```

## 引入webpack.config.js 

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
  plugins: [
    //plugins的配置
    //括号里传入选项,context表示那些文件要检查
    new ESLintPlugin({ context: path.resolve(__dirname, "src") }),
    //引入html插件
    new HtmlWebpackPlugin(),
  ],
```

直接打包的话，dist下面会多一个index.html

![image-20220601184539673](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601184539673.png)

发现只有main.js，其他标签结构没有了。

![image-20220601184632564](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601184632564.png)

所以引入还要多加一步属性

````js
const HtmlWebpackPlugin = require("html-webpack-plugin");  
plugins: [
    //plugins的配置
    //括号里传入选项,context表示那些文件要检查
    new ESLintPlugin({ context: path.resolve(__dirname, "src") }),
    //引入html插件
    new HtmlWebpackPlugin({
      //模板，以public/index.html文件创建新的html文件
      //新的html文件特点：1、结构和原来一致，会自动打包输出的资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
````

再打包可以看到：

报错：

![image-20220601185437856](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601185437856.png)

在index.html中

替换前

```
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
1
```

替换后

```
<link rel="icon" href="<%= htmlWebpackPlugin.options.url %>favicon.ico">
```

在打包，打包成功，可以看到dist的index.html下面自动引入了main.js还添加了其他标签。

![image-20220601185626567](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220601185626567.png)

# 搭建开发服务器&自动化

开发时，只能通过npx webpack才能更新打包后的代码，这样才能看到引入的js,css等资源，希望自动化。

搭建服务器自动监视src下的文件发生变化就重新打包。

## 安装

```
npm i html-webpack-plugin -D
```

## webpack.config.js配置

```js
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
```

## 启动

```
npx webpack serve
```

每次保存都会重新编译

![image-20220602000356264](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602000356264.png)

开发服务器，不会输出打包文件，因为是在内存中编译打包的。

# 总结

开发模式配置

```
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
    path: path.resolve(__dirname, "dist"), //字符串拼接项目目录下的dist文件夹
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
    new ESLintPlugin({ context: path.resolve(__dirname, "src") }),
    //引入html插件
    new HtmlWebpackPlugin({
      //模板，以public/index.html文件创建新的html文件
      //新的html文件特点：1、结构和原来一致，会自动打包输出的资源
      template: path.resolve(__dirname, "public/index.html"),
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

```

# 生产模式

## 准备工作

新建一个文件夹config，将原来的开发模式config名称换成webpack.dev.js，在新建一个webpack.prod.js

### 开发模式下的配置文件

（没有输出，启动服务器只要修改就能看到变化）

相对路径不用改

因为是相对于运行代码的目录。所以还是在根目录开始

#### 绝对路径要改

回退一层

#### 开发模式没有输出，需要serve

可以把path设置成undefined

![image-20220602005038901](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602005038901.png)

![image-20220602005113931](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602005113931.png)

#### 运行

运行时加上配置文件路径

```
npx webpack serve --config ./config/webpack.dev.js
```

### 生产模式下的配置文件

#### 有输出

要path和clear，

#### 修改绝对路径

#### 不需要devServer

删掉

![image-20220602010115393](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602010115393.png)

![image-20220602010149415](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602010149415.png)

![image-20220602010306290](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602010306290.png)

#### 运行不需要serve，有输出

```
npx webpack --config ./config/webpack.prod.js
```

输出dist看到打包的内容，默认会对代码进行压缩。

![image-20220602011022411](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220602011022411.png)

### 运行命令优化

在package.json中配置在script对象下，配置自定义命令名

```json
  "scripts": {
    "start":"npm run dev",
    "dev":"webpack serve --config ./config/webpack.dev.js",
    "build":"webpack --config ./config/webpack.prod.js"
  },
```

想运行开发模式：

```
npm start
```

实际是在运行，启动的是开发模式

````
npm run dev
````

想运行生产模式：

```
npm run build
```

# css处理

## 提取css成单独文件

Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式（内部样式表、行内样式表）

这样对于网站来说，会出现闪屏现象，用户体验不好

所以生成单独css 文件，通过 link 标签加载性能才好（外部样式表）

将network调成3G可以观察到，先解析的是html代码 -> js解析 -> 创建style标签插入页面 -> 解析css

### 下载包

![image-20220603204205862](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603204205862.png)

```
npm install --save-dev mini-css-extract-plugin
```

### 插件都需要引入

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
```

### 把style-loader换成MiniCssExtractPlugin.loader

可以单独抽取css文件，注意改后不是字符串

```js
  {
    test: /\.css$/i,
    //执行顺序从右往左，从上往下
    use: [
      MiniCssExtractPlugin.loader, //将js中css通过创建style的形式添加到html中
      "css-loader", //将css文件编译成common.js模块到js中，css文件最终打包到js中
    ],
  },
  {
    test: /\.less$/i,
    use: [
      // loader只能用一个，use能用多个
      MiniCssExtractPlugin.loader,
      "css-loader",
      "less-loader",
    ],
  },
```

### 插件new调用

```js
plugins: [
    new MiniCssExtractPlugin(),
],
```

### 打包

```
npm run build
```

![image-20220603222018677](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603222018677.png)

打包后dist下面多了index.css文件，默认把所有css文件合在一个文件中。

### 指定css目录

```js
  //拓展
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
  ],
```

### 再次打包

![image-20220603222631715](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603222631715.png)

打开dist文件夹的页面，可以访问

![image-20220603222757893](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603222757893.png)

## css兼容性处理

### 下载包

js兼容性babel

postcss-loader样式兼容性包

postcss-loader依赖于postcss

postcss要写postcss-preset-env兼容性预设来解决样式兼容性问题

```
npm i postcss-loader postcss postcss-preset-env -D
```

### 配置

需要卸载css-loader的后面，less-loader的前面。所有需要兼容性处理的文件都要加上这个配置。

携程对象形式可以用option给loader鞋其他的配置，默认配置直接写名字，如果要给loader写配置项要写成option形式。

```js
 {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          "postcss-preset-env", // 能解决大多数样式兼容性问题
        ],
      },
    },
  },
```

![image-20220603223811985](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603223811985.png)

![image-20220603224100572](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603224100572.png)

### 写有兼容性问题的样式

![image-20220603224235217](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603224235217.png)

### 打包

```
npm run build
```

发现flex没有做任何处理，原因是没有告诉做浏览器兼容性做到什么程度。

打开package.json中写一个配置，ie浏览器并且ie8以上有兼容性问题的都要做兼容性处理。

可以在这个网站查看是否有css兼容性问题：https://caniuse.com/?search=flex

![image-20220603231731034](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603231731034.png)

可以看到6-9都不支持，所以写8以上的话，会对flex进行处理

```
"browserslist": [
	"ie >= 8"
]
```

### 再次运行

![image-20220603230833973](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603230833973.png)

### 常用配置

last 2 version所有浏览器都只要最近的两个版本，

覆盖99%浏览器，

版本死亡的也不要。

```json
{
  // 其他省略
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

### 再次打包

![image-20220603232250847](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603232250847.png)

没有兼容性前缀

## 封装样式loader函数

css兼容性配置有大多重复的地方所以可以把它封装成一个函数。把use后面重复的内容放到函数的return里。

```js
function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader, //将js中css通过创建style的形式添加到html中
    "css-loader", //将css文件编译成common.js模块到js中，css文件最终打包到js中
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre, //需要less-loader就会往后加less-loader
  ].filter(Boolean);  //移除数组元素中所有为 ”false“ 类型元素,不传是undefined就是false
}
{
    test: /\.css$/i,
    //执行顺序从右往左，从上往下
    use: getStyleLoader(),
},
{
    test: /\.less$/i,
    use: getStyleLoader("less-loader"),
},
```

### 打包

样式没有问题，代码可复用性更强。

# css压缩

![image-20220603234016938](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603234016938.png)

## 安装依赖

```
npm install css-minimizer-webpack-plugin --save-dev
```

## 引入

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
plugins: [
    new CssMinimizerPlugin(),
],
```

## 打包

```
npm run build
```

![image-20220603234454056](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220603234454056.png)

可以看到css被压缩了，相同样式被合并。

# html，js压缩

默认生产模式已经开启了：html 压缩和 js 压缩

不需要额外进行配置

