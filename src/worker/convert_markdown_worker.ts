import marked from 'marked';
import sanitizeHtml from 'sanitize-html';

/* Worker型のworkerという変数を定義。グローバル関数のselfにTSの型チェックを回避してアクセス */
const worker: Worker = self as any;

/* mainスレからmessageオブジェクトを受け取ったら実行する */
worker.addEventListener('message', (event) => {

  const text = event.data; // 受け取ったeventプロパティからdataだけをtextインスタンスとして抽出
  const html = sanitizeHtml(marked(text), {allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2']}); // textを変換
  // 引数1: サニタイズしたいHTML
  // 引数2: option => allowTagsは許可するHTMLタグを指定する。h1,h2はデフォルトで除外されているので追加している。

  console.log(event);

  worker.postMessage({html}) // mainスレに送信する
});