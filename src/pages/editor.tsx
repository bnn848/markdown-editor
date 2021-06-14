import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
// import ReactMarkdown from 'react-markdown';
// import * as ReactMarkdown from 'react-markdown';
// const ReactMarkdown = require('react-markdown');
import { putMemo } from '../indexeddb/memos';
import { Button } from '../components/button';
import { SaveModal} from '../components/save_modal';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';
// import TestWorker from 'worker-loader!../worker/convert_markdown_worker.ts'; // test.ts記載の型チェックをした上でパスを記述
import ConvertMarkdownWorker from 'worker-loader!../worker/convert_markdown_worker';

/* index.tsxでtextに関するStateを管理し、editor.tsxとhistory.tsxで利用する */
interface Props {
  text: string
  setText: (text: string) => void
};

/* ===========
Editor
=========== */
export const Editor: React.FC<Props> = (props) => { // : React.FCという型宣言(関数コンポーネントという意味)

  /* ------------------------- ↓textデータを受け取る処理↓ ------------------------- */
  const {text, setText} = props; // <--- useStateで定義
  const [showModal, setShowModal] = useState(false);  // <--- モーダル表示
  const [html, setHtml] = useState(''); // <--- markdown
  
  const convertMarkdownWorker = new ConvertMarkdownWorker(); // <--- WebWorkerというマルチスレッド処理でデータを受け渡し
  
  // workerからデータを受け取る処理（初回レンダリング時のみ受け取ればOK）
  useEffect(() => {
    convertMarkdownWorker.onmessage = (event) => {
      setHtml(event.data.html);
    }
  },[]);
  
  // workerに処理を送信する処理（Textが更新されるたびに送信する）
  useEffect(() => {
    convertMarkdownWorker.postMessage(text)
  },[text]);
  /* ------------------------- ↑textデータを受け取る処理↑ ------------------------- */


  return (
    <>
        <HeaderArea>
          <Header title="Markdown Editor">
            <Button onClick={() => setShowModal(true)}>保存する</Button>
            <Link to="/history">履歴を見る</Link> 
          </Header>
        </HeaderArea>
      <Wrapper>
        <TextArea
          value={text}
          onChange={ e => setText(e.target.value)}  // setTextによりカスタムフックの処理が行われる
        />
        <Preview>
          {/* <div children={text} /> */}
          <div dangerouslySetInnerHTML={{__html: html}} />
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
const Wrapper = styled.header`
  position: fixed;
  top: 3rem;
  right: 0;
  bottom: 0;
  left: 0;
`

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
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
