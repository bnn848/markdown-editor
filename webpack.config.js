// import path from 'path';
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  resolve: { // モジュールとして解決するファイルの拡張子を指定する?
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // path.resolve : 絶対パスに変換する
    filename: 'index.js',
    publicPath: 'dist/',
  },
  devServer: {
    hot: true,
    open: true,
  }
}

/*
module: {
  rules: [ // ビルド時に追加で行う処理一覧
    test: /\.ts$/, // <-- .ts$: 末尾に.tsとつくパス
    use: 'ts-loader', // 実行する処理内容
    exclude: /node_modules/, // 除外するファイル(node_moduleディレクトリ内のファイルは開発用なのでビルドする必要がない)
  ],
},

devServer: { <--- npm i webpack-dev-serverしてのち追加
  hot: true, <--- ファイル変更を自動的に反映
  open: true, <--- 起動時にブラウザで開く
}
package.json - script -start に webpack-dev-serverを登録
*/