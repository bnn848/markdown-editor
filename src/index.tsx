import React from 'react'; // TypScriptでコンパイルする際import省略不可 -> use strictがdefaultで付く
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Editor } from './pages/editor';
import { History } from './pages/history';
import {
  HashRouter as Router, // 今回はHashRouterを使う（BrowserRouterと違いHistoryAPIではな#を用いる）
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useStateWithStorage } from './hooks/use_state_with_storage';


/* StorageKey */
const StorageKey = '/editor:text'

/* 他のコンポーネントをまとめあげる */
const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage('', StorageKey) // カスタムコンポーネント

  return (
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route exact path="/editor">
          <Editor
            text={text}
            setText={setText}
          />
        </Route>
        <Route exact path="/history">
          <History
            setText={setText}
          />
        </Route>
        <Redirect to="/editor" path="*" />
      </Switch>
    </Router>
  </>
  )
};

render(<Main />, document.getElementById('app'));



/* GlobalStyleはスコープを無視する */
const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }`;
