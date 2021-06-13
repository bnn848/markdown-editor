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
}

/* getMemo() : Tableから取得 */
export const getMemos = (): Promise<MemoRecord[]> => { // 戻り値の型定義、Promise型の配列
  return memos.orderBy('datetime') // memosテーブルから、datetimeを昇順で取得
              .reverse() // 降順に並び替え
              .toArray() // 配列に変換
};