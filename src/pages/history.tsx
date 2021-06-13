import React, { useState, useEffect } from 'react';
import {
  useHistory,
  Link
} from 'react-router-dom';
import { Header } from '../components/header';
import {
  getMemoPageCount,
  getMemos,
  MemoRecord // interfaceもimportすることができる
} from '../indexeddb/memos'
import styled from "styled-components";


// /* interface */
interface Props {
  setText: (text: string) => void // 履歴から中身をEditorに渡すためのsetTextのみ必要となる
};


/* ===========
History
=========== */
// export const History: React.FC<Props> = (props) => {
export const History: React.FC<Props> = (props) => {

  /* 状態管理 */
  const {setText} = props // propsからsetTextを分割
  const [memos, setMemos] = useState<MemoRecord[]>([]) // 型指定のあるuseStateで初期値は空配列
  const [page, setPage] = useState(1) // page管理（初期値は１ページ目）
  const [maxPage, setMaxPage] = useState(1) // memoの件数からページ数を計算する必要がある
  const history = useHistory()

  /* useEffectで初回レンダリング時に履歴を取得してsetState */
  useEffect(() => {
    getMemos(1).then(setMemos) // 1ページ目のmemoを取得、取得成功を待ってReactで描画
    getMemoPageCount().then(setMaxPage) // page数も同様
  },[]);
  
  /* ページ管理 */
  const canNextPage: boolean = page < maxPage; // Navi
  const canPrevPage: boolean = page > 1;
  const movePage = (targetPage: number) => { // 現在のページをtargetPageとして受け取る
    if (targetPage < 1 || maxPage < targetPage) {
      return
    } else {
      setPage(targetPage)
      getMemos(targetPage).then(setMemos)
    }
  }
  
  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">エディタへ戻る</Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map( memo => { // Stateをmapしてリスト化する
          return (
            <Memo
              key={memo.datetime}
              onClick={() => {
                setText(memo.text) // editorのtextにmemoのtextをセットする
                history.push('/editor') // editorページに飛ばす
              }}
            >
              <MemoTitle>{memo.title}</MemoTitle>
              <MemoText>{memo.text}</MemoText>
            </Memo>
          )
        })}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  )
};


/* style */
const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`
const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
`
