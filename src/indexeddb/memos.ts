import Dexie from 'dexie';
import dayjs from 'dayjs';
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export interface MemoRecord {
  datetime: string
  title: string
  text: string
};
/*
TypeScriptで型定義する
*/

/* Dexieインスタンスを生成 */
const database = new Dexie('markdown-editor'); // Dexie('DB名')
database.version(1).stores({memos: '&datetime'}) // DBのversion管理.stores(使用するtableとインデックスとなるデータ名)
const memos: Dexie.Table<MemoRecord, string> = database.table('memos');

/* putMemo() : Tableに保存 */
export const putMemo = async (title: string, text: string): Promise<void> => { // 引数で保存したいデータを受け取る
  const datetime = dayjs().toString(); // 日時を取得
  await memos.put({datetime, title, text}); // 3つの要素をmemosテーブルに保存
}