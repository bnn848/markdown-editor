/*
TypeScriptのmodule importを解決するため以下のようなdeclareファイルを作成
*/


declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}