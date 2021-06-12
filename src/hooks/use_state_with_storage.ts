import { useState } from 'react';

/* localStorageからデータを取得する処理をカスタムフックとしてコンポーネントにまとめる */
export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  // const [state, setState] = useState() と同じ形を作る
  // [string, (s: string) => void] カスタムフックの戻り値

  const [value, setValue] = useState<string>(localStorage.getItem(key) || init);
  // 通常のuseState構文で雛形を作る
  // localStorageにItemがあればtruthyとなりその値を、なければnull = falsy となり ''という文字列を初期値にもつ

  /* 値の更新に関する関数をまとめる */
  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue) // setValueに状態を更新する実際の処理を書く
    localStorage.setItem(key, nextValue) // storageにstateを保存する
  }

  return [value, setValueWithStorage] // 状態管理とデータの保存をセットにしたカスタムフックの完成
}