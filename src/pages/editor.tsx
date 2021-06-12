import React, { useState } from 'react';
import styled from 'styled-components'
import { useStateWithStorage } from '../hooks/use_state_with_storage'; // カスタムフック
import ReactMarkdown from 'react-markdown';
// import * as ReactMarkdown from 'react-markdown';
// const ReactMarkdown = require('react-markdown');
import { putMemo } from '../indexeddb/memos';
import { Button } from '../components/button';
import { SaveModal} from '../components/save_modal';

/* 保存時のKeyを決める。今回はパス名:値とする */
const StorageKey ='pages/editor:text';


/* ===========
Editor
=========== */
export const Editor: React.FC = () => { // : React.FCという型宣言(関数コンポーネントという意味)

  /* テキスト入力（カスタムフック） */
  const [text, setText] = useStateWithStorage('', StorageKey); // 引数1: 初期値, 引数2: Key

  /* モーダル表示 */
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <Header>
        Markdown Editor
        <HeaderControl>
          <Button onClick={() => setShowModal(true)}>保存する</Button>
        </HeaderControl>
      </Header>
      <Wrapper>
        <TextArea
          value={text}
          onChange={ e => setText(e.target.value)}  // setTextによりカスタムフックの処理が行われる
        />
        <Preview>
          <ReactMarkdown children={text} />
        </Preview>
      </Wrapper>

      {showModal && ( // showModal = true の場合にのみ描画するコンポーネント
        <SaveModal
          onSave={(title: string) => {
            putMemo(title, text)
            setShowModal(false)
          }}
          onCancel={() => setShowModal(false)}
        />
      )}

    </>
  )
}


/* component内でstyleを記述するパターン */
const Header = styled.header`
  align-content: center;
  display: flex;
  font-size: 1.5rem;
  height: 2rem;
  justify-content: space-between;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const HeaderControl = styled.div`
  height: 2rem;
  display: flex;
  align-content: center;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`
