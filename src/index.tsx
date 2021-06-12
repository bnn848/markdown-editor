import React from 'react'; // TypScriptでコンパイルする際はimport React省略不可 -> use strictがdefaultで付く
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Editor } from './pages/editor';

/* GlobalStyleはスコープを無視する */
const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }`;

/* 他のコンポーネントをまとめあげる */
const Main = (
  <>
    <GlobalStyle />
    <Editor />
  </>
  )

render(Main, document.getElementById('app'));