import Dexie from 'dexie';
import dayjs from 'dayjs';


/* Interface TypeScriptで型定義する */
export interface MemoRecord {
  datetime: string
  title: string
  text: string
};


/* Dexieインスタンスを生成 */
const database = new Dexie('markdown-editor'); // Dexie('DB名')
database.version(1).stores({memos: '&datetime'}) // DBのversion管理.stores(使用するtableとインデックスとなるデータ名)
const memos: Dexie.Table<MemoRecord, string> = database.table('memos'); // memosというTableを生成


/* putMemo() : Tableに保存 */
export const putMemo = async (title: string, text: string): Promise<void> => { // 引数で保存したいデータを受け取る
  const datetime = dayjs().toString(); // 日時を取得
  await memos.put({datetime, title, text}); // 3つの要素をmemosテーブルに保存
};


/* ページ管理 */
const NUM_PER_PAGE: number = 10 // 1ページあたり10件表示する
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count(); // 全メモ数をmemosテーブルから取得する.memosはasyncでDBからデータを取得している
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE) // ページ数: 小数点切り上げ

  return pageCount > 0 ? pageCount : 1
}
// if (pageCount > 0) {
//   return pageCount;
// } else {
//   return 1;
// }


/* getMemo() : Tableから取得 */
export const getMemos = (page: number): Promise<MemoRecord[]> => { // 戻り値の型定義、Promise型の配列
  const offset = (page - 1) * NUM_PER_PAGE // ページの先頭になるmemoを取得する
  
  return memos.orderBy('datetime') // memosテーブルから、datetimeを昇順で取得
              .reverse() // 降順に並び替え
              .offset(offset) // 取得するリスト内の開始位置を設定する。ex. page(3) === 30~39件目を表示
              .limit(NUM_PER_PAGE) // 
              .toArray() // 配列に変換
};