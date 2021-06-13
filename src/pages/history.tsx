import React, { useState, useEffect } from 'react';
import {
  useHistory,
  Link
} from 'react-router-dom';
import { Header } from '../components/header';
import {
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

  const {setText} = props // propsからsetTextを分割
  const [memos, setMemos] = useState<MemoRecord[]>([]) // 型指定のあるuseStateで初期値は空配列
  const history = useHistory()

  /* useEffectで初回レンダリング時に履歴を取得してsetState */
  useEffect(() => {
    getMemos().then(setMemos)
  },[]);
  
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